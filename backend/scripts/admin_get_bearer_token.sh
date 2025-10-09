#!/bin/bash

# Get fresh admin bearer token and save to JSON file
OUTPUT_FILE="admin_fresh_bearer_token.json"

curl -X POST "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwDWMDUlKvdMlSYyYh5HypNp38a984rko" \
-H "Content-Type: application/json" \
-d '{
  "email": "janus@gmail.com",
  "password": "111111",
  "returnSecureToken": true
}' | jq '.' > "$OUTPUT_FILE"

echo "Admin token saved to: $OUTPUT_FILE"
echo "ID Token: $(jq -r .idToken "$OUTPUT_FILE")"