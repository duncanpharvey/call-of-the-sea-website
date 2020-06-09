from datetime import datetime, timedelta

boardingDateTime = input['boardingDateTime'] if 'boardingDateTime' in input else ""

try:
    durationHours = int(input['durationHours'])
except:
    durationHours = 0

try:
    durationNights = int(input['durationNights'])
except:
    durationNights = 0

try:
    disembarkingDateTime = datetime.strptime(boardingDateTime, '%Y%m%d%H%M') + timedelta(days = durationNights, hours = durationHours)

    disembarkingDate = disembarkingDateTime.strftime('%Y-%m-%d')
    disembarkingTime = disembarkingDateTime.strftime('%I:%M %p').lstrip("0").lower()
except:
    disembarkingDate = ""
    disembarkingTime = ""

output = [{ 'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime }]