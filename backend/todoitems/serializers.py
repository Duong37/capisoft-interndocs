from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers
from .models import TodoItem
from todolists.models import TodoList

class TodoItemSerializer(FlexFieldsModelSerializer):
    todolist_id = serializers.UUIDField(write_only=True, required=False)

    class Meta:
        model = TodoItem
        fields = '__all__'
        expandable_fields = {
            'assignee': 'users.serializers.UserSerializer',
            'lists': 'todolists.serializers.TodoListSerializer',
        }

    def validate_assignee(self, value):
        """
        Validate that the assignee is a valid user.
        """
        if value and not value.is_active:
            raise serializers.ValidationError("Cannot assign tasks to inactive users.")
        return value

    def validate_todolist_id(self, value):
        """
        Validate that the todolist exists and user has permission to add items to it.
        """
        if value:
            try:
                todolist = TodoList.objects.get(id=value)
                # Check if the current user is the owner or admin
                user = self.context['request'].user
                if getattr(user, 'user_type', '') != 'ADMIN' and todolist.owner != user:
                    raise serializers.ValidationError("You can only add items to your own todo lists.")
                return value
            except TodoList.DoesNotExist:
                raise serializers.ValidationError("TodoList not found.")
        return value

    def create(self, validated_data):
        """
        Create a TodoItem and automatically add it to the specified TodoList if provided.
        """
        todolist_id = validated_data.pop('todolist_id', None)
        todoitem = super().create(validated_data)

        if todolist_id:
            try:
                todolist = TodoList.objects.get(id=todolist_id)
                todoitem.lists.add(todolist)
            except TodoList.DoesNotExist:
                # This shouldn't happen due to validation, but handle gracefully
                pass

        return todoitem
