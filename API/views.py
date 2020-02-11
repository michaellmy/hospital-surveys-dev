import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from .models import Questionnaire, QuestionnaireContent
from .serializers import QuestionnaireSerializers, QuestionnaireContentSerializers, QuestionnaireListSerializers


# Create your views here.

def getQuestionnairesList(request):
    queryset = Questionnaire.objects.all()
    return JsonResponse(QuestionnaireListSerializers(queryset, many=True).data, safe=False)


def getAllQuestionnaires(request):
    queryset = Questionnaire.objects.all()
    # print(queryset)
    return JsonResponse(QuestionnaireSerializers(queryset, many=True).data, safe=False)


def getQuestionnairesByUid(request, id):
    try:
        queryset = Questionnaire.objects.get(uid=id)
    except Questionnaire.DoesNotExist:
        queryset = None
    # print(queryset)
    if queryset is not None:
        return JsonResponse(QuestionnaireSerializers(queryset).data, safe=False)
    else:
        return HttpResponse("get nothing")


def post1(request):
    if request.method == 'POST':
        jsn = json.loads(request.POST.get('1', None))  # raw data
        # jsn = json.loads(request.body.decode("utf-8"))  ->form data
        print(jsn)
        return JsonResponse(jsn)
    elif request.method == 'GET':
        return HttpResponse("its get")


def addQuestionnaire(request):
    if request.method == 'GET':
        return HttpResponse("should be post request.")
    elif request.method == 'POST':
        jsn = json.loads(request.POST.get('1', None))
        # stream = io.BytesIO(jsn)
        # data = JSONParser().parse(stream)
        serializer = QuestionnaireSerializers(data=jsn)
        serializer.is_valid()
        jsnDict = serializer.validated_data
        questionnaire = Questionnaire(uid=jsnDict['uid'], title=jsnDict['title'], minAge=jsnDict['minAge'], maxAge=jsnDict['maxAge'],
                                        description=jsnDict['description'], patientType=jsnDict['patientType'])
        questionnaire.save()
        for contents in jsnDict['questionnaireContent']:
            questionnaire.questionnaireContent.create(qid=contents['qid'], questionText=contents['questionText'], answerType=contents['answerType'], choices=contents['choices'])
        #print(serializer.validated_data)
        # print(serializer.validated_data['questionnaireContent'][1]['id'])
        # return JsonResponse(QuestionnaireSerializers(questionnaire).data, safe=False)
        return HttpResponse("received")
#
# class QuestionnairesViewSet(viewsets.ModelViewSet):
#     # lookup_field = 'patientType'
#     queryset = Questionnaire.objects.all().order_by('pk')
#     serializer_class = QuestionnaireSerializers
#
#
# class QuestionnaireContentViewSet(viewsets.ModelViewSet):
#     queryset = QuestionnaireContent.objects.all().order_by('pk')
#     serializer_class = QuestionnaireContentSerializers

def editQuestionnaireByUid(request, id):
    try:
        Questionnaire.objects.get(uid=id)
    except Questionnaire.DoesNotExist:
        return HttpResponse("Questionnaire not exist")
    jsn = json.loads(request.POST.get('1', None))
    serializer = QuestionnaireSerializers(data=jsn)
    #print(serializer)
    serializer.is_valid()
    print(serializer.errors)
    jsnDict = serializer.validated_data
    Questionnaire.objects.filter(uid=id).update(title=jsnDict['title'], minAge=jsnDict['minAge'], maxAge=jsnDict['maxAge'],
                                    description=jsnDict['description'], patientType=jsnDict['patientType'])
    Questionnaire.objects.get(uid=id).questionnaireContent.all().delete()
    for contents in jsnDict['questionnaireContent']:
        Questionnaire.objects.get(uid=id).questionnaireContent.create(qid=contents['qid'],
                                                                      questionText=contents['questionText'],
                                                                      answerType=contents['answerType'],
                                                                      choices=contents['choices'])
    # Questionnaire.objects.filter(uid=id).update(title=jsnDict['ages'])
    # Questionnaire.objects.filter(uid=id).update(title=jsnDict['patientType'])
    return HttpResponse("Edited")


def deleteQuestionnaireByUid(request, id):
    try:
        questionnaire = Questionnaire.objects.get(uid=id)
    except Questionnaire.DoesNotExist:
        return HttpResponse("Questionnaire not exist")
    questionnaire.delete()
    return HttpResponse("Deleted")
