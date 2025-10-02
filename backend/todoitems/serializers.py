from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers
from .models import TodoItem

class TodoItemSerializer(FlexFieldsModelSerializer):
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
