from rest_framework.decorators import api_view
from rest_framework.response import Response
from dj_rest_auth.registration.views import VerifyEmailView
from rest_framework.response import Response


@api_view()
def root_route(request):
    return Response({
        "message": "Welcome to my drf API!"
    })


class CustomVerifyEmailView(VerifyEmailView):
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)

        # After successful email verification, redirect the user to the frontend login page
        frontend_login_url = "https://5173-sjecollins-combinedadvf-9z27f75w04w.ws-eu108.gitpod.io/signin"
        return redirect(frontend_login_url)