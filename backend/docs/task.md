***Task 1: Create the skeleton for a Django backend***

The main objective is to create a todo list RESTful API. The API must allow users to create, manage, and delete todo lists and items. Ensure lists and items are seperate models and relate them. *Please create a Postman document as you work your endpoints.*

Please note the following:

- For now, no permission levels are needed - anyone can edit any todo list
- Try to use ModelSerializer and either ModelViewSet or GenericViewSet from the django_rest_framework
- Create apps accordingly

1. Model the following Logical Diagram in /backend/diagram.png in Django 
2. Create CRUD endpoints for TodoLists
3. Create CRUD endpoints for TodoItems

## 5. Recommended Third Party Libraries

As you have learned, the Django-rest-framework already provides a lot of functionality on top of the Django ORM. Next to DRF, there are some other librareis we commonly use primarly to keep the codebase small and speed up development and integration.

### drf-flex-fields

Documentation https://pypi.org/project/drf-flex-fields/0.2.1/

In previous projects, one issue that was hurting the maintainability of the code was having a huge amount of different serializers for the same model, to account for every screen needing a slightly different subset of fields, as we didn’t want to send huge amounts of data to the frontend when it was not needed. Not only in direct access but also when it came to nested data. (for example you might want the name and profile picture of the creater of a todo list on the todo list page). drf-flex-fields solves these problems by allowing us to have one serializer and let the frontend decide what subset of fields it needs.

### drf-spectacular

https://pypi.org/project/drf-spectacular/

Originally, we used postman as our only form documentation. This required manually specifying the url of every endpoint, what queryparams they expect, what data they expect and generate examples to document what format they might return. This process was not only very tedious, but also made it difficult to keep track of updates and caused a lot of communication overhead about little details such as the name of fields. When combined with generic views and viewsets based on generic views, drf-spectacular is able to generate a nice webpage that explains all the endpoints, and on top of that allows frontend developers to download an OpenApi file which can be imported into postman.

***Task 2: Update your API with authentication***

Now you will turn your skeleton Django backend into a fully functioning backend utilizing permission levels & OAuth. Follow the code provided by the devs. (you may have to create a pre-request script to authenticate users)

1. Create register endpoints for users & admin users.
    1. Ensure you also create the user within firebase.
    2. You will have to add an additional field firebase_uid into your User model in order to reference the correct firebase user.
    3. Implement an authentication class and permission levels to ensure endpoints are protected.
2. Create a get request that lists all users (with full data, excluding their todo lists and items) - this endpoint should be public
3. Update the two CRUD endpoints to acomodate for the following:
    1. A user must be authenticated to perform CRUD operations on both TodoList and TodoItem models
    2. An admin can perform CRUD operations on all TodoList and TodoItem models
    3. A user can only perform CRUD operations on their own created TodoList and TodoItems
4. Allow users to assign other users tasks from their own TodoList
5. Create a GET endpoint that shows all tasks that have been assigned to a user

***Task 3: Create a functioning global auth state***

- Duplicate your existing frontend code - no need to change the layout and components yet.
- add a view, similar to the login view, which is meant for registering a user
- Add login, register and logout functions using firebase (no need to check if the user is authenticated yet)

***Task 4: Link the global auth state to the backend you created***

- Within your backend create an auth endpoint. This simply return the user information and is meant to check whether the user is authenticated.
- Use Axios (and Axios Interceptors) & TanStack Query to check whether the user is authenticated. This can then be saved to the global auth state.
- Once this is done you can handle the logic for private and public routes.