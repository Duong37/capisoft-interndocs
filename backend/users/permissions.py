from rest_framework.permissions import BasePermission

"""
- IsAdmin: Strictest - admin only
- IsOwnerOrAdmin: Ownership-based with admin override
- IsOwnerOrAdminOrCreateOnly: Most permissive for creation
"""


class IsAdmin(BasePermission):
    """
    Allows access only to admin users.
    Use case: Admin-only endpoints like user management
    """
    def has_permission(self, request, view):
        return bool(request.user and getattr(request.user, "user_type", "") == "ADMIN")


class IsOwnerOrAdmin(BasePermission):
    """
    Allows access to admin users or the owner of the object.
    For TodoList: checks if user is the owner
    For TodoItem: checks if user is the owner of the parent TodoList
    Use case: TodoLists - users see their own, admins see all
    """
    def has_object_permission(self, request, view, obj):
        user = request.user

        # Admin users can access everything
        if getattr(user, "user_type", "") == "ADMIN":
            return True

        # For TodoList, check if user is the owner
        if hasattr(obj, 'owner'):
            return obj.owner == user

        # For TodoItem, check if user is the owner of the parent TodoList
        if hasattr(obj, 'todolist') and hasattr(obj.todolist, 'owner'):
            return obj.todolist.owner == user

        return False


class IsOwnerOrAdminOrCreateOnly(BasePermission):
    """
    Allows creation for any authenticated user, but restricts read/update/delete
    to owners or admins.
    Use case: TodoItems - anyone can create items, but only modify their own
    """
    def has_permission(self, request, view):
        # Allow creation for any authenticated user
        if request.method == 'POST':
            return request.user and request.user.is_authenticated
        # For other methods, we'll check object-level permissions
        return True

    def has_object_permission(self, request, view, obj):
        # For POST requests, permission is already granted in has_permission
        if request.method == 'POST':
            return True

        # For other methods, use the same logic as IsOwnerOrAdmin
        user = request.user
        if getattr(user, "user_type", "") == "ADMIN":
            return True

        if hasattr(obj, 'owner'):
            return obj.owner == user

        if hasattr(obj, 'todolist') and hasattr(obj.todolist, 'owner'):
            return obj.todolist.owner == user

        return False