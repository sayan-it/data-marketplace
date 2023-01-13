from django.db import models

from django.db import models




# Create your models here.# Blogpost to be indexed into ElasticSearch


# class DataAsset(models.Model):   
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dataasset')   
#     posted_date = models.DateField(default=timezone.now)   
#     title = models.CharField(max_length=200)   
#     text = models.TextField(max_length=1000)


# class Customer(models.Model):
#     CUSTOMER_ID = models.IntegerField()
#     FULL_NAME = models.CharField(max_length=30)
#     EMAIL_ADDRESS = models.EmailField(max_length=254)
 
#     print('working till here')

class DataAsset(models.Model):
    Business_MetaData = models.TextField(max_length=1000)
    data_type = models.CharField(max_length=30)
    col_name = models.CharField(max_length=30)
    foreignkey_fieldnum = models.TextField(max_length=30)   ## Could be issue --> Anish --> had an issue changed from int to Text field
    foreignkey_connnum = models.TextField(max_length=30)   ## Could be issue --> Anish --> had an issue changed from int to Text field
    isforeignkey = models.TextField(max_length=100)
    isnotnull = models.BooleanField()
    isprimarykey = models.BooleanField() 
    isuniquekey = models.BooleanField()
    table_name = models.CharField(max_length=30)
    table_schema = models.CharField(max_length=30)
    print('working till here')
   
   
   
    #     CUSTOMER_ID = models.IntegerField()
   #  FULL_NAME = models.CharField(max_length=30)
#     EMAIL_ADDRESS = models.EmailField(max_length=254)

