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

// source: https://stackoverflow.com/a/2450976/6739517
export function shuffleArray<T>(ary: Array<T>) {
  let currentIndex = ary.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [ary[currentIndex], ary[randomIndex]] = [
      ary[randomIndex], ary[currentIndex]];
  }

  return ary;
}