import services.scryfall_service as scryfall
import services.ehdrec_service as ehdrec


commander = scryfall.randomize_commander()
print(f'Randomized commander: {commander.get('Original-Name')}\n')
data = ehdrec.get_edh_data(commander.get('Formated-Name'))

print('Tags and Links from EDHREC:')
for item in data:
    print(f'{item[0]}: {item[1]}')
    print('-----')  


# scryfall = 'https://api.scryfall.com/cards/random?q=is%3Acommander'
# scryfall_data = requests.get(scryfall).json()

# def adjust_name(text):
#     return re.sub(r'-+', '-', re.sub(r'[,\s]', '-', text.lower()))

# commander = adjust_name(scryfall_data['name'])



# link = 'https://edhrec.com/commanders/' + commander
# headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'}

# request_data = requests.get(link)

# print(link)

# data = BeautifulSoup(request_data.text, 'html.parser')
# all = data.find(class_='NavigationPanel_tags__M9VjI')

# for item in all:
#     print(item.find(class_='NavigationPanel_label__xMLz1').get_text())
#     print(item['href'])
#     print('-----')




