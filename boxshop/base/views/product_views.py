from django.db.models import Q

from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import Product, Review, Profile

from ..forms import ReviewForm, ProductForm

from ..serializers import ProductSerializer, ReviewSerializer
from rest_framework import status

@api_view(['GET'])
def getAllProducts(request):
    products = Product.objects.all()
    for product in products:
        product.numReviews = product.num_of_reviews()
        product.rating = product.average_rating()['rating__avg']
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def searchForProducts(request, query):
    products = Product.objects.distinct().filter(
        Q(name__icontains=query) |
        Q(description__icontains=query) |
        Q(brand__icontains=query)
    )
    for product in products:
        product.numReviews = product.num_of_reviews()
        product.rating = product.average_rating()['rating__avg']
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsDetails(request, id):
    product = Product.objects.get(id=id)
    product.numReviews = product.num_of_reviews()
    product.rating = product.average_rating()['rating__avg']
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def getReviews(request, id):
    product = Product.objects.get(id=id)
    reviews = Review.objects.filter(product=product)

    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def postReview(request, productId):
    data = request.data
    product = Product.objects.get(id=productId)
    profile = Profile.objects.get(username=data['userEmail'])
    try:
        existingReview = Review.objects.get(product=product, profile=profile)
    except:
        existingReview = None
    if existingReview is not None:
        message = {'detail': 'You have already posted a review for this product'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

    try:
        Review.objects.create(
            product = product,
            profile = profile,
            rating = data['rating'],
            comment = data['comment']
        )

        message = {'detail': 'Review succesfuly added'}
        return Response(message, status=status.HTTP_201_CREATED)
    except:
        message = {'detail': 'An error has occured during review creation'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def newProduct(request):
    data = request.data
    product = Product.objects.create(
        name = data['name'],
        brand = data['brand'],
        description = data['description'],
        countInStock = data['countInStock'],
        price = data['price']
    )

    product.image.save(request.FILES['image'].name, request.FILES['image'])

    form = ProductForm(instance=product)


    print(form)

    if request.method == 'POST' and form.is_valid():
        form.save()

        return Response()

    else:

        message = {'detail': 'Product succesfuly added'}
        return Response(message, status=status.HTTP_201_CREATED)
