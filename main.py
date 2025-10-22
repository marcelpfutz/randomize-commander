import requests
from bs4 import BeautifulSoup

commander = 'edgar-markov'
link = 'https://edhrec.com/commanders/' + commander
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'}

request_data = requests.get(link)

data = BeautifulSoup(request_data.text, 'html.parser')
tags = data.find_all(class_='NavigationPanel_label__xMLz1')
links = data.find_all(class_='LinkHelper_container__tiM9S')
all = data.find(class_='NavigationPanel_tags__M9VjI')

for item in all:
    print(item.find(class_='NavigationPanel_label__xMLz1').get_text())
    print(item['href'])
    print('-----')



# for tag in tags:
#     print(tag.get_text())   