from django.urls import path
from . import views


urlpatterns = [
    path("categories/", views.CategoryList.as_view()),
    path("category/<int:pk>/", views.CategoryDetail.as_view()),
    path("todoitems/", views.TodoItemList.as_view()),
    path("todoitem/<int:pk>/", views.TodoItemDetail.as_view())    
]