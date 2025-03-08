// Define recursive types for expressions
type ExpressionElement = number | string | ExpressionArray;
type ExpressionArray = ExpressionElement[];

function add(val1: number, val2: number): number {
    return val1 + val2;
}

function sub(val1: number, val2: number): number {
    return val1 - val2;
}

function mul(val1: number, val2: number): number {
    return val1 * val2;
}

function div(val1: number, val2: number): number {
    return val1 / val2;
}

function parseCalculation(expr: string): ExpressionArray {
    let str = '';
    str = expr.replaceAll(' ', '');
   
    let result: ExpressionArray = [];
    let i = 0;
   
    // With index starting at 0, create a loop that checks each single element inside the string str
    while (i < str.length) {
        // If str at index i is a number >= 0 or <= 9 execute the condition
        if (str[i] >= '0' && str[i] <= '9') {
            let num = '';
            // As long as the element is a number or a decimal point
            while ((str[i] >= '0' && str[i] <= '9') || str[i] === '.') {
                num += str[i++];
            }
            // Finally insert the number into result
            result.push(parseFloat(num));
            continue;
        }
       
        // If str at index i is one of the 4 operations then insert it into result
        if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {
            result.push(str[i++]);
            continue;
        }
       
        // If str at index i is an open parenthesis
        if (str[i] === '(') {
            let parenCount = 1;
            let j = i + 1;
           
            // As long as it continues to find open parentheses and the number of open parentheses is greater than 0
            while (parenCount > 0 && j < str.length) {
                if (str[j] === '(') parenCount++;
                if (str[j] === ')') parenCount--;
                j++;
            }
           
            // Insert into result some sub-arrays through the recursion of parseCalculation
            result.push(parseCalculation(str.substring(i + 1, j - 1)));
            i = j;
            continue;
        }
       
        i++;
    }
   
    // return the result array
    // Example "0 + 4 * (2 + 4 / (5 + 2))" -> ["0", "+", "4", "/", ["2", "+", "4", "/", ["5", "+", "2"]]]
    return result;
}

function evaluate(expr: ExpressionArray): number {
    // Check if the array has only one element, if the element is an array evaluate that array. Otherwise return element 0.
    if (expr.length === 1) return Array.isArray(expr[0]) ? evaluate(expr[0] as ExpressionArray) : expr[0] as number;
   
    // Create a duplicate of the expr array
    let calc: ExpressionElement[] = [...expr];
    
    // Create a loop with i = 0 that goes up to the length of calc.
    for (let i = 0; i < calc.length; i++) {
        // Check if calc at index i is an array, if it is evaluate that array.
        if (Array.isArray(calc[i])) {
            calc[i] = evaluate(calc[i] as ExpressionArray);
        }
    }
   
    // Check if there are multiplication or division operations, if there are operate on three elements of the array (number, operation, number)
    for (let i = 1; i < calc.length; i += 2) {
        if (calc[i] === '*' || calc[i] === '/') {
            const operation = calc[i] === '*' ? mul : div;
            calc[i - 1] = operation(calc[i - 1] as number, calc[i + 1] as number);
            calc.splice(i, 2);
            i -= 2;
        }
    }
   
    // Check if there are addition or subtraction operations, if there are operate on three elements of the array (number, operation, number)
    for (let i = 1; i < calc.length; i += 2) {
        const operation = calc[i] === '+' ? add : sub;
        calc[i - 1] = operation(calc[i - 1] as number, calc[i + 1] as number);
        calc.splice(i, 2);
        i -= 2;
    }
   
    // Return element 0 of calc
    return calc[0] as number;
}

function calculate(mathString: string): number {
    const parsed = parseCalculation(mathString);
    return evaluate(parsed);
}

if (process.argv.length > 2) {
    const expression = process.argv[2];
    const result = calculate(expression);
    console.log(result);
} else {
    const result = calculate("0 + 4 * (2 + 4 / (5 + 2))");
    console.log(result);
}