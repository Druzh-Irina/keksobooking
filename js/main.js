// Утилитарные функции

// Функция возвращает случайное целое число
const getRandomIntegrity = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.abs(Math.round(rand));
};
getRandomIntegrity(-1, 3);

// Функция возвращает случайное целое число с плавающей точкой
const getRandomFloat = (min, max) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(5);
  return Math.abs(randomNum);
};
getRandomFloat(-1, 2);


// Для Кекстаграма:

// Функция для проверки максимальной длины строки
const getValidLength = (text, maxLength) => text.length <= maxLength;
getValidLength('Kekstagram', 10);
