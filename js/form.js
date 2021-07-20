import {
  CENTER_TOKYO,
  ZOOM_MAP,
  mainPin,
  map
} from './map.js';

import {
  sendData
} from './server.js';

import {
  showSuccessModal,
  showErrorModal
} from './popup.js';

import {
  avatarPreviewForm,
  photoPreviewForm
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

const IMG_DEFAULT = {
  DESCRIPTION: 'Фото',
  SRC: 'img/muffin-grey.svg',
};

const COORDINATE_ROUNDING = 5;


const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const titleForm = adForm.querySelector('#title');
const typeForm = adForm.querySelector('#type');
const priceForm = adForm.querySelector('#price');
const timeinForm = adForm.querySelector('#timein');
const timeOutForm = adForm.querySelector('#timeout');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const addressForm = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

// Извещения-балуны о вводе допустимого кол-ва символов в поле «Заголовок объявления»
const getTitleChange = () => {
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
const getTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};

// // Извещения-балуны об указании допустимой цены в поле «Цена за ночь»
const getPriceChange = (evt) => {
  const target = evt.target;
  if (target.validity.rangeUnderflow) {
    priceForm.setCustomValidity(`Укажите стоимость не ниже ${target.min}`);
  } else if (target.validity.rangeOverflow) {
    priceForm.setCustomValidity(`Укажите стоимость не выше ${target.max}`);
  } else if (target.validity.valueMissing) {
    priceForm.setCustomValidity('Обязательное поле для заполнения!');
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

// Передача координат главной метки в поле "Адрес (координаты)"
addressForm.readOnly = true;
const getAddressCoordinates = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(COORDINATE_ROUNDING);
  const lng = marker.getLatLng().lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};
// Получение изначальное значение поля с координатами центра Токио
getAddressCoordinates(mainPin);

// Определение координат при передвижения метки по карте
mainPin.on('move', (evt) => {
  getAddressCoordinates(evt.target);
});

const resetPictures = () => {
  avatarPreviewForm.src = IMG_DEFAULT.SRC;
  photoPreviewForm.src = IMG_DEFAULT.SRC;
};

// Форма и карта переходят в изначальное состояние
const onResetForm = () => {
  adForm.reset();
  filterForm.reset();
  resetPictures();

  const pricePlaceholder = '1000';
  priceForm.placeholder = pricePlaceholder;

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
  const formData = new FormData(evt.target);
  sendData(() => {
    showSuccessModal();
    onResetForm();
  }, showErrorModal, formData);
});
