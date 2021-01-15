export const arrayToMap = (array: [any], key: string) => new Map(
  array.map(element => [element[key], element])
);