function squareRoot(num: number, tolerance: number): number {
  if (num < 0) {
    throw new Error("invalid parameter");
  } else if (num === 0) {
    return 0;
  }

  let root = 1;
  const delta = Math.max(Number.EPSILON, 1 / 10 ** tolerance);

  while (Math.abs(root * root - num) > delta) {
    root -= (root * root - num) / (2 * root);
  }

  return root;
}

console.log(squareRoot(2, 10));
