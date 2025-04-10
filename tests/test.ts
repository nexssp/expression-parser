import { parseData, expressionParser } from "../";

interface TestData {
  x: number;
  y: number;
  title: string;
  calculation: string;
  enabled: boolean;
  nested: {
    value: string;
  };
}

const data: TestData = {
  x: 5,
  y: 10,
  title: "Total: ${x + y}",
  calculation: "${x * y}",
  enabled: "${x > 0}",
  nested: {
    value: "PI: ${Math.PI.toFixed(2)}"
  }
};

// Type-safe parsing with autocomplete
const result = parseData(data, ["enabled"]);
console.log({ result });

// Direct expression parsing
const output = expressionParser("Sum: ${x + y}", data);
console.log(output);
