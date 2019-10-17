import { remove, flatMap } from "./utils";

function combine<T>(comboOptions: T[], combLength: number): T[][] {
  if (combLength <= 0) {
    throw new Error("invalid parameter");
  }

  if (combLength === 1) {
    return comboOptions.map(e => [e]);
  }

  return flatMap(e => {
    return combine(remove(e, comboOptions), combLength - 1).map(comb =>
      [e].concat(comb)
    );
  }, comboOptions);
}

console.log(combine([1, 2, 3], 2));
