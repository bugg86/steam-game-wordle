import pandas as pd
import json

# df = pd.read_csv('final_steam_data.csv', names=("steam_appid","name","developers","publishers","release_date","genre","metacritic","initialprice","owners"))

# df.to_json('test.json', orient='records')

f = open('raw_steam_data.json')

data = json.load(f)

popList = []

for index in range(0, len(data['games'])):
    if data['games'][index]['developers'] is None or data['games'][index]['publishers'] is None or data['games'][index]['name'] is None is None or data['games'][index]['genre'] is None or data['games'][index]['initialprice'] is None or data['games'][index]['release_date'] is None:
        popList.append(index)
print(len(popList))
for index in reversed(popList):
    data['games'].pop(index)

for index in range(0, len(data['games'])):
    # Convert dev string into array
    temp = data['games'][index]['developers']
    temp = temp.replace("[", "").replace("]", "").replace("'", "")
    devarray = temp.split(",")
    data['games'][index]['developers'] = devarray
    # Convert pub string in array
    temp = data['games'][index]['publishers']
    temp = temp.replace("[", "").replace("]", "").replace("'", "")
    pubarray = temp.split(",")
    data['games'][index]['publishers'] = pubarray
    # Convert app id string into int
    data['games'][index]['steam_appid'] = int(data['games'][index]['steam_appid'])
    # Convert owners into minOwners and maxOwners
    owners = data['games'][index]['owners'].split(" .. ")
    data['games'][index]['minowners'] = int(owners[0].replace(",", ""))
    data['games'][index]['maxowners'] = int(owners[1].replace(",", ""))
    del data['games'][index]['owners']
    # Convert genres string in array
    genrearray = data['games'][index]['genre'].split(",")
    data['games'][index]['genre'] = genrearray

    # Convert metacritic string into object
    if data['games'][index]['metacritic'] is not None:
        tempMeta = eval(data['games'][index]['metacritic'])
        data['games'][index]['metacritic'] = tempMeta['score']

    # Convert release date string into object
    tempDate = eval(data['games'][index]['release_date'])
    data['games'][index]['release_date'] = tempDate


newJsonData = json.dumps(data)

with open('test2.json', 'x') as outfile:
    outfile.write(newJsonData)