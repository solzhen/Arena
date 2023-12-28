from django.db import models
from django.utils.translation import gettext_lazy as _

class Fighter(models.Model):
    name = models.CharField("Name", max_length=200)
    clan = models.CharField("Clan", max_length=200, default="Lowborn")
    birth = models.PositiveIntegerField("Year of Birth")
    statSTR = models.SmallIntegerField("Strength", default=5)
    statDEX = models.SmallIntegerField("Dexterity", default=5)
    statAGI = models.SmallIntegerField("Agility", default=5)
    statRES = models.SmallIntegerField("Resilience", default=5)
    percentHP = models.SmallIntegerField("Health", default=100)
    percentST = models.SmallIntegerField("Stamina", default=100)

    class FighterStatus(models.TextChoices):
        WORKING = "WR", _("Working")
        RETIRED = "RT", _("Retired")
        DEAD = "DE", _("Dead")
        INJURED = "IN", _("Injured")
    status = models.CharField(
        max_length=2,
        choices=FighterStatus,
        default=FighterStatus.WORKING
    )
    
    def __str__(self) -> str:
        return self.name + " Of Clan " + self.clan