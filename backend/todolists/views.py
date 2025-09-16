from rest_framework import viewsets
from .models import TodoList
from .serializers import TodoListSerializer

class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer