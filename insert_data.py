import requests
import json

f = open('final_cleaned_steam_data.json')

data = json.load(f)

print(len(data['games']))

url="http://localhost:8084/games"

for index in range(0, len(data['games'])) :
    res = requests.post(url, data = json.dumps(data['games'][index]), headers={"Content-Type": "application/json"})
    if (res.status_code != 201):
        print(res.json)