import { interpolate } from "@nexssp/extend";

declare function expressionParser<T extends string | any[] | any>(
  expression: T,
  data: object
): T;

declare function parseData<T extends object>(
  data: T,
  omitted?: (keyof T)[]
): T;

declare module "@nexssp/expression-parser" {
  export { expressionParser, parseData };
}
