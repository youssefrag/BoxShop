from django.forms import ModelForm
from .models import Order, Review, Profile, Product

class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']

    def __init__(self, *args, **kwargs):
        super(ReviewForm, self).__init__(*args, **kwargs)

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'email', 'username']

    def __init__(self, *args, **kwargs):
        super(ProfileForm, self).__init__(*args, **kwargs)

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'brand', 'description', 'countInStock', 'price']

    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)

class OrderForm(ModelForm):
    class Meta:
        model = Order
        fields = ['isPaid', 'isDelivered']

        def __init__(self, *args, **kwargs):
            super(OrderForm, self).__init__(*args, **kwargs)