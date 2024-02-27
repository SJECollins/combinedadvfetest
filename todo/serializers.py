from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Category, TodoItem


class CategorySerializer(serializers.ModelSerializer):
    items_count = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = ["id", "name", "items_count"]


class TodoItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    created_on = serializers.SerializerMethodField()
    finished_on = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    def get_created_on(self, obj):
        return naturaltime(obj.created_on)

    def get_finished_on(self, obj):
        return naturaltime(obj.finished_on)

    class Meta:
        model = TodoItem
        fields = ["id", "owner", "is_owner", "category", "name", "description", "created_on", "finished_on", "status"]