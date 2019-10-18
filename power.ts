export default function pow(base: number, p: number): number {
  if (base <= 0 || p < 0) {
    throw new Error("invalid param");
  }

  let ret = 1;
  while (p) {
    if (p & 0x1) {
      ret *= base;
      p--;
    } else {
      base *= base;
      p >>= 1;
    }
  }

  return ret;
}

console.log(pow(2, 10));
