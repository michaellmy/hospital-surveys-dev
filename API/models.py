from django.db import models


# Create your models here.


class Questionnaire(models.Model):
    uid = models.CharField(max_length=100, null=True, blank=True, unique=True)
    title = models.CharField(max_length=200)
    minAge = models.IntegerField(null=True, blank=True)
    maxAge = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    patientType = models.CharField(max_length=200)

    def __str__(self):
        return '%d. %s' % (self.pk, self.title)


class QuestionnaireContent(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, to_field="uid", on_delete=models.CASCADE, related_name='questionnaireContent')
    qid = models.CharField(max_length=100, null=True, blank=True)
    questionText = models.CharField(max_length=500)
    answerType = models.CharField(max_length=100)
    choices = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return '%d. %s' % (self.pk, self.questionText)


# class QuestionnaireAnswerPaper(models.Model):
#     uid = models.CharField(max_length=20)
#     date = models.DateTimeField(max_length=100)
#     age = models.CharField(max_length=200)
#
#
class AnswerContent(models.Model):
    uid = models.CharField(max_length=100)
