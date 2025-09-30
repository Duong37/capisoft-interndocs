from rest_flex_fields import FlexFieldsModelSerializer
from rest_framework import serializers
from .models import TodoItem

class TodoItemSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
        expandable_fields = {
            'assignee': 'users.serializers.UserSerializer',
            'todolists': 'todolists.serializers.TodoListSerializer',
        }

    def validate_todolists(self, value):
        """
        Field-level validation: Ensure user can only operate on their own TodoLists (unless admin).

        This runs when the 'todolists' field is set or changed, preventing users from assigning items to TodoLists they don't own.
        """
        user = self.context['request'].user
        if getattr(user, 'user_type', '') != 'ADMIN':
            for todolist in value.all():
                if todolist.owner != user:
                    raise serializers.ValidationError("You can only assign items to your own TodoLists.")
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
        For ManyToMany relationship, ensures user has permission for ALL associated TodoLists.
        """
        user = self.context['request'].user

        # For updates, check the existing todolists ownership
        if self.instance:
            todolists = self.instance.todolists.all()
        # For creates, check the new todolists ownership
        else:
            todolists = attrs.get('todolists', [])

        if getattr(user, 'user_type', '') != 'ADMIN':
            for todolist in todolists:
                if todolist.owner != user:
                    raise serializers.ValidationError(
                        "Only the TodoList owner or admin can assign or modify items on this list."
                    )

        return attrs
