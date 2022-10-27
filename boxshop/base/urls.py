from django.urls import path
from .views import user_views, product_views, order_views

urlpatterns = [
    path('users/create', user_views.registerUser, name='register-user'),
    path('users/login', user_views.loginUser, name='login-user'),
    path('users/logout', user_views.logoutUser, name='login-user'),
    path('products/all', product_views.getAllProducts, name='all-products'),
    path('products/<str:query>', product_views.searchForProducts, name='search-products'),
    path('product-details/<str:id>', product_views.getProductsDetails, name='product-details'),
    path('reviews/<str:id>', product_views.getReviews, name='reviews'),
    path('review/<str:productId>', product_views.postReview, name='post-review'),
    path('user-update/<str:userEmail>', user_views.updateUser, name='update-user'),
    path('orders/create', order_views.createOrder, name='create-order'),
    path('get-orders/<str:userEmail>', order_views.getOrders, name='get-orders'),
    path('order-details/<str:orderId>', order_views.getOrderDetails, name='order-details'),
    path('admin/new-product', product_views.newProduct, name='new-products'),
    path('admin/all-orders', order_views.getAllOrders, name='all-orders'),
    path('admin/order-status', order_views.updateOrder, name='update-order'),
    path('admin/delete-order/<str:orderId>', order_views.deleteOrder, name='delete-order'),
]