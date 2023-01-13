
from django.contrib.auth.models import User
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

#from search.models import Customer
from search.models import DataAsset


@registry.register_document
class DataAssetDocument(Document):
    # customer = fields.ObjectField(properties={
    #     'CUSTOMER_ID': fields.IntegerField(),
    #     'FULL_NAME': fields.TextField(),
    #     'EMAIL_ADDRESS': fields.TextField(),
    # })

    # type = fields.TextField(attr='type_to_string')

    class Index:
        name = 'zips'
    #     settings = {
    #         'number_of_shards': 1,
    #         'number_of_replicas': 1,
    #     }

    class Django:
        model = DataAsset
        fields = [
            'Business_MetaData',
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
        ]























####--------------------
# @registry.register_document
# class CustomerDocument(Document):
#     customer = fields.ObjectField(properties={
#         'CUSTOMER_ID': fields.IntegerField(),
#         'FULL_NAME': fields.TextField(),
#         'EMAIL_ADDRESS': fields.TextField(),
#     })

#     type = fields.TextField(attr='type_to_string')

#     # class Index:
#     #     name = 'customer'
#     #     settings = {
#     #         'number_of_shards': 1,
#     #         'number_of_replicas': 1,
#     #     }

#     class Django:
#         model = Customer
#         fields = [
#             'CUSTOMER_ID',
#             'FULL_NAME',
#             'EMAIL_ADDRESS',
#         ]


#     #  CUSTOMER_ID    = models.IntegerField()
#     # FULL_NAME = models.CharField(max_length=30)
#     # EMAIL_ADDRESS = models.EmailField(max_length=254)