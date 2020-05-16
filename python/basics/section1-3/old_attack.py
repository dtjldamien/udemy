# single line comment
'''
    this is a multi line comment
'''

import random 


class Enemy:
    hp = 200


    def __init__(self, atkl, atkh):
        self.atkl = atkl
        self.atkh = atkh

    # self is the instance of the object
    def getAtk(self):
        print(self.atkl)

    def getHp(self):
        print("HP is", self.hp)

enemy1 = Enemy(40, 50)
enemy1.getAtk()
enemy1.getHp()

enemy2 = Enemy(70, 90)
enemy2.getAtk()
enemy2.getHp()

playerhp = 260
enemyatkl = 60
enemyatkh = 80

# stop the loop when player hp < 0
while playerhp > 0:
    dmg = random.randrange(enemyatkl, enemyatkh)
    playerhp = playerhp - dmg

    # min hp of 30
    if playerhp <= 30:
        playerhp = 30
    
    print("Enemy strikes for", dmg, "points of damage. Current HP is", playerhp)

    if playerhp > 30:
        continue
    
    print("You have low health. You have been teleported to the nearest inn")
    break