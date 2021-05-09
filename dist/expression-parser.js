require("@nexssp/extend")("string");const{bold:bold,red:red,yellow:yellow,green:green}=require("@nexssp/ansi"),expressionParser=(e,r)=>{if(Array.isArray(e))return e.map((e=>expressionParser(r,e)));let s=new Set;if(e&&isNaN(e)&&e.includes&&e.includes("${"))try{return e.interpolate(r)}catch(o){let n=[];if(o.message.includes("is not defined")){const e=o.message.split(" ")[0];Object.keys(r).forEach((r=>{e.similarity(r)>=50&&n.push(r)}))}s.add("=".repeat(80)),s.add(bold(`\tError in parsing expression: ${e},`)+red(bold(`\n\tError message: ${yellow(bold(o.message))}`))+` ${n&&n.length>0?bold(green(`\nDid you meant: ${bold(yellow(n.join(" or ")))}'?`)):""}`),s.add(r)}return s.size>0&&(s.forEach((e=>{console.log(e)})),process.exit(0)),e};module.exports.expressionParser=expressionParser,module.exports.parseData=(e,r=[])=>(Array.isArray(r)||0===r.length||null===r||!1===r?Object.keys(e).forEach((s=>{r&&!r.includes(s)&&(e[s]=expressionParser(e[s],e))})):(console.error(red("ommited must be array.")),process.exit(1)),e);