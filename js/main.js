const SIMILAR_AD_COUNT = 10;

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
  'img/avatars/user11.png',
];

const TITLES = [
  'Невероятно горячее предложение',
  'Бесплатная отмена бронирования',
  'Страховой залог и предоплата не требуется',
  'Лучшее предложение этого месяца',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_PERIODS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Кондиционер и сейф для личных вещей',
  'Розетки около кровати',
  'Звукоизоляция во всем помещении',
  'C видом на живописный парк',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


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

// Функция возвращает неповторяющееся случайное значение из массива
const getUniqueRandomElement = (array) => {
  const randomElement = getRandomInt(0, array.length - 1);
  const randomElementItem = array[randomElement];
  array.splice(randomElement, 1);
  return randomElementItem;
};

//Функция возвращает массив случайной длины из случайных неповторяющихся значений
const getRandomArray = (array) => {
  const randomArray = new Array (getRandomInt(1, array.length)).fill(' ').map(() => (getRandomElement(array)));
  const uniqueElementsArray = [...new Set(randomArray)];
  return uniqueElementsArray;
};


// Функция создает одно объявление
const createAd = () => {
  const x = getRandomFloat(35.65000, 35.70000, 5);
  const y = getRandomFloat(139.7000, 139.80000, 5);

  return {
    author: {
      avatar: getUniqueRandomElement(AVATARS),
    },
    offer: {
      title: getRandomElement(TITLES),
      address: `${x}, ${y}`,
      price: getRandomInt(1000,100000),
      type: getRandomElement(TYPES),
      rooms:getRandomInt(1,10),
      guests: getRandomInt(1,20),
      checkin: getRandomElement(CHECK_PERIODS),
      checkout: getRandomElement(CHECK_PERIODS),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: x,
      lng: y,
    },
  };
};

// Генерация 10-ти случайных объявлений
const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
similarAds;
