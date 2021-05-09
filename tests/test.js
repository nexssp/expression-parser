const { parseData, expressionParser } = require("../");

const data = {
  my1stVar: "myfirst variable",
  number: 5,
  another: 10,
  functionx: (y) => {
    x = 3;
    return x + y;
  },
  something: "Here is evaluated the object itself: ${my1stVar}",
  calculate: "Some calculations working: ${number+another} ${functionx(1000)}",
  ommitedField: "Will not be evaluated: ${number+another}",
  x: "${a+b+C}", // Will not show error if a, b or C does not exist. as it is not evaluated.
};

console.log(parseData(data, ["ommitedField", "x"]));

const data2 = { x: 1, y: 2, s: "string", obj: { z: 1, d: 5 } };
console.log(expressionParser("HERE: ${s1}: ${x+y+obj.z}", data2));
