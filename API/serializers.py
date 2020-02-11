from rest_framework import serializers
from .models import QuestionnaireContent, Questionnaire, AnswerContent, QuestionAnswer


class QuestionnaireContentSerializers(serializers.ModelSerializer):
    #id = serializers.IntegerField(required=False)

    class Meta:
        model = QuestionnaireContent
        fields = ('qid', 'questionText', 'answerType', 'choices')


class QuestionnaireSerializers(serializers.ModelSerializer):
    questionnaireContent = QuestionnaireContentSerializers(many=True)

    class Meta:
        model = Questionnaire
        fields = ('uid', 'title', 'minAge', 'maxAge', 'description', 'patientType', 'questionnaireContent')
        extra_kwargs = {
            'uid': {'validators': []},
        }


class QuestionnaireListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ('uid', 'title')


class QuestionAnswerSerializers(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ('qid', 'answerType', 'answer')


class AnswerContentSerializers(serializers.ModelSerializer):
    questionAnswer = QuestionAnswerSerializers(many=True)

    class Meta:
        model = AnswerContent
        fields = ('uid', 'date', 'age', 'questionAnswer')
