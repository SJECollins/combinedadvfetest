from django.db import models
from django.contrib.auth.models import User


STATUS = ((0, "Pending"), (1, "In Progress"), (2, "Done"))


class Category(models.Model):
    name = models.CharField(max_length=140)

    def __str__(self):
        return self.name


class TodoItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, default=None, null=True)
    name = models.CharField(max_length=140)
    description = models.TextField()
    created_on = models.DateField(auto_now_add=True)
    finished_on = models.DateField()
    status = models.CharField(max_length=12, choices=STATUS, default=0)

    def __str__(self):
        return self.name

