from datetime import datetime, timedelta

boardingDateTime = input['boardingDateTime'] if 'boardingDateTime' in input else ""
duration = input['duration'] if 'duration' in input else ""

try:
    disembarkingDateTime = datetime.strptime(boardingDateTime, '%Y%m%d%H%M') + timedelta(hours = int(duration))

    disembarkingDate = disembarkingDateTime.strftime('%Y-%m-%d')
    disembarkingTime = disembarkingDateTime.strftime('%I:%M %p').lstrip("0").lower()
except:
    disembarkingDate = ""
    disembarkingTime = ""

output = [{'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime}]