import { remove, flatMap } from "./utils";

function permutations<T>(list: T[]): T[][] {
  if (list.length <= 0) return [[]];

  return flatMap(e => {
    return permutations(remove(e, list)).map(p => [e].concat(p));
  }, list);
}

console.log(permutations([1, 2, 3]));
