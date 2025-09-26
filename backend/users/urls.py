from django.urls import path
from . import views_auth, views_public

urlpatterns = [
    # Auth endpoints
    path('auth/register/', views_auth.register_user, name='register-user'),
    path('auth/register-admin/', views_auth.register_admin, name='register-admin'),
    path('auth/me/', views_auth.get_current_user, name='get-current-user'),

    # Public users list
    path('', views_public.list_users_public, name='list-users-public'),
]