from django.urls import path
from .views import ItemList, PostList, PostLikeToggle, current_user_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('posts/', PostList.as_view(), name='post-list'),
    path('posts/<int:pk>/toggle_like/', PostLikeToggle.as_view(), name='post-toggle-like'),
    path('current_user/', current_user_view, name='current-user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
