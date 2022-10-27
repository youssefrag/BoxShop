from rest_framework import serializers
from django.contrib.auth.models import User

from base.models import OrderItem, Profile, Product, Review, Order

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)

    product = ProductSerializer(many=False)
    class Meta:
        model = Review
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(many=False)

    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer(many=False)

    product = ProductSerializer(many=False)

    class Meta:
        model = OrderItem
        fields = '__all__'