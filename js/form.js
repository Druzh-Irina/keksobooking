import {
  CENTER_TOKYO,
  ZOOM_MAP,
  mainPin,
  map,
  removePins
} from './map.js';

import {
  sendData
} from './server.js';

import {
  showSuccessModal,
  showErrorModal
} from './popup.js';

import {
  resetPictures
} from './pictures.js';

const MIN_PRICE_OF_TYPE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
const MAX_PRICE = 1000000;
const PRICE_PLACEHOLDER = '1000';
const COORDINATE_ROUNDING = 5;

const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const titleForm = adForm.querySelector('#title');
const typeForm = adForm.querySelector('#type');
const priceForm = adForm.querySelector('#price');
const timeInForm = adForm.querySelector('#timein');
const timeOutForm = adForm.querySelector('#timeout');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const addressForm = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

// Извещения-балуны о вводе допустимого кол-ва символов в поле «Заголовок объявления»
const onTitleValueInput = () => {
  const title = titleForm.value;
  if (titleForm.validity.tooShort) {
    titleForm.setCustomValidity(`Напишите ещё ${titleForm.minLength - title.length} символов`);
  } else if (titleForm.validity.tooLong) {
    titleForm.setCustomValidity(`Вы указали ${title.length - titleForm.maxLength} лишних символов`);
  } else if (titleForm.validity.valueMissing) {
    titleForm.setCustomValidity('Обязательное поле для заполнения!');
  } else {
    titleForm.setCustomValidity('');
  }
  titleForm.reportValidity();
};

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const onTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};

// Извещения-балуны об указании допустимой цены в поле «Цена за ночь»
const onPriceValueInput = () => {
  const value = priceForm.value;
  if (value > MAX_PRICE) {
    priceForm.setCustomValidity(`Максимальная цена за ночь превышена на ${value - MAX_PRICE}руб.`);
  } else {
    priceForm.setCustomValidity('');
  }
  priceForm.reportValidity();
};

const onPriceValueChange = () => {
  if (typeForm.value === 'bungalow') {
    priceForm.placeholder = '0';
  } else if (typeForm.value === 'flat') {
    priceForm.placeholder = '1000';
    priceForm.min = '1000';
  } else if (typeForm.value === 'hotel') {
    priceForm.placeholder = '3000';
    priceForm.min = '3000';
  } else if (typeForm.value === 'house') {
    priceForm.placeholder = '5000';
    priceForm.min = '5000';
  } else if (typeForm.value === 'palace') {
    priceForm.placeholder = '10000';
    priceForm.min = '10000';
  }
};
onPriceValueChange();

// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
const onTimeInChange = (evt) => {
  timeOutForm.value = evt.target.value;
};

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
const onTimeOutChange = (evt) => {
  timeInForm.value = evt.target.value;
};

// Поле «Количество комнат» вводит ограничения на количество гостей в поле «Количество мест»
const onRoomsChange = () => {
  if (roomForm.value === '1' && capacityForm.value !== '1') {
    capacityForm.setCustomValidity('В 1 комнате возможно разместить только 1 гостя');
  } else if (roomForm.value === '2' && capacityForm.value !== '1' && capacityForm.value !== '2') {
    capacityForm.setCustomValidity('В 2 комнатах возможно разместить только от 1 до 2 гостей');
  } else if (roomForm.value === '3' && capacityForm.value === '0') {
    capacityForm.setCustomValidity('В 3 комнатах возможно разместить только от 1 до 3 гостей');
  } else if (roomForm.value === '100' && capacityForm.value !== '0') {
    capacityForm.setCustomValidity('100 комнат не для гостей');
  } else {
    capacityForm.setCustomValidity('');
  }
  capacityForm.reportValidity();
};

titleForm.addEventListener('input', onTitleValueInput);
typeForm.addEventListener('change', onTypeChange);
priceForm.addEventListener('input', onPriceValueInput);
typeForm.addEventListener('change', onPriceValueChange);
timeInForm.addEventListener('change', onTimeInChange);
timeOutForm.addEventListener('change',onTimeOutChange);
roomForm.addEventListener('change', onRoomsChange);
capacityForm.addEventListener('change', onRoomsChange);

// Передача координат главной метки в поле "Адрес (координаты)"
addressForm.readOnly = true;
const getAddressCoordinates = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(COORDINATE_ROUNDING);
  const lng = marker.getLatLng().lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};
// Получение изначального значения поля с координатами центра Токио
getAddressCoordinates(mainPin);

// Определение координат при передвижения метки по карте
mainPin.on('move', (evt) => {
  getAddressCoordinates(evt.target);
});

// Форма и карта переходят в изначальное состояние
const onResetForm = () => {
  adForm.reset();
  filterForm.reset();
  resetPictures();
  removePins();

  priceForm.placeholder = PRICE_PLACEHOLDER;

  mainPin.setLatLng(
    CENTER_TOKYO,
  );
  map.setView(
    CENTER_TOKYO,
    ZOOM_MAP);
  getAddressCoordinates(mainPin);
};

// Нажатие на кнопку "очистить" (reset-форма)
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  onResetForm();
});

// Отправить объявления по кнопке "опубликовать" (submit-форма)
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // @ts-ignore
  const formData = new FormData(evt.target);
  sendData(() => {
    showSuccessModal();
    onResetForm();
  }, showErrorModal, formData);
});
