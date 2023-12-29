import random
from ..fighters.models import Fighter


def d20():
    return random.randint(1, 20)


def d10():
    return random.randint(1, 10)


def score(stat):
    return (stat - 10) / 2


def simulate_fight(f1: Fighter, f2: Fighter):
    battle = {}

    ir1 = f1.statAGI + d20()
    ir2 = f2.statAGI + d20()

    initiative_result = "{f1n}'s initiative roll: {roll1}.;{f2n}'s initiative roll: {roll2}.".format(
        f1n=f1.name, roll1=ir1, f2n=f2.name, roll2=ir2)
    battle['inititative'] = initiative_result

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

    battle['fight'] = ""
    winner = 0

    while (True):
        if (ft == 1):
            attack(f1, f2, battle)
            if (f2.percentHP <= 0):
                winner = 1
                break
        attack(f2, f1, battle)
        if (f1.percentHP <= 0):
            winner = 2
            break
        if (ft == 2):
            attack(f1, f2, battle)
            if (f2.percentHP <= 0):
                winner = 1
                break
    if (winner == 1):
        f1.percentHP == 0
        f1.status = "IN"
        battle['fight'] += "{f2n} wins the fight. ".format(f2n=f2.name)
        battle['winner'] = 1
    else:
        f2.percentHP == 0
        f2.status = "IN"
        battle['fight'] += "{f1n} wins the fight. ".format(f1n=f1.name)
        battle['winner'] = 2
    return battle


def attack(f1: Fighter, f2: Fighter, bt: dict):
    attack_roll_1 = d20() + score(f1.statSTR)
    armor_class = 10 + score(f2.statDEX)
    bt['fight'] += "{f1n} attempts to hit {f2n}. ".format(
        f1n=f1.name, f2n=f2.name)
    if (attack_roll_1 > armor_class):
        damage_roll = d10() + score(f1.statSTR)
        f2.percentHP = f2.percentHP - damage_roll
        bt['fight'] += "{f1n} strikes true and deals {d1} damage to {f2n}. ".format(
            f1n=f1.name, d1=damage_roll, f2n=f2.name)
    else:
        bt['fight'] += "{f1n} misses. ".format(f1n=f1.name)
