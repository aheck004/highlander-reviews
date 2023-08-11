import requests
import json

url = 'https://catalog.ucdavis.edu/course-search/api/?page=fose&route=details'

headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Mode': 'cors',
    'Host': 'catalog.ucdavis.edu',
    'Origin': 'https://catalog.ucdavis.edu',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Referer': 'https://catalog.ucdavis.edu/course-search/',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Cookie': 'MYUCDAVIS_LANDING_IMAGE=bikesandtrees%2Ejpg%2Cblossoms%2Ejpg%2Cbunitransblur%2Ejpg%2Cccinterior%2Ejpg%2Ccpool%2Ejpg%2Ccwolfskill2%2Ejpg%2Cdeathblossom%2Ejpg%2Cdkayaks%2Ejpg%2Cdorms2%2Ejpg%2Cegret%2Ejpg%2Cflag2%2Ejpg%2CginsengMrak%2Ejpg%2Cgoags%2Ejpg%2Clibrary%2Ejpg%2Corchard%2Ejpg%2Cpallette%2Ejpg%2Cpcircle%2Ejpg%2Cplantsciences%2Ejpg%2Csciencewall%2Ejpg%2Csilo2%2Ejpg%2Cspokes%2Ejpg%2CstudentFarmPoppy%2EJPG',
    'X-Requested-With': 'XMLHttpRequest',
}

data = {
    "group": "key:9852",
    "key": "key:9852",
    "srcdb": "2023",
    "matched": "key:9852"
}

for i in range(1,11):
    data["group"] = "key:" + str(i)
    data["key"] = "key:" + str(i)
    data["matched"] = "key:" + str(i)
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        print(response.json())
    else:
        print(response.status_code)
        print(response.text)
        break
