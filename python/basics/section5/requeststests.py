import requests
from io import BytesIO
from PIL import Image


# https://httpstatuses.com/
params = {"q": "pizza"}
r = requests.get("http://google.com/search", params = params)
print("Status:", r.status_code)

print(r.url)

f = open("./section5/page.html", "w+")
f.write(r.text)

# image
r = requests.get("https://cdn.bmwblog.com/wp-content/uploads/2016/10/BMW-5series-sedan-imagesandvideos-1920x1200-01.jpg")
print("Status code:", r.status_code)
image = Image.open(BytesIO(r.content))
print(image.size, image.format, image.mode)
path = "./section5/image." + image.format
try: 
    image.save(path, image.format)
except IOError:
    print("Cannot save image.")