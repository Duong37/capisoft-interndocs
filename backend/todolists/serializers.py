from rest_flex_fields import FlexFieldsModelSerializer
from .models import TodoList

class TodoListSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = TodoList
        fields = '__all__'
        expandable_fields = {
            'owner': 'users.serializers.UserSerializer',
            'items': 'todoitems.serializers.TodoItemSerializer',
        }
