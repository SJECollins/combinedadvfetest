from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend

from react_todo.permissions import IsOwnerOrReadOnly
from .models import Category, TodoItem
from .serializers import CategorySerializer, TodoItemSerializer


class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = (
        Category.objects.annotate(
            items_count=Count("todoitem", distinct=True)
        )
    )
    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    filterset_fields = [
        "name"
    ]
    search_fields = [
        "name"
    ]


class CategoryDetail(generics.RetrieveUpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Category.objects.annotate(
        items_count=Count("todoitem", distinct=True)
    )


class TodoItemList(generics.ListCreateAPIView):
    serializer_class = TodoItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = TodoItem.objects.all()
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    filterset_fields = [
        "owner",
        "category",
        "status"
    ]
    search_fields = [
        "owner__username"
        "name",
        "category",
        "status"
    ]
    ordering_fields = [
        "created_on"
        "finished_on"
        "status"
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TodoItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoItemSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = TodoItem.objects.all()