import random
from fighters.models import Fighter


def init_res():
    return {
        'inititative': '',
        'message': [],        
        'winner': ''
    }


def battle_view(id1, id2):
    instance1 = Fighter.objects.get(pk=id1)
    instance2 = Fighter.objects.get(pk=id2)
    return simulate_fight(instance1, instance2)


def heal(id1, id2):
    instance1 = Fighter.objects.get(pk=id1)
    instance2 = Fighter.objects.get(pk=id2)
    instance1.percentHP = 100
    instance2.percentHP = 100
    instance1.status = "WR"
    instance2.status = "WR"
    instance1.save()
    instance2.save()
    response = init_res()
    response['message'].append("Healed and switched status to Working")
    return response


def d20():
    return random.randint(1, 20)


def d10():
    return random.randint(1, 10)


def score(stat):
    return (stat - 10) / 2


def simulate_fight(f1: Fighter, f2: Fighter):
    response = init_res()

    if (f1.status != "WR" or f2.status != "WR"):
        response['message'].append("Both fighters must be able to fight!")
        return response

    ir1 = f1.statAGI + d20()
    ir2 = f2.statAGI + d20()

    initiative_result = "{f1n}:{roll1};{f2n}:{roll2}".format(
        f1n=f1.name, roll1=ir1, f2n=f2.name, roll2=ir2)
    response['inititative'] = initiative_result

    ft = 0
    if (ir1 > ir2):
        ft = 1
    elif (ir1 == ir2 and f1.statDEX > f2.statDEX):
        ft = 1
    elif (ir1 == ir2 and f1.statAGI > f2.statAGI):
        ft = 1
    elif (ir1 == ir2 and f1.statDEX < f2.statDEX):
        ft = 2
    elif (ir1 == ir2 and f1.statAGI < f2.statAGI):
        ft = 2
    elif (ir1 == ir2):
        ft = random.randint(1, 2)
    else:
        ft = 2

    winner = 0

    while (True):
        if (ft == 1):
            attack(f1, f2, response)
            if (f2.percentHP <= 0):
                winner = 1
                break
        attack(f2, f1, response)
        if (f1.percentHP <= 0):
            winner = 2
            break
        if (ft == 2):
            attack(f1, f2, response)
            if (f2.percentHP <= 0):
                winner = 1
                break
    if (winner == 1):
        f2.percentHP = 0
        f2.status = "IN"
        response['message'].append("{f1n} wins the fight.".format(f1n=f1.name))
        response['winner'] = 1
        if (f1.percentHP < 50 and d20()+score(f1.statRES)<(10)):
            f1.status = "IN" 
            response['message'].append("However {f1n} is left heavily injured.".format(f1n=f1.name))
        else:
            response['message'].append("{f1n} is ready for the next battle.".format(f1n=f1.name))
    else:
        f1.percentHP = 0
        f1.status = "IN"
        response['message'].append("{f2n} wins the fight.".format(f2n=f2.name))
        response['winner'] = 2
        if (f2.percentHP < 50 and d20()+score(f2.statRES)<(10)):
            f2.status = "IN" 
            response['message'].append("However {f2n} is left heavily injured.".format(f2n=f2.name))
    f1.save()
    f2.save()
    return response

attack_phrases = [
    "{f1n} attempts to hit {f2n}.",
    "{f1n} tries to punch {f2n}.",
    "{f1n} swings a mighty blow at {f2n}.",
    "{f1n} lunges forward to strike {f2n}.",
    "{f1n} delivers a swift kick towards {f2n}.",
    "{f1n} charges towards {f2n} with a fierce attack.",
    "{f1n} aims a series of strikes at {f2n}.",
    "{f1n} thrusts their weapon towards {f2n}.",
    "{f1n} launches an unexpected attack on {f2n}.",
    "{f1n} executes a calculated strike against {f2n}.",
    "{f1n} goes for a devastating hit on {f2n}.",
    "{f1n} unleashes a barrage of attacks on {f2n}.",
    "{f1n} delivers a crushing blow to {f2n}.",
    "{f1n} attempts a skillful maneuver against {f2n}.",
    "{f1n} aims for a precise strike on {f2n}.",
    "{f1n} goes in for a swift jab at {f2n}.",
    "{f1n} strikes with precision towards {f2n}.",
    "{f1n} tries to overpower {f2n} with a forceful strike.",
    "{f1n} attempts a spinning attack towards {f2n}.",
    "{f1n} charges up and delivers a powerful hit to {f2n}.",
    "{f1n} makes an unexpected move against {f2n}.",
    "{f1n} delivers a quick and precise attack towards {f2n}.",
    "{f1n} strikes with determination at {f2n}.",
    "{f1n} maneuvers to land a critical strike on {f2n}.",
    "{f1n} aims a well-timed hit towards {f2n}.",
    "{f1n} moves in for a devastating blow against {f2n}.",
    "{f1n} delivers a swift and unexpected attack on {f2n}.",
    "{f1n} attempts a skillful strike at {f2n}.",
    "{f1n} goes for a sweeping attack towards {f2n}.",
    "{f1n} charges in with a powerful strike at {f2n}.",
]

def attack(f1: Fighter, f2: Fighter, bt: dict):
    attack_roll_1 = d20() + score(f1.statSTR)
    armor_class = 10 + score(f2.statDEX)
    
    bt['message'].append(random.choice(attack_phrases).format(
        f1n=f1.name, f2n=f2.name, ac=armor_class))
    
    # bt['message'].append("{f1n} attempts to hit {f2n} (DC:{ac}).".format(
    #     f1n=f1.name, f2n=f2.name, ac=armor_class))
    if (attack_roll_1 > armor_class):
        damage_roll = max(d10() + score(f1.statSTR), 1)
        f2.percentHP = f2.percentHP - damage_roll
        bt['message'].append("{f1n} strikes true and deals {d1} damage to {f2n}.".format(
            f1n=f1.name, d1=damage_roll, f2n=f2.name))
    else:
        bt['message'].append("{f1n} misses.".format(f1n=f1.name))
