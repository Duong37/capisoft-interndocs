Your Phase 2 plan is solid. Here’s how I’d tighten it and answer your questions so you can ship in small, safe increments.

# What to do next in Phase 2

## 1) Registration endpoints

* `POST /api/auth/register/` creates a Firebase user, then a local `User` with `firebase_uid`.
* `POST /api/auth/register-admin/` does the same but sets `user_type=ADMIN`.
* **Gate admin registration**. Do not allow anyone to self-promote. Use one of:

  * Env code: require `ADMIN_REG_CODE` in the request that must match an env var.
  * Or require the caller to already be an admin and protect this route with `IsAdmin`.

Rollback logic: if DB save fails after Firebase create, delete the Firebase user so the two stores stay consistent.

## 2) Authentication + permissions

* Default DRF settings:

  ```python
  REST_FRAMEWORK = {
      "DEFAULT_AUTHENTICATION_CLASSES": ["users.auth.FirebaseAuthentication"],
      "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
  }
  ```

  Then explicitly set `AllowAny` on public routes (register, public users list).

* Permission classes:

  ```python
  from rest_framework.permissions import BasePermission

  class IsAdmin(BasePermission):
      def has_permission(self, request, view):
          return bool(request.user and getattr(request.user, "user_type", "") == "ADMIN")

  class IsOwnerOrAdmin(BasePermission):
      def has_object_permission(self, request, view, obj):
          user = request.user
          if getattr(user, "user_type", "") == "ADMIN":
              return True
          owner = getattr(obj, "owner", None) or getattr(getattr(obj, "todolist", None), "owner", None)
          return owner == user
  ```

* ViewSets hardening:

  ```python
  class TodoListViewSet(ModelViewSet):
      permission_classes = [IsOwnerOrAdmin]  # IsAuthenticated is default
      def get_queryset(self):
          qs = super().get_queryset()
          u = self.request.user
          return qs if getattr(u, "user_type", "") == "ADMIN" else qs.filter(owner=u)
      def perform_create(self, serializer):
          serializer.save(owner=self.request.user)

  class TodoItemViewSet(ModelViewSet):
      permission_classes = [IsOwnerOrAdmin]
      def get_queryset(self):
          qs = super().get_queryset()
          u = self.request.user
          return qs if getattr(u, "user_type", "") == "ADMIN" else qs.filter(todolist__owner=u)
  ```

* Serializer validation to enforce list ownership and assignment:

  ```python
  # In TodoItemSerializer
  def validate_todolist(self, value):
      u = self.context["request"].user
      if getattr(u, "user_type", "") != "ADMIN" and value.owner != u:
          raise serializers.ValidationError("You can only operate on your own lists.")
      return value

  def validate(self, attrs):
      u = self.context["request"].user
      todolist = attrs.get("todolist") or getattr(self.instance, "todolist", None)
      if todolist and getattr(u, "user_type", "") != "ADMIN" and todolist.owner != u:
          raise serializers.ValidationError("Only the list owner can assign or modify items on this list.")
      return attrs
  ```

## 3) Public users list

* `GET /api/users/` returns a safe projection of users, no lists/items.
* Mark with `AllowAny`.

## 4) OpenAPI security

* Add a bearer scheme so Postman imports auth correctly. For public routes, remove security with `@extend_schema(auth=[])`.

```python
SPECTACULAR_SETTINGS.update({
  "COMPONENTS": {
    "securitySchemes": {"bearerAuth": {"type":"http","scheme":"bearer","bearerFormat":"JWT"}}
  },
  "SECURITY": [{"bearerAuth": []}],
})
```

# Your questions

## 1) Postman pre-request script: before or after Phase 2?

Do it **in Phase 2**, right after registration works. You will need valid Firebase ID tokens to hit protected endpoints, so having the script early prevents manual token juggling.

Implementation tip:

* Put the script at the **collection** level.
* Skip it for register endpoints, or it will try to sign in before the user exists. Example guard:

```javascript
const path = pm.request.url.getPath();
const skip = path.includes("/api/auth/register");
if (!skip) {
  const apiKey = pm.environment.get("FIREBASE_API_KEY");
  const email = pm.environment.get("email");
  const password = pm.environment.get("password");
  let idToken = pm.environment.get("idToken");
  let exp = parseInt(pm.environment.get("idTokenExp") || "0", 10);

  const now = Math.floor(Date.now() / 1000);
  function setAuth(tkn, expiresIn, refreshToken) {
    pm.environment.set("idToken", tkn);
    pm.environment.set("idTokenExp", now + parseInt(expiresIn, 10) - 30);
    if (refreshToken) pm.environment.set("refreshToken", refreshToken);
    pm.request.headers.upsert({ key: "Authorization", value: `Bearer ${tkn}` });
  }

  if (!idToken || now >= exp) {
    const refreshToken = pm.environment.get("refreshToken");
    if (refreshToken) {
      pm.sendRequest({
        url: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        body: { mode: "urlencoded", urlencoded: [
          { key: "grant_type", value: "refresh_token" },
          { key: "refresh_token", value: refreshToken }
        ]}
      }, (err, res) => {
        if (!err && res.code === 200) {
          const json = res.json();
          setAuth(json.id_token, json.expires_in, json.refresh_token);
        }
      });
    } else {
      pm.sendRequest({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: { mode: "raw", raw: JSON.stringify({ email, password, returnSecureToken: true }) }
      }, (err, res) => {
        if (!err && res.code === 200) {
          const json = res.json();
          setAuth(json.idToken, json.expiresIn, json.refreshToken);
        }
      });
    }
  } else {
    pm.request.headers.upsert({ key: "Authorization", value: `Bearer ${idToken}` });
  }
}
```

Env vars needed: `base_url`, `FIREBASE_API_KEY`, `email`, `password`.

## 2) Public users list now or in Phase 3?

Include it **in Phase 2**. It is trivial and gives you a clear public route to demonstrate that auth is enforced everywhere else.

## 3) Auth requirements you might have missed

* **Admin registration must be gated**. Never leave `register-admin` fully public.
* **Queryset scoping** on list endpoints, not just object permissions, to avoid data leaks.
* **Owner on create**. Always set `owner=request.user` for lists in `perform_create`.
* **Assignment rule**. Only the list owner or admin may assign or change `assignee`.
* **Consistent error handling**. Return 403 for permission failures, 404 for not found outside the user’s scope.
* **OpenAPI security annotations**. Add bearer globally, clear on public endpoints.
* **Tests**. Add a small matrix: unauth 401, user sees only own lists/items, admin sees all, non-owner cannot assign.

# Phase 2 acceptance checks

* Register endpoints create Firebase and local users, with rollback on failure.
* Authenticated requests include `Authorization: Bearer <idToken>` and succeed.
* TodoList/TodoItem:

  * Unauth 401.
  * User sees and edits own only.
  * Admin can access all.
  * Owner or admin can assign items; non-owner cannot.
* Public `GET /api/users/` returns safe fields without requiring auth.
* Postman collection works with the pre-request script and saved examples.
* Regenerated `openapi.json` reflects security and new endpoints.

