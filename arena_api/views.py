# views.py
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def battle(request, id1, id2):
    # Your method logic here
    # Perform actions you want to execute

    # Return a response if needed
    return JsonResponse({'message': 'Method called successfully'})
