import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Todo, CustomUser, Project


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)

    def resolve_all_todo(self, info):
        return Todo.objects.all()

    all_users = graphene.List(CustomUserType)

    def resolve_all_users(self, info):
        return CustomUser.objects.all()

    user_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    todos_by_user_name = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_todos_by_user_name(self, info, name=None):
        todos = Todo.objects.all()
        if name:
            todos = todos.filter(CustomUser__name=name)
            return todos


class CustomUserMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        id = graphene.ID()

    CustomUser = graphene.Field(CustomUserType)

    @classmethod
    def mutate(cls, self, info, email, id):
        user = CustomUser.objects.get(pk=id)
        CustomUser.email = email
        user.save()
        return CustomUserMutation(user=CustomUser)


class Mutation(graphene.ObjectType):
    update_user = CustomUserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

