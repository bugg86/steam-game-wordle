import requests
import json

f = open('duplicates.json')

data = json.load(f)

url="http://localhost:8084/games"

for index in range(0, len(data['ids'])) :
    duplicates = requests.get(url + '/' + str(data['ids'][index]['_id']))
    print(duplicates.json())
    new_url = url + '/' + str(duplicates.json()[0]['_id'])
    res = requests.delete(new_url)