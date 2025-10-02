#!/bin/bash

# Get fresh admin bearer token and save to JSON file
OUTPUT_FILE="fresh_bearer_token.json"

curl -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwDWMDUlKvdMlSYyYh5HypNp38a984rko" \
-H "Content-Type: application/json" \
-d '{
  "email": "admin123@gmail.com",
  "password": "qwerty",
  "returnSecureToken": true
}' | jq '.' > "$OUTPUT_FILE"

echo "Admin token saved to: $OUTPUT_FILE"
echo "ID Token: $(jq -r .idToken "$OUTPUT_FILE")"