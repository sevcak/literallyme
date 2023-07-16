const getRandomInt = (min: number, max: number, exclude?: number | undefined) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  let result = Math.floor(Math.random() * (max - min) + min);

  while (exclude && result === exclude) {
    result = Math.floor(Math.random() * (max - min) + min);
  }

  return result;
}

export { getRandomInt };