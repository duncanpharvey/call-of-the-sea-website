from datetime import datetime

boardingDateTime = input['boardingDateTime'] if 'boardingDateTime' in input else ''
disembarkingDateTime = input['disembarkingDateTime'] if 'disembarkingDateTime' in input else ''

try:
    boardingDateTime = datetime.strptime(boardingDateTime, '%Y-%m-%dT%H:%M:%S')
    disembarkingDateTime = datetime.strptime(disembarkingDateTime, '%Y-%m-%dT%H:%M:%S')

    boardingDate = boardingDateTime.strftime('%Y-%m-%d')
    boardingTime = boardingDateTime.strftime('%I:%M %p').lstrip('0').lower()

    disembarkingDate = disembarkingDateTime.strftime('%Y-%m-%d')
    disembarkingTime = disembarkingDateTime.strftime('%I:%M %p').lstrip('0').lower()
except:
    boardingDate = ''
    boardingTime = ''
    disembarkingDate = ''
    disembarkingTime = ''

output = [{ 'boardingDate': boardingDate, 'boardingTime': boardingTime, 'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime }]