from datetime import datetime, timedelta

boardingDate = input['boardingDate'] if 'boardingDate' in input else ""
contractDate = input['contractDate'] if 'contractDate' in input else ""
totalCost = input['totalCost'] if 'totalCost' in input else ""

try:
    balance = int(int(totalCost) / 2)
    deposit = int(int(totalCost) / 2)
except:
    balance = ""
    deposit = ""

try:
    depositDue = (datetime.strptime(contractDate, '%Y-%m-%d') + timedelta(weeks = 2)).strftime('%Y-%m-%d')
except:
    depositDue = ""

try:
    balanceDue = (datetime.strptime(boardingDate, '%Y-%m-%d') + timedelta(days = -30)).strftime('%Y-%m-%d')
except:
    balanceDue = ""
    
output = [{'balance': balance, 'balanceDue': balanceDue, 'deposit': deposit, 'depositDue': depositDue}]