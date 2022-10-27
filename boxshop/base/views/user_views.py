from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from ..models import Profile
from django.contrib.auth import login, authenticate, logout

from ..serializers import UserSerializer, ProfileSerializer

from ..forms import ProfileForm

from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializer(user, many=False)

        login(request, user)

        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def loginUser(request):

    data = request.data
    

    username = data['email']
    password = data['password']
    
    try:
        user = User.objects.get(username=username)
    except:
        message = {'detail': 'User with this email does not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    else:
        message = {'detail': 'Email or password incorrect'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logoutUser(request):
    logout(request)
    return Response()

@csrf_exempt
@api_view(['POST'])
def updateUser(request, userEmail):
    data = request.data
    if data['email'] != userEmail:
        try:
            existingProfile = Profile.objects.get(email=data['email'])
        except:
            existingProfile = None
        if existingProfile is not None:
            message = {'detail': 'This email is used by another user'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    newData = {'name': data['name'], 'email': data['email'], 'username': data['email']}
    profile = Profile.objects.get(email=userEmail)
    print(profile)
    try:
        form = ProfileForm(data=newData, instance=profile)
        form.save()
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Email already in use'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)