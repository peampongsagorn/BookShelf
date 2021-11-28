from django.db import models

class Book(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default='')
    price = models.IntegerField()
    author = models.CharField(max_length=100, default='')
    page = models.IntegerField()

    class Meta:
        ordering = ['created']