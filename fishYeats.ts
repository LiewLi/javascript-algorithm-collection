export default function fishYeats<T>(arr: T[]): T[] {
  const array = arr.slice();

  for (let i = array.length - 1; i > 0; --i) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[randomIndex], array[i]] = [array[i], array[randomIndex]];
  }

  return array;
}

console.log(fishYeats([1, 2, 3, 4, 5, 6]));
