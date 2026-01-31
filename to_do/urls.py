from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CategoryViewSet

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="tasks")
router.register("categories", CategoryViewSet, basename="categories")

urlpatterns = [
    path("", include(router.urls)),
]
