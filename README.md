# capisoft-interndocs notes

# Backend Task 1 - Todo API
API schema and Postman documentation workflow.

## Quick Start
```bash
# Activate virtual environment
source venv/bin/activate

# Set up database (run after model changes)
python manage.py makemigrations
python manage.py migrate

# Start development server
python manage.py runserver 8000

# Access API documentation at http://127.0.0.1:8000/api/docs/
```

## Database Migration Commands

**When to run:** After changing models, installing new apps, or getting database errors

```bash
# Check migration status
python manage.py showmigrations

# Create new migrations after model changes
python manage.py makemigrations

# Apply all pending migrations
python manage.py migrate

# For specific apps
python manage.py makemigrations users todolists todoitems
python manage.py migrate users todolists todoitems
```

**Common Issues:**
- If you get "no such column" errors: run `python manage.py makemigrations` + `python manage.py migrate`
- If you get "NOT NULL constraint failed": the model needs `null=True, blank=True` or you need to provide the required field
- If migrations are out of sync: check `python manage.py showmigrations` and run `python manage.py migrate`

## Test Users for Postman

For testing TodoList and TodoItem relationships, use these pre-created users:

### Owner User
- **ID**: `ae625e67-c27d-4b57-beb7-d3527a39b3b0`
- **Email**: `test@example.com`
- **Name**: Test User

### Assignee User
- **ID**: `bbd36265-4161-4eed-8c7d-2c7564d20d34`
- **Email**: `assignee@example.com`
- **Name**: Assignee User

### Postman Request Examples

**Create TodoList with owner:**
```json
{
    "title": "My Todo List",
    "owner": "ae625e67-c27d-4b57-beb7-d3527a39b3b0"
}
```

**Create TodoItem with assignee and todolist:**
```json
{
    "title": "Task title",
    "description": "Task description",
    "status": "PENDING",
    "assignee": "bbd36265-4161-4eed-8c7d-2c7564d20d34",
    "todolist": "ae625e67-c27d-4b57-beb7-d3527a39b3b0"
}
```

**Status field options:** `"PENDING"`, `"IN_PROGRESS"`, `"DONE"`

**Note:** You can also use `owner: null` or `assignee: null` for items without owners/assignees.

## API Endpoints
- `GET/POST/PUT/DELETE /api/todolists/` - TodoList CRUD operations
- `GET/POST/PUT/DELETE /api/todoitems/` - TodoItem CRUD operations

## Live Documentation
- **Swagger UI**: http://127.0.0.1:8000/api/docs/ (Interactive API testing)
- **ReDoc**: http://127.0.0.1:8000/api/redoc/ (Clean documentation)
- **OpenAPI JSON**: http://127.0.0.1:8000/api/schema/?format=json (For Postman)
- **OpenAPI YAML**: http://127.0.0.1:8000/api/schema/?format=yaml

## Postman Integration
1. Import the OpenAPI schema into Postman:
   - Use the live URL: `http://127.0.0.1:8000/api/schema/?format=json`
   - Or generate a static file (see below)

2. Postman will automatically create:
   - Complete API collection
   - Request/response examples
   - Authentication setup

## Generate Static OpenAPI Files

```bash
# Activate venv
source venv/bin/activate

# Generate JSON schema (for Postman)
python manage.py spectacular --file schema.json --format openapi-json

# Generate YAML schema (for documentation)
python manage.py spectacular --file schema.yml --format openapi
