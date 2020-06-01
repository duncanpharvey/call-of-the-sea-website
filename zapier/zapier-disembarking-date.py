from datetime import datetime, timedelta

boardingDateTime = input['boardingDateTime'] if 'boardingDateTime' in input else ""
durationHours = input['durationHours'] if 'durationHours' in input else ""
durationDays = input['durationDays'] if 'durationDays' in input else ""

try:
    delta = timedelta(hours = int(durationHours)) if durationHours else timedelta(days = int(durationDays))
    disembarkingDateTime = datetime.strptime(boardingDateTime, '%Y%m%d%H%M') + delta

    disembarkingDate = disembarkingDateTime.strftime('%Y-%m-%d')
    disembarkingTime = disembarkingDateTime.strftime('%I:%M %p').lstrip("0").lower()
except:
    disembarkingDate = ""
    disembarkingTime = ""

output = [{'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime}]