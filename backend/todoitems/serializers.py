from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers
from .models import TodoItem

class TodoItemSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
        expandable_fields = {
            'assignee': 'users.serializers.UserSerializer',
            'todolist': 'todolists.serializers.TodoListSerializer',
        }

    def validate_todolist(self, value):
        """
        Field-level validation: Ensure user can only operate on their own TodoLists (unless admin).

        This runs when the 'todolist' field is set or changed, preventing users from assigning items to TodoLists they don't own. Catches TodoList reassignment attempts.

        Note: This complements validate() which handles overall operation permissions.
        """
        user = self.context['request'].user
        if getattr(user, 'user_type', '') != 'ADMIN' and value.owner != user:
            raise serializers.ValidationError("You can only operate on your own TodoLists.")
        return value

    def validate_assignee(self, value):
        """
        Validate that the assignee is a valid user.
        """
        if value and not value.is_active:
            raise serializers.ValidationError("Cannot assign tasks to inactive users.")
        return value

    def validate(self, attrs):
        """
        Object-level validation: Ensure only TodoList owners or admins can assign/modify items.

        This runs for ANY field change (create/update) and checks overall operation permissions.
        It complements validate_todolist() by catching scenarios where users try to modify items that currently reside in TodoLists they don't own.

        Scenarios caught:
        - Creating new items in someone else's TodoList
        - Modifying any item details (title, status, assignee) when the item belongs to someone else's TodoList
        - Any operation on items where the current TodoList owner is not the requesting user

        Key difference from validate_todolist():
        - validate_todolist(): Prevents moving items TO unauthorized TodoLists
        - validate(): Prevents modifying items IN unauthorized TodoLists
        """
        user = self.context['request'].user

        # For updates, check the existing todolist ownership
        if self.instance:
            todolist = self.instance.todolist
        # For creates, check the new todolist ownership
        else:
            todolist = attrs.get('todolist')

        if todolist and getattr(user, 'user_type', '') != 'ADMIN' and todolist.owner != user:
            raise serializers.ValidationError(
                "Only the TodoList owner or admin can assign or modify items on this list."
            )

        return attrs
