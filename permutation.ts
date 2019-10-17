function remove<T>(a: T, arr: T[]) {
  return arr.filter(e => e !== a);
}

function foldLeft<U, V>(fn: (a: U, b: V) => V, init: V, list: U[]): V {
  const e = list.shift();
  if (!e) {
    return init;
  }
  return foldLeft(fn, fn(e, init), list);
}

function flatMap<U, V>(fn: (u: U) => V[], list: U[]): V[] {
  return foldLeft((a: V[], b: V[]) => b.concat(a), [] as V[], list.map(fn));
}

function permutations<T>(list: T[]): T[][] {
  if (list.length <= 0) return [[]];

  return flatMap(e => {
    return permutations(remove(e, list)).map(p => [e].concat(p));
  }, list);
}

console.log(permutations([1, 2, 3]));
