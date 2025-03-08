# TypeScript Calculator

A TypeScript calculator that processes mathematical expressions, including those with nested parentheses.

## How does it work?
The program takes a string as input, which is parsed and divided into an array.
If parentheses are present, they create sub-arrays within the main array.

Finally, with this array structure, each element is calculated according to the operations, processing from the deepest sub-array to the outermost.


## Supported Operations

- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- Expressions with parentheses

## How to Run

Install dependencies:

```
npm install
```


Run:

```
ts-node ./calculator.ts
```

or

```
ts-node ./calculator.ts "(8 + 3 + 25) / 20"
```