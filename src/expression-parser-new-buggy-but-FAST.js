const expressionParser2 = (data) => {
  if (!data) return data;
  let jsON = JSON.stringify(data);

  parserSyntax.forEach((ps) => {
    jsON = jsON.replace(ps.match, ps.replace);
  });

  let errors = new Set();
  let inter;
  try {
    inter = jsON.interpolate(data);
  } catch (er) {
    let maybe = [];
    if (er.message.includes("is not defined")) {
      const undefinedVar = er.message.split(" ")[0];

      Object.keys(data).forEach((k) => {
        if (undefinedVar.similarity(k) > 50) {
          maybe.push(k);
        }
      });
    }
    errors.add(
      `Some of your \$\{\} expression has an error.\nError message: ${bold(
        er.message
      )} ${maybe ? `\nDid you meant: ${bold(maybe.join(" or "))}?` : ""}`
    );
  }

  if (errors.size > 0) {
    errors.forEach((se) => {
      log.error(se);
    });
    process.exit(0);
  }

  return JSON.parse(inter.replace(/\\/g, "\\\\"));
};
