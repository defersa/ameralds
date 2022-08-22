from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView

from django.contrib.auth.models import User

from ..models import Pattern
from ameralds import env


class SendMailView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        email = request.data['email']

        pattern = Pattern.objects.get(pk=request.data['id'])

        html_template = get_template('email_template_ru.html')

        subject = 'Покупка схемы'
        html_content = html_template.render({'name': pattern.name.ru, 'sizes': '14, 16'})
        msg = EmailMultiAlternatives(subject, 'alternate text', None, [email])
        msg.attach_alternative(html_content, "text/html")

        for size in pattern.sizes.all():
            msg.attach_file(size.cbb.file.path)
            msg.attach_file(size.pdf.file.path)
            msg.attach_file(size.png.file.path)

        msg.content_subtype = 'html'
        msg.send()


        return Response({
            'result': True
        })


def send_verify_email(user: User):
        html_template = get_template('verify.html')

        href = env.FRONT_ROOT + '/auth/verify?user=' + user.username + '&token=' + user.person.token_verify.value

        html_content = html_template.render({'href': href})
        msg = EmailMultiAlternatives('Подтверждение почты', 'Verify email', None, [user.email])
        msg.attach_alternative(html_content, "text/html")

        msg.content_subtype = 'html'
        msg.send()
