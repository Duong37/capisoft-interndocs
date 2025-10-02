import uuid
from django.db import models
from django.conf import settings

class TodoList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todolists', null=True, blank=True)
    items = models.ManyToManyField('todoitems.TodoItem', related_name='lists', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"TodoList {self.id} (Owner: {self.owner.email if self.owner else 'None'})"
