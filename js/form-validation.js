import {
  adForm
} from './toggle-page-state.js';

const MIN_PRICE_OF_TYPE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const ROOM_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_OF_TYPE = 1000000;

const titleForm = adForm.querySelector('#title');
const typeForm = adForm.querySelector('#type');
const priceForm = adForm.querySelector('#price');
const timeinForm = adForm.querySelector('#timein');
const timeOutForm = adForm.querySelector('#timeout');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');

// Извещения-балуны о вводе допустимого кол-ва символов в поле «Заголовок объявления»
const getTitleChange = () => {
  const title = titleForm.value.length;
  if (title < MIN_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Напишите ещё ${MIN_TITLE_LENGTH - title} символов`);
  } else if (title > MAX_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Вы указали ${title - MAX_TITLE_LENGTH} лишних символов`);
  } else {
    titleForm.setCustomValidity('');
  }
  titleForm.reportValidity();
};

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const getTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};

// Извещения-балуны об указании допустимой цены в поле «Цена за ночь»
const getPriceChange = () => {
  const price = priceForm.value;
  const type = typeForm.value;
  const minPrice = MIN_PRICE_OF_TYPE[type];

  if (price < minPrice) {
    priceForm.setCustomValidity(`Укажите стоимость не ниже ${minPrice}`);
  } else if (price > MAX_PRICE_OF_TYPE) {
    priceForm.setCustomValidity(`Укажите стоимость не выше ${MAX_PRICE_OF_TYPE}`);
  } else {
    priceForm.setCustomValidity('');
  }
  priceForm.reportValidity();
};

// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
const getTimeInChange = () => {
  timeinForm.value = timeOutForm.value;
};

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
const getTimeOutChange = () => {
  timeOutForm.value = timeinForm.value;
};

// Поле «Количество комнат» вводит ограничения на количество гостей в поле «Количество мест»
const getRoomsChange = () => {
  const capacityOptions = capacityForm.querySelectorAll('option');
  capacityOptions.forEach((items) => {
    items.disabled = true;
  });
  ROOM_CAPACITY[roomForm.value].forEach((items) => {
    capacityOptions.forEach((option) => {
      if (Number(option.value) === items) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};
getRoomsChange();

titleForm.addEventListener('input', getTitleChange);
typeForm.addEventListener('change', getTypeChange);
priceForm.addEventListener('input', getPriceChange);
timeinForm.addEventListener('change', getTimeOutChange);
timeOutForm.addEventListener('change', getTimeInChange);
roomForm.addEventListener('change', getRoomsChange);

export {
  getTitleChange,
  getTypeChange,
  getPriceChange,
  getTimeInChange,
  getTimeOutChange,
  getRoomsChange
};
