// Утилитарные функции

// Функция возвращает случайное целое число
const getRandomIntegrity = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};
getRandomIntegrity(-1, 3);

// Функция возвращает случайное число с плавающей точкой
const getRandomFloat = (min, max, floatNumber) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(Math.abs(floatNumber));
  return Math.abs(randomNum);
};
getRandomFloat(-1, 2, -5);
