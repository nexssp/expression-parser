const { interpolate, similarity } = require("@nexssp/extend");
const { bold, red, yellow, green } = require("@nexssp/ansi");

/**
 * @template T
 * @param {T} exp
 * @param {object} data
 * @returns {T}
 */
const expressionParser = (exp, data) => {
  const errors = new Set();

  if (typeof exp === "string" && exp.includes("${")) {
    try {
      return interpolate(exp, data);
    } catch (er) {
      let suggestions = [];
      if (er.message.includes("is not defined")) {
        const undefinedVar = er.message.split(" ")[0];
        Object.keys(data).forEach((k) => {
          if (similarity(undefinedVar, k) >= 50) {
            suggestions.push(k);
          }
        });
      }

      errors.add("=".repeat(80));
      errors.add(
        bold(`\tError parsing expression: ${exp}`) +
        red(bold(`\n\tError: ${yellow(bold(er.message))}`)) +
        (suggestions.length > 0
          ? bold(green(`\nDid you mean: ${bold(yellow(suggestions.join(" or ")))}?`))
          : "")
      );
    }
  }

  if (errors.size > 0) {
    throw new Error(Array.from(errors).join("\n"));
  }

  return exp;
};

module.exports.expressionParser = expressionParser;

/**
 * @template {object} T
 * @param {T} data
 * @param {(keyof T)[]} [omitted=[]]
 * @returns {T}
 */
module.exports.parseData = (data, omitted = []) => {
  if (!Array.isArray(omitted)) {
    throw new TypeError("'omitted' must be an array");
  }

  const processValue = (value, context) => {
    if (typeof value === "string") {
      return expressionParser(value, context);
    } else if (Array.isArray(value)) {
      return value.map((item) => processValue(item, context));
    } else if (value !== null && typeof value === "object") {
      const newObj = {};
      for (const key in value) {
        newObj[key] = processValue(value[key], context);
      }
      return newObj;
    }
    return value;
  };

  const result = {};
  for (const key of Object.keys(data)) {
    if (omitted.includes(key)) {
      result[key] = data[key];
    } else {
      result[key] = processValue(data[key], data);
    }
  }

  return result;
};
