export function remove<T>(a: T, arr: T[]): T[] {
  return arr.filter(e => e !== a);
}

export function foldLeft<U, V>(fn: (a: U, b: V) => V, init: V, list: U[]): V {
  const e = list.shift();
  if (!e) {
    return init;
  }
  return foldLeft(fn, fn(e, init), list);
}

export function flatMap<U, V>(fn: (u: U) => V[], list: U[]): V[] {
  return foldLeft((a: V[], b: V[]) => b.concat(a), [] as V[], list.map(fn));
}
