from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import TodoList
from .serializers import TodoListSerializer
from users.permissions import IsOwnerOrAdmin

class TodoListViewSet(viewsets.ModelViewSet):
    serializer_class = TodoListSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        """
        Admin users see all TodoLists, regular users see only their own.
        Ordered by creation date for consistent pagination.
        """
        qs = TodoList.objects.all().order_by('created_at')
        user = self.request.user

        # Admin users can see all lists
        if getattr(user, 'user_type', '') == 'ADMIN':
            return qs

        # Regular users can only see their own lists
        return qs.filter(owner=user)

    def perform_create(self, serializer):
        """
        Automatically set the owner to the current user when creating a TodoList.
        """
        serializer.save(owner=self.request.user)