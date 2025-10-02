from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User
import os

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Input validation and data transformation for user registration.

    Responsibilities:
    - Validates required fields (email, first_name, last_name)
    - Confirms password match
    - Ensures minimum password length (6 characters)
    - Delegates actual user creation to services layer

    Use case: POST /api/users/auth/register/
    """
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'first_name', 'last_name', 'phone', 'birthday']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        from .services import register_local_and_firebase_user

        return register_local_and_firebase_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data.get('phone'),
            birthday=validated_data.get('birthday'),
            user_type='USER'
        )


class AdminRegistrationSerializer(serializers.ModelSerializer):
    """
    Input validation and data transformation for admin user registration.

    Responsibilities:
    - Validates required fields (email, first_name, last_name)
    - Confirms password match and minimum length
    - Delegates actual admin user creation to services layer

    Use case: POST /api/users/auth/register-admin/
    """
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'first_name', 'last_name', 'phone', 'birthday']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match.")

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        from .services import create_admin_user

        return create_admin_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data.get('phone'),
            birthday=validated_data.get('birthday'),
        )