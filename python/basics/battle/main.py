from classes.game import Person, bcolors
from classes.magic import Spell
from classes.inventory import Item
import random


# Create Black Magic
fire = Spell("Fire", 10, 500, "black")
thunder = Spell("Thunder", 12, 510, "black")
blizzard = Spell("Blizzard",  8, 570, "black")
meteor = Spell("Meteor", 20, 1100, "black")
quake = Spell("Quake", 14, 940, "black")

# Create White Magic
cure = Spell("Cure", 10, 700, "white")
cura = Spell("Thunder", 12, 1000, "white")

# Create some Items
potion = Item("Potion", "potion", "Heals 50 HP", 50)
hipotion = Item("Hi-Potion", "potion", "Heals 100 HP", 100)
superpotion = Item("Super Potion", "potion", "Heals 500HP", 500)

elixir = Item("Elixer", "elixir", "Fully restores HP/MP of one party member", 9999)
hielixir = Item("Mega-Elixer", "elixir", "Fully restores party's member", 9999)

grenade = Item("Grenade", "attack", "Deals 500 damage", 500)

player_spells = [fire, thunder, blizzard, meteor, quake, cure, cura]
player_items = [{"item": potion, "quantity": 15},
                {"item": hipotion, "quantity": 5},
                {"item": superpotion, "quantity": 3},
                {"item": elixir, "quantity": 5},
                {"item": hielixir, "quantity": 2},
                {"item": grenade, "quantity": 2}]

# Instantiate people
player1 = Person("Valos :", 6200, 200, 60, 34, player_spells, player_items)
player2 = Person("Asher :", 4000, 148, 60, 34, player_spells, player_items)
player3 = Person("Robot :", 4600, 170, 60, 34, player_spells, player_items)

enemy1 = Person("Magus :", 10000, 185, 45, 25, [], [])
enemy2 = Person("Imp   :", 1250, 130, 560, 325, [], [])
enemy3 = Person("Imp   :", 1250, 130, 560, 325, [], [])

players = [player1, player2, player3]
enemies = [enemy1, enemy2, enemy3]
running  = True
i = 0

#  bcolors.ENDC stops the formatting of FAIL and BOLD
# print(bcolors.FAIL + bcolors.BOLD + "AN ENEMY ATTACKS!" + bcolors.ENDC)

while running:
    print("=======")
    print("                  HP                                   MP")
    print("                  _________________________            __________")
    for player in players:
        player.get_stats()

    for enemy in enemies:
        enemy.get_enemy_stats()

    for player in players:
        player.choose_action()
        choice = input("    Choose action: ")
        # python starts from 0
        index = int(choice) - 1
        
        if index == 0:
            dmg = player.generate_damage()
            enemy = player.choose_target(enemies)
            enemies[enemy].take_damage(dmg)
            print("    You attacked " + enemies[enemy].name + "for", dmg, "points of damage.")
            if enemies[enemy].get_hp() == 0:
                print(enemies[enemy].name + " has died.")
                del enemies[enemy]
        elif index == 1:
            player.choose_magic()
            magic_choice = int(input("Choose magic: ")) - 1
            
            if magic_choice == -1:
                continue

            spell = player.magic[magic_choice]
            magic_dmg = spell.generate_damage()
            current_mp = player.get_mp()
            player.reduce_mp(spell.cost)

            if spell.cost > current_mp:
                print(bcolors.FAIL + "\nNot enough MP\n" + bcolors.ENDC)
                continue

            if spell.type == "white":
                player.heal(magic_dmg)
                print(bcolors.OKBLUE + "\n" + spell.name + " heals for", str(magic_dmg ), "HP." + bcolors.ENDC)
            elif spell.type == "black":
                enemy = player.choose_target(enemies)
                enemies[enemy].take_damage(magic_dmg)
                print(bcolors.OKBLUE + "\n" + spell.name + " deals", str(magic_dmg), "points of damage to " + enemies[enemy].name + bcolors.ENDC)
                if enemies[enemy].get_hp() == 0:
                    print(enemies[enemy].name + " has died.")
                    del enemies[enemy]
        elif index == 2:
            player.choose_item()
            item_choice = int(input("Choose item: ")) - 1
            
            if item_choice == -1:
                continue

            if player.items[item_choice]["quantity"] == 0:
                print(bcolors.FAIL + "\n" + "None left..." + bcolors.ENDC)
                continue

            item = player.items[item_choice]["item"]
            player.items[item_choice]["quantity"] -= 1

            if item.type == "potion":            
                player.heal(item.prop)
                print(bcolors.OKGREEN + "\n" + item.name + " heals for", str(item.prop), "HP" + bcolors.ENDC)

            elif item.type == "elixir":
                if item.name == "Mega-Elixer":  
                    for i in players:
                        i.hp = i.get_max_hp()
                        i.mp = i.get_max_mp()
                else:
                    player.hp = player.get_max_hp()
                    player.mp = player.get_max_mp()

                print(bcolors.OKGREEN + "\n" + item.name + " fully restored HP/MP" + bcolors.ENDC)

            elif item.type == "attack":
                enemy = player.choose_target(enemies)
                enemies[enemy].take_damage(item.prop)
                print(bcolors.FAIL + "\n" + item.name + " deals", str(item.prop), "points of damage to " + enemies[enemy].name + bcolors.ENDC)
                if enemies[enemy].get_hp() == 0:
                    print(enemies[enemy].name + " has died.")
                    del enemies[enemy]

    enemy_choice = 1
    target = random.randrange(0, 3)
    enemy_dmg = enemies[0].generate_damage()
    players[target].take_damage(enemy_dmg)
    print("Enemy attacks for", enemy_dmg)

    defeated_enemies = 0
    for enemy in enemies:
        if enemy.get_hp() == 0:
            defeated_enemies += 1

    defeated_players = 0
    for player in players:
        if player.get_hp() == 0:
            defeated_players += 1


    if defeated_enemies == 3:
        print(bcolors.OKGREEN + "You win!" + bcolors.ENDC)
        running = False
    if defeated_players == 3:
        print(bcolors.FAIL + "Your enemy has defeated you!" + bcolors.ENDC)
        running = False
