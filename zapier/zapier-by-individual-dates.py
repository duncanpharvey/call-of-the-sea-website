from datetime import datetime

eventTitle = input['eventTitle'] if 'eventTitle' in input else ""

try:
    dates = eventTitle.replace(' ', '').split(':')[-1].split('-')
    boardingDate = datetime.strptime(dates[0], '%B%d%Y').strftime('%Y-%m-%d')
    disembarkingDate = datetime.strptime(dates[1], '%B%d%Y').strftime('%Y-%m-%d')
except:
    boardingDate = ""
    disembarkingDate = ""

output = [{ 'boardingDate': boardingDate, 'disembarkingDate': disembarkingDate }]