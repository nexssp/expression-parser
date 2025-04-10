const { interpolate } = require("@nexssp/extend");
const { bold, red, yellow, green } = require("@nexssp/ansi");

const expressionParser = (exp, data) => {
  // if (!exp) exp = data;
  // if (Object.prototype.toString.call(exp) === `[object Object]`) {
  //   return Object.assign(
  //     {},
  //     Object.keys(exp).map(ex => expressionParser(data, ex))
  //   );
  // }
  if (Array.isArray(exp)) {
    return exp.map((subexpr) => expressionParser(subexpr, data));
  }

  let errors = new Set();
  if (exp && isNaN(exp) && exp.includes && exp.includes("${")) {
    try {
      return exp.interpolate(data);
    } catch (er) {
      let maybe = [];
      if (er.message.includes("is not defined")) {
        const undefinedVar = er.message.split(" ")[0];
        Object.keys(data).forEach((k) => {
          if (undefinedVar.similarity(k) >= 50) {
            maybe.push(k);
          }
        });
      }

      errors.add("=".repeat(80));
      errors.add(
        bold(`\tError in parsing expression: ${exp},`) +
        red(bold(`\n\tError message: ${yellow(bold(er.message))}`)) +
        ` ${maybe && maybe.length > 0
          ? bold(
            green(
              `\nDid you meant: ${bold(yellow(maybe.join(" or ")))}'?`
            )
          )
          : ""
        }`
      );

      errors.add(data);
    }
  }

  if (errors.size > 0) {
    errors.forEach((se) => {
      console.log(se);
    });
    process.exit(0);
  }

  return exp;
};

module.exports.expressionParser = expressionParser;

module.exports.parseData = (data, ommited = []) => {
  if (
    Array.isArray(ommited) ||
    ommited.length === 0 ||
    ommited === null ||
    ommited === false
  ) {
    Object.keys(data).forEach((e) => {
      if (ommited && !ommited.includes(e)) {
        data[e] = expressionParser(data[e], data);
      }
    });
  } else {
    console.error(red(`ommited must be array.`));
    process.exit(1);
  }

  return data;
};
