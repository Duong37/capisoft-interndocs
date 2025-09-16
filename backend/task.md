***Task: Create the skeleton for a Django backend***

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