from django.db.models.deletion import CASCADE
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg

import uuid

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(max_length=500, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, max_length=36, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.username)

class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='placeholder.png')
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    id = models.UUIDField(default=uuid.uuid4, max_length=36, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

    def num_of_reviews(self):
        return Review.objects.filter(product=self).count()

    def average_rating(self):
        return Review.objects.filter(product=self).aggregate(Avg('rating'))


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=CASCADE)
    profile = models.ForeignKey(Profile, on_delete=CASCADE)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, max_length=36, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return f'{self.profile.name} review for {self.product}'

class Order (models.Model):
    profile = models.ForeignKey(Profile, on_delete=CASCADE)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingAddress = models.CharField(max_length=200, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    isDelivered = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, max_length=36, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return f'{self.profile} order made at {self.createdAt}'


class OrderItem (models.Model):
    order = models.ForeignKey(Order, on_delete=CASCADE)
    product = models.ForeignKey(Product, on_delete=CASCADE)
    quantity = models.IntegerField(null=True, blank=True, default=1)

    id = models.UUIDField(default=uuid.uuid4, max_length=36, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return f'{self.product} for {self.order}'
