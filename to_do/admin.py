from django.contrib import admin
from .models import Task, Category

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "due_date", "completed")
    list_filter = ("category", "completed", "due_date")
    search_fields = ("title",)