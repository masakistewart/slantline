from bs4 import BeautifulSoup
import requests


def getCnnHeadlines():
    cnnRaw = requests.get("http://www.cnn.com/specials/last-50-stories")
    cnnSoup = BeautifulSoup(cnnRaw.content, "html5lib")
    headlines = cnnSoup.find_all("h3", {"class": "cd__headline"})
    for headline in headlines:
        print(headline.text)
