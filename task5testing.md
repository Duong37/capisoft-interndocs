Phase 2: Authentication Setup

  1. Create Test Users:

  # Regular User (for testing ownership)
  POST /api/users/auth/register/
  {
    "email": "testuser@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }

  # Admin User (for testing full access)
  POST /api/users/auth/register-admin/
  {
    "email": "admin@example.com",
    "password": "password123",
    "first_name": "Admin",
    "last_name": "User"
  }

Phase 3: TodoList CRUD Testing

  2. Test TodoList Operations:

  Create TodoList:
  POST /api/todolists/
  {
    "title": "My First Todo List",
    "owner": "{user_uuid}"  # Optional, auto-assigned if
   omitted
  }

  List TodoLists:
  GET /api/todolists/
  # Should return only user's own lists (admin sees all)

  Update TodoList:
  PUT /api/todolists/{id}/
  {
    "title": "Updated Todo List Title"
  }

  Delete TodoList:
  DELETE /api/todolists/{id}/

Phase 4: TodoItem CRUD Testing

  3. Test TodoItem Operations:

  Create TodoItem:
  POST /api/todoitems/
  {
    "title": "Sample Task",
    "description": "Task description",
    "status": "PENDING",
    "assignee": "{user_uuid}",  # Optional
    "todolists": ["{todolist_uuid}"]  # Many-to-many 
  relationship
  }

  List TodoItems:
  GET /api/todoitems/
  # Should return items from user's accessible TodoLists

  Update TodoItem:
  PUT /api/todoitems/{id}/
  {
    "title": "Updated Task",
    "status": "IN_PROGRESS"
  }

  Delete TodoItem:
  DELETE /api/todoitems/{id}/

Phase 5: Advanced Functionality Testing

  4. Test Assignment Feature:

  # Get items assigned to current user
  GET /api/todoitems/assigned_to_me/

  # Assign item to different user
  PUT /api/todoitems/{id}/
  {
    "assignee": "{other_user_uuid}"
  }

  5. Test Many-to-Many Relationships:

  # Create TodoItem in multiple lists
  POST /api/todoitems/
  {
    "title": "Multi-list Task",
    "todolists": [
      "{list1_uuid}",
      "{list2_uuid}",
      "{list3_uuid}"
    ]
  }

  6. Test Status Progression:

  # PENDING → IN_PROGRESS → DONE
  PUT /api/todoitems/{id}/
  {
    "status": "IN_PROGRESS"  # Then "DONE"
  }

Phase 6: Permission Testing

  7. Test Ownership & Permissions:

  - User Access: Can only CRUD their own TodoLists
  - Admin Access: Can CRUD all TodoLists and TodoItems
  - Assignment Security: Users can only assign from
  owned TodoLists
  - Cross-User Protection: User A cannot modify User B's
   resources

  8. Test Edge Cases:

  - Invalid UUIDs
  - Empty/missing required fields
  - Unauthorized access attempts
  - Invalid status transitions
  - Assignment to non-existent users

Phase 7: Integration Verification

  9. Test API Documentation:

  - Verify schema.json matches actual API behavior
  - Test all endpoints with various parameter
  combinations
  - Confirm error responses are properly documented

  10. Performance & Reliability:

  - Test with large datasets
  - Verify many-to-many relationship performance
  - Check concurrent user scenarios