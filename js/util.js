// Утилитарные функции

// Функция возвращает случайное целое число
const getRandomInt = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};

// Функция возвращает случайное целое число с плавающей точкой
const getRandomFloat = (min, max, fix) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(fix);
  return Math.abs(randomNum);
};

// Функция возвращает случайное значение из массива
const getRandomElement = (element) => {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

//Функция возвращает массив случайной длины из случайных неповторяющихся значений
const getRandomArray = (array) => {
  const randomArray = new Array(getRandomInt(1, array.length)).fill(' ').map(() => (getRandomElement(array)));
  const uniqueElementsArray = [...new Set(randomArray)];
  return uniqueElementsArray;
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomElement,
  getRandomArray
};
