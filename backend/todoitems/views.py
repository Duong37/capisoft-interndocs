from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import TodoItem
from .serializers import TodoItemSerializer
from users.permissions import IsOwnerOrAdmin

class TodoItemViewSet(viewsets.ModelViewSet):
    serializer_class = TodoItemSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        """
        Filter TodoItems based on todolist parameter and user permissions.
        Admin users see all TodoItems, regular users see only items from their own TodoLists.
        """
        qs = TodoItem.objects.all()
        user = self.request.user

        # Filter by specific todolist if provided in query params
        todolist_id = self.request.query_params.get('todolist')
        if todolist_id:
            qs = qs.filter(lists__id=todolist_id)

        # Admin users can see all items (after todolist filter)
        if getattr(user, 'user_type', '') == 'ADMIN':
            return qs

        # Regular users can only see items from their own TodoLists (ManyToMany)
        return qs.filter(lists__owner=user)

    @action(detail=False, methods=['get'])
    def assigned_to_me(self, request):
        """
        Get all TodoItems assigned to the current user with pagination.
        """
        user = request.user
        assigned_tasks = TodoItem.objects.filter(assignee=user).order_by('created_at')

        # Apply pagination
        paginator = PageNumberPagination()
        paginator.page_size = int(request.query_params.get('page_size', 10))
        page = paginator.paginate_queryset(assigned_tasks, request)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        # Fallback for non-paginated response
        serializer = self.get_serializer(assigned_tasks, many=True)
        return Response(serializer.data)