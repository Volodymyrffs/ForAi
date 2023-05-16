from django.contrib import admin
from .models import *
from .models import Contact
# Register your models here.
admin.site.register([Product, Cart, CartItem, Contact])