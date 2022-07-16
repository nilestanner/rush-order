/**
 * Range of numbers from start to end. (akin to python range)
 */
export function range(start: number, stop: number): Array<number> {
  const array = [];
  for (let i = start; i < stop; i++) {
    array.push(i);
  }
  return array;
}
