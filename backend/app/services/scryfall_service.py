import requests
import re

def randomize_commander():
    scryfall = 'https://api.scryfall.com/cards/random?q=is%3Acommander'
    scryfall_data = requests.get(scryfall).json()
    return {'Original-Name': scryfall_data['name'],'Formated-Name' : adjust_name(scryfall_data['name'])}

def adjust_name(name):
    return re.sub(r'-+', '-', re.sub(r'[,\s]', '-', name.lower()))
