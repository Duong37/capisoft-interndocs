from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TodoItem
from .serializers import TodoItemSerializer
from users.permissions import IsOwnerOrAdmin

class TodoItemViewSet(viewsets.ModelViewSet):
    serializer_class = TodoItemSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        """
        Admin users see all TodoItems, regular users see only items from their own TodoLists.
        """
        qs = TodoItem.objects.all()
        user = self.request.user

        # Admin users can see all items
        if getattr(user, 'user_type', '') == 'ADMIN':
            return qs

        # Regular users can only see items from their own TodoLists
        return qs.filter(todolist__owner=user)

    @action(detail=False, methods=['get'])
    def assigned_to_me(self, request):
        """
        Get all TodoItems assigned to the current user.
        """
        user = request.user
        assigned_tasks = TodoItem.objects.filter(assignee=user)
        serializer = self.get_serializer(assigned_tasks, many=True)
        return Response(serializer.data)