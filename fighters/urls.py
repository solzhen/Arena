from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework import routers
from fighters import views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


router = routers.DefaultRouter()
router.register(r'fighters', views.FighterView, 'fighters')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path(
        'openapi/',
        get_schema_view(
            title="Fighters API",
            version="1.0"
        ),
        name="openapi-schema"
    ),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
