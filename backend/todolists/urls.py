from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoListViewSet

router = DefaultRouter()
router.register(r'todolists', TodoListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
