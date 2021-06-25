// Утилитарные функции

// Функция возвращает случайное целое число
export const getRandomInt = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};

// Функция возвращает случайное целое число с плавающей точкой
export const getRandomFloat = (min, max, fix) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(fix);
  return Math.abs(randomNum);
};

// Функция возвращает случайное значение из массива
export const getRandomElement = (element) => {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

// Функция возвращает неповторяющееся случайное значение из массива
export const getUniqueRandomElement = (array) => {
  const randomElement = getRandomInt(0, array.length - 1);
  const randomElementItem = array[randomElement];
  array.splice(randomElement, 1);
  return randomElementItem;
};


//Функция возвращает массив случайной длины из случайных неповторяющихся значений
export const getRandomArray = (array) => {
  const randomArray = new Array(getRandomInt(1, array.length)).fill(' ').map(() => (getRandomElement(array)));
  const uniqueElementsArray = [...new Set(randomArray)];
  return uniqueElementsArray;
};
