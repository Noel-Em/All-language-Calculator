import sys

def add(val1, val2):
    return val1 + val2

def sub(val1, val2):
    return val1 - val2

def mul(val1, val2):
    return val1 * val2

def div(val1, val2):
    return val1 / val2

def parseCalculation(expr):
    # Remove all spaces from the expression
    str_expr = expr.replace(' ', '')
    
    result = []
    i = 0
    
    # With index starting at 0, create a loop that checks each single element inside the string str_expr
    while i < len(str_expr):
        # If str_expr at index i is a number >= 0 or <= 9 execute the condition
        if str_expr[i] >= '0' and str_expr[i] <= '9':
            num = ''
            # As long as the element is a number or a decimal point
            while i < len(str_expr) and ((str_expr[i] >= '0' and str_expr[i] <= '9') or str_expr[i] == '.'):
                num += str_expr[i]
                i += 1
            # Finally insert the number into result
            result.append(float(num))
            continue
        
        # If str_expr at index i is one of the 4 operations then insert it into result
        if str_expr[i] in ['+', '-', '*', '/']:
            result.append(str_expr[i])
            i += 1
            continue
        
        # If str_expr at index i is an open parenthesis
        if str_expr[i] == '(':
            paren_count = 1
            j = i + 1
            
            # As long as it continues to find open parentheses and the number of open parentheses is greater than 0
            while paren_count > 0 and j < len(str_expr):
                if str_expr[j] == '(':
                    paren_count += 1
                if str_expr[j] == ')':
                    paren_count -= 1
                j += 1
            
            # Insert into result some sub-arrays through the recursion of parseCalculation
            result.append(parseCalculation(str_expr[i+1:j-1]))
            i = j
            continue
        
        i += 1
    
    # return the result array
    # Example "0 + 4 * (2 + 4 / (5 + 2))" -> [0.0, "+", 4.0, "*", [2.0, "+", 4.0, "/", [5.0, "+", 2.0]]]
    return result

def evaluate(expr):
    # Check if the array has only one element, if the element is an array evaluate that array. Otherwise return element 0.
    if len(expr) == 1:
        return evaluate(expr[0]) if isinstance(expr[0], list) else expr[0]
    
    # Create a duplicate of the expr array
    calc = expr.copy()
    # Create a loop with i = 0 that goes up to the length of calc.
    for i in range(len(calc)):
        # Check if calc at index i is an array, if it is evaluate that array.
        if isinstance(calc[i], list):
            calc[i] = evaluate(calc[i])
    
    # Check if there are multiplication or division operations, if there are operate on three elements of the array (number, operation, number)
    i = 1
    while i < len(calc):
        if calc[i] == '*' or calc[i] == '/':
            operation = mul if calc[i] == '*' else div
            calc[i-1] = operation(calc[i-1], calc[i+1])
            calc.pop(i)
            calc.pop(i)
            i -= 2
        i += 2
    
    # Check if there are addition or subtraction operations, if there are operate on three elements of the array (number, operation, number)
    i = 1
    while i < len(calc):
        operation = add if calc[i] == '+' else sub
        calc[i-1] = operation(calc[i-1], calc[i+1])
        calc.pop(i)
        calc.pop(i)
        i -= 2
        i += 2
    
    # Return element 0 of calc
    return calc[0]

def calculate(mathString):
    parsed = parseCalculation(mathString)
    return evaluate(parsed)

if len(sys.argv) > 1:
    expression = sys.argv[1]
    result = calculate(expression)
    print(result)
else:
    result = calculate("0 + 4 * (2 + 4 / (5 + 2))")
    print(result)