from django.shortcuts import render
from rest_framework import viewsets
from .serializer import FighterSerializer
from .models import Fighter

# Create your views here.

class FighterView(viewsets.ModelViewSet):
    serializer_class = FighterSerializer
    queryset = Fighter.objects.all()
