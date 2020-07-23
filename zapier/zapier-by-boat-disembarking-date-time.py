from datetime import datetime, timedelta

boardingDate = input['boardingDate'] if 'boardingDate' in input else ''
boardingTime = input['boardingTime'] if 'boardingTime' in input else ''
disembarkingDate = input['disembarkingDate'] if 'disembarkingDate' in input else ''
disembarkingTime = input['disembarkingTime'] if 'disembarkingTime' in input else ''

if not disembarkingDate and not disembarkingTime:
    try:
        durationHours = int(input['durationHours'])
    except:
        durationHours = 0

    try:
        durationNights = int(input['durationNights'])
    except:
        durationNights = 0

    try:
        disembarkingDateTime = datetime.strptime(boardingDate + ' ' + boardingTime, '%Y-%m-%d %I:%M %p') + timedelta(days = durationNights, hours = durationHours)
        disembarkingDate = disembarkingDateTime.strftime('%Y-%m-%d')
        disembarkingTime = disembarkingDateTime.strftime('%I:%M %p').lstrip('0').lower()
    except:
        disembarkingDate = ''
        disembarkingTime = ''

output = [{ 'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime }]