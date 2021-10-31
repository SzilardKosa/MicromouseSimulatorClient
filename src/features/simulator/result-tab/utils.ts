// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function subtractMatrices(a: number[][], b: number[][]): number[][] {
  return componentWiseOperation<number>((x, y) => x - y, a, b)
}

function componentWiseOperation<T>(o: (aE: T, bE: T) => T, a: T[][], b: T[][]): T[][] {
  const result = a.map((row, i) => row.map((element, j) => o(element, b[i][j])))
  return result
}
