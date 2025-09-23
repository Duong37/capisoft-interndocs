from django.urls import path
from . import views_auth, views_public

urlpatterns = [
    # Registration endpoints (public)
    path('auth/register/', views_auth.register_user, name='register-user'),
    path('auth/register-admin/', views_auth.register_admin, name='register-admin'),

    # Public users list
    path('', views_public.list_users_public, name='list-users-public'),
]