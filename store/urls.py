from django.urls import path
from .import views

urlpatterns = [
    path("", views.index, name="index"),
    path('about-us', views.about, name='about'),
    path("cart", views.cart, name="cart"),
    path("add_to_cart", views.add_to_cart, name= "add"),
    path("confirm_payment/<str:pk>", views.confirm_payment, name="add"),
    path("login", views.sign_in, name="login"),
    path("product", views.product, name="product")
]