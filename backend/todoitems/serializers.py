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
        Ensure user can only operate on their own TodoLists (unless admin).
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
        Ensure only TodoList owners or admins can assign/modify items.
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
