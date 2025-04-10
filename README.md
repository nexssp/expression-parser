# @nexssp/expression-parser

Lightweight JavaScript expression parser with error diagnostics and object interpolation.

## Features
- Safe evaluation of embedded JavaScript expressions
- Intelligent variable name suggestions for undefined variables
- Recursive object parsing
- Clear error reporting with ANSI formatting

## Installation

```bash
npm install @nexssp/expression-parser
```


## Usage

### Basic Expression Parsing
```javascript
const { expressionParser } = require("@nexssp/expression-parser");

const data = { a: 5, b: 10 };
console.log(expressionParser("Sum: ${a + b}", data));
// Output: "Sum: 15"
```

### Object Data Parsing
```javascript
const { parseData } = require("@nexssp/expression-parser");

const template = {
  greeting: "Hello ${name}!",
  calculation: "${x * y}",
  nested: {
    value: "${Math.PI.toFixed(2)}"
  },
  omitted: "Will not parse: ${undefined}"
};

const result = parseData(template, ["omitted"]);
console.log(result);
/* Output:
{
  greeting: "Hello John!",
  calculation: 50,
  nested: { value: "3.14" },
  omitted: "Will not parse: ${undefined}"
}
*/
```

### Error Handling
![Error Example](https://user-images.githubusercontent.com/53263666/117570866-6d63b500-b0cc-11eb-9708-40563a022d1d.png)

## API

### `expressionParser(exp, data)`
Evaluates expressions in strings while handling errors gracefully.

### `parseData(object, omittedKeys)`
Recursively processes object values, skipping specified keys.

## Security
**Important:** Uses JavaScript evaluation - only use with trusted input sources.
