from rest_framework import generics, permissions, viewsets
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer, TaskSerializer, CategorySerializer
from .models import Task, Category


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(owner=self.request.user)

        # Category filter
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__id=category)

        # Status filter
        status = self.request.query_params.get("status")
        if status == "completed":
            queryset = queryset.filter(completed=True)
        elif status == "pending":
            queryset = queryset.filter(completed=False)
        elif status == "overdue":
            queryset = queryset.filter(
                completed=False,
                due_date__lt=timezone.now().date()
            )

        # Search filter
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(Q(title__icontains=search))

        return queryset.order_by("completed", "due_date")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
