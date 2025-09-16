from rest_flex_fields import FlexFieldsModelSerializer
from .models import User

class UserSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'phone', 'first_name', 'last_name', 'birthday', 'is_active', 'user_type', 'created_at', 'last_modified']
        read_only_fields = ['id', 'created_at', 'last_modified']
        expandable_fields = {
            'todolists': 'todolists.serializers.TodoListSerializer',
            'assigned_items': 'todoitems.serializers.TodoItemSerializer',
        }