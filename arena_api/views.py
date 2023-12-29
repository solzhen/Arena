# views.py
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from game_logic.battle import battle_view as bv
from game_logic.battle import heal


@csrf_exempt
def battle_view(request, id1, id2):
    # Your method logic here
    # Perform actions you want to execute

    # Return a response if needed
    battle_d = bv(id1, id2)
    return JsonResponse(battle_d)


@csrf_exempt
def heal_view(request, id1, id2):
    heal_d = heal(id1, id2)
    return JsonResponse(heal_d)
