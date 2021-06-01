// Утилитарные функции

// Функция возвращает случайное целое число или число с плавающей точкой
const getRandomNumber = (min, max, floatNumber) => {
  if (min >= 0 && max >= 0 && min < max && floatNumber >= 0 || floatNumber === undefined) {
    const rand = (Math.random() * (max - min) + min).toFixed(floatNumber);
    return Number(rand);
  }
  return 0; // диапазон указан некорректно
};
getRandomNumber(0.4, 2.5, 5);
