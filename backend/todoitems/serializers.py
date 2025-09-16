from rest_flex_fields import FlexFieldsModelSerializer
from .models import TodoItem

class TodoItemSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
        expandable_fields = {
            'assignee': 'users.serializers.UserSerializer',
            'todolist': 'todolists.serializers.TodoListSerializer',
        }
