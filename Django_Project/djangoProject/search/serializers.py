#from django.contrib.auth.models import User
from rest_framework import serializers

from search.models import DataAsset

class DataAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataAsset
        fields = ( 'Business_MetaData',
                    'col_name',
                    'data_type',
                    'foreignkey_connnum',
                    'foreignkey_fieldnum',
                    'isforeignkey',
                    'isnotnull',
                    'isprimarykey',
                    'isuniquekey',
                    'table_name',
                    'table_schema'
                    )