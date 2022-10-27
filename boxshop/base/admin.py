from django.contrib import admin

from .models import Profile, Product, Review, Order, OrderItem

admin.site.register(Profile)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
