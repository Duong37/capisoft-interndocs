#!/usr/bin/env python3
"""
Test script to register a user directly from the terminal
"""

import requests
import json
import sys
import os

def test_registration():
    # Test user data
    test_user = {
        "email": "testuser@example.com",
        "password": "testpassword123",
        "confirm_password": "testpassword123",
        "first_name": "Test",
        "last_name": "User",
        "phone": "+1234567890",
        "birthday": "1990-01-01"
    }

    # API endpoint
    url = "http://127.0.0.1:8000/api/users/auth/register/"

    # Headers
    headers = {
        "Content-Type": "application/json",
    }

    print("Testing user registration...")
    print(f"URL: {url}")
    print(f"User data: {json.dumps(test_user, indent=2)}")
    print("-" * 50)

    try:
        # Make the request
        response = requests.post(url, json=test_user, headers=headers)

        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")

        if response.status_code == 201:
            print("Registration successful!")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print("Registration failed!")
            try:
                print(f"Error Response: {json.dumps(response.json(), indent=2)}")
            except:
                print(f"Raw Response: {response.text}")

    except requests.exceptions.ConnectionError:
        print("Connection failed! Make sure the Django server is running on http://127.0.0.1:8000")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    test_registration()