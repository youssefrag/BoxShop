from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Product, Review, Profile, Order, OrderItem

from ..serializers import ProductSerializer, ReviewSerializer, OrderSerializer, OrderItemSerializer
from rest_framework import status

from ..forms import OrderForm

from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
def createOrder(request):
    data = request.data

    # print(data)

    profile = Profile.objects.get(username=data['user'])

    totalPrice = data['totalPrice']

    shippingAddress = data['shippingAddress']

    try:
        order = Order.objects.create(
            profile = profile,
            totalPrice = totalPrice,
            shippingAddress = shippingAddress
        )

    except:
        message = {'detail': 'An error has occured during order creation'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


    for item in data['items']:
        product = Product.objects.get(id=item)
        quantity = data['items'][item]
        try:
            OrderItem.objects.create(
                order = order,
                product = product,
                quantity = quantity
            )
            
            

        except:
            message = {'detail': 'An error has occured during order item creation'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


    message = {'detail': 'Order succesfuly created'}
    return Response(message, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
def getOrders(request, userEmail):

    profile = Profile.objects.get(username=userEmail)


    orders = Order.objects.filter(profile=profile)


    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(['GET', 'POST'])
def getOrderDetails(request, orderId):
    order = Order.objects.get(id=orderId)

    orderItems = OrderItem.objects.filter(order=order)

    serializer = OrderItemSerializer(orderItems, many=True)

    return Response(serializer.data)

@api_view(['GET', 'POST'])
def getAllOrders(request):
    orders = Order.objects.all()

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)

@api_view(['PUT'])
def updateOrder(request):
    data = request.data
    # print(data)
    order = Order.objects.get(id=data['orderId'])
    category = data['type']
    otherCategory = data['otherType']
    otherStatus = data['otherStatus']
    if data['status'] == True:
        newStatus = False
    else:
        newStatus = True

    newData = {category: newStatus, otherCategory: otherStatus}

    # print(newData)
    # return Response()
    
    form = OrderForm(data=newData, instance=order)
    form.save()
    message = {'detail': 'Updated successfully!'}
    return Response(message, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def deleteOrder(request, orderId):
    # print(orderId)
    order = Order.objects.get(id=orderId)
    order.delete()
    message = {'detail': 'Deleted successfully!'}
    return Response(message, status=status.HTTP_200_OK)