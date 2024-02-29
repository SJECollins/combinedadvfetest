from rest_framework import serializers
from .models import Category, TodoItem


class CategorySerializer(serializers.ModelSerializer):
    items_count = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = ["id", "name", "items_count"]


class TodoItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        model = TodoItem
        fields = ["id", "owner", "is_owner", "category", "name", "description", "created_on", "finished_on", "status"]