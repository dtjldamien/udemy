import requests
import json


'''
# payload
url = "url shortener"
payload = {"longUrl": "http://example.com"}
headers = {"Content-Type": "application/json"}
r = requests.post(url, json = payload, headers=headers)
print(r.text)
'''

my_data = {"name": "Damien", "email": "dtjldamien@gmail.com"}
# e.g. website does not work
r = requests.post("http://www.w3schools.com/php/welcome.php", data = my_data)

f = open("./section5/myfile.html", "w+")
f.write(r.text)