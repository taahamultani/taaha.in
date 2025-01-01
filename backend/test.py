import requests

url = "http://127.0.0.1:8000/resume"
url = "https://api.taaha.in/resume"

data = {
    "name": "Taaha Multani",
    "email": "devtaaha@gmail.com",
    "location" : {"city":"mumbai"},
    "role" : "Admin"
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.json())
