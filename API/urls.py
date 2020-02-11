from django.urls import path, include
from . import views
from rest_framework import routers

# route = routers.DefaultRouter()
# route.register(r'getQuestionnairesList', views.QuestionnairesViewSet)


urlpatterns = [
    # path('', include(route.urls)),
    path('getQuestionnairesList/', views.getQuestionnairesList),
    path('getAllQuestionnaires/', views.getAllQuestionnaires),
    path('getQuestionnairesByUid/<str:id>/', views.getQuestionnairesByUid, name='getQuestionnairesByUid'),
    path('poss/', views.post1),
    path('addQuestionnaire/', views.addQuestionnaire),
    path('editQuestionnaireByUid/<str:id>', views.editQuestionnaireByUid),
    path('deleteQuestionnaireByUid/<str:id>', views.deleteQuestionnaireByUid),
    # path('a/', views.QuestionnairesViewSet),
]