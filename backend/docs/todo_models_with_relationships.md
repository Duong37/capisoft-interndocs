# Todo App Data Models

## User

  Field           Type
  --------------- --------------------------------
  **id**          uuid (Primary Key)
  email           char
  phone           char
  first_name      char
  last_name       char
  birthday        date
  is_active       bool
  user_type       enum (user_types: ADMIN, USER)
  created_at      timestamp
  last_modified   timestamp

## TodoList

  Field           Type
  --------------- -------------------------------
  **id**          uuid (Primary Key)
  owner           uuid (Foreign Key → User.id)
  items           uuid (Relation → TodoItem.id)
  created_at      timestamp
  last_modified   timestamp

## TodoItem

  Field           Type
  --------------- -------------------------------------------
  **id**          uuid (Primary Key)
  title           char
  description     text
  status          enum (status: PENDING, IN_PROGRESS, DONE)
  assignee        uuid (Foreign Key → User.id)
  created_at      timestamp
  last_modified   timestamp

## Relationships

-   \*\*User id (0..1) → TodoList owner (\*)\*\*: A user can own many
    TodoLists, each TodoList has at most one owner.
-   **TodoItem id (*) → TodoList items (*)**: Many-to-many relationship
    (a TodoList can have many TodoItems, and an item could appear in
    multiple lists if supported).
-   \*\*User id (0..1) → TodoItem assignee (\*)\*\*: A user can be
    assigned to many TodoItems, each TodoItem can have at most one
    assignee.
