import json
import os


if os.path.isfile("./section5/ages.json") and os.stat("./section5/ages.json").st_size != 0:
    old_file = open("./section5/ages.json", "r+")
    data = json.loads(old_file.read())
    print("Current age is", data["age"], "--adding a year.")
    data["age"] = int(data["age"]) + 1
    print("New age is", data["age"])
else:
    old_file = open("./section5/ages.json", "w+")
    data = {"name": "Nick", "age" : "22"}
    print("No file found, setting default age to", data["age"])

old_file.seek(0)
old_file.write(json.dumps(data))

# reading file
newfile = open("./section5/newfile.txt", "w+")
string = "This is the content that will be written to the text file."
newfile.write(string)