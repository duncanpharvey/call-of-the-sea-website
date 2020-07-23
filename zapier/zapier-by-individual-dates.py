from datetime import datetime
import re

eventTitle = input['eventTitle'] if 'eventTitle' in input else ''
boardingDate = input['boardingDate'] if 'boardingDate' in input else ''
disembarkingDate = input['disembarkingDate'] if 'disembarkingDate' in input else ''
boardingTime = input['boardingTime'] if 'boardingTime' in input else ''
disembarkingTime = input['disembarkingTime'] if 'disembarkingTime' in input else ''

if not boardingDate and not disembarkingDate:
    try:
        dates = eventTitle.replace(' ', '').split(':')[-1].split('-')
        boardingDate = datetime.strptime(dates[0], '%B%d%Y').strftime('%Y-%m-%d')
        disembarkingDate = datetime.strptime(dates[1], '%B%d%Y').strftime('%Y-%m-%d')
    except:
        boardingDate = ''
        disembarkingDate = ''

if not boardingTime and not disembarkingTime and re.search('day[-| ]camp', eventTitle.lower()):
    boardingTime = '9:00 am'
    disembarkingTime = '4:00 pm'

output = [{ 'boardingDate': boardingDate, 'boardingTime': boardingTime, 'disembarkingDate': disembarkingDate, 'disembarkingTime': disembarkingTime }]