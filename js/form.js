import {
  resetPage
} from './map.js';
import {
  sendData
} from './server.js';
import {
  mapFilters,
  mapFiltersList
} from './filter.js';
import {
  showSuccessModal,
  showErrorModal
} from './popup.js';
import {
  renderPhoto
} from './pictures.js';

const IMG_WIDTH = 70;
const IMG_HEIGHT = 70;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 1000000;
const COORDINATE_ROUNDING = 5;

const MIN_PRICE_OF_TYPE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;
// Для валидации
const titleForm = adForm.querySelector('#title');
const typeForm = adForm.querySelector('#type');
const priceForm = adForm.querySelector('#price');
const timeInForm = adForm.querySelector('#timein');
const timeOutForm = adForm.querySelector('#timeout');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const addressForm = adForm.querySelector('#address');
const adFormReset = adForm.querySelector('.ad-form__reset');
// Для фотографий
const adFormAvatar = document.querySelector('.ad-form-header__preview');
const adFormPhoto = document.querySelector('.ad-form__photo');
const avatarPreview = adFormAvatar.querySelector('img').cloneNode(true);
const avatarChooser = adForm.querySelector('#avatar');
const photoChooser = adForm.querySelector('#images');

// Извещения-балуны о вводе допустимого кол-ва символов в поле «Заголовок объявления»
const onTitleValueInput = () => {
  const titleLength = titleForm.value.length;
  if (titleLength < MIN_LENGTH) {
    titleForm.style.borderColor = 'red';
    titleForm.setCustomValidity(`Напишите ещё ${MIN_LENGTH - titleLength} символов`);
  } else if (titleLength > MAX_LENGTH) {
    titleForm.style.borderColor = 'red';
    titleForm.setCustomValidity(`Вы указали ${titleLength - MAX_LENGTH} лишних символов`);
  } else {
    titleForm.style.borderColor = 'white';
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
  const valuePrice = priceForm.value;
  if (valuePrice < MIN_PRICE_OF_TYPE[typeForm.value]) {
    priceForm.style.borderColor = 'red';
  } else if (valuePrice > MAX_PRICE) {
    priceForm.style.borderColor = 'red';
    priceForm.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE}.`);
  } else {
    priceForm.style.borderColor = 'white';
    priceForm.setCustomValidity('');
  }
  priceForm.reportValidity();
};


// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
const onTimeInChange = () => {
  timeOutForm.value = timeInForm.value;
};

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
const onTimeOutChange = () => {
  timeInForm.value = timeOutForm.value;
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
timeInForm.addEventListener('change', onTimeInChange);
timeOutForm.addEventListener('change', onTimeOutChange);
roomForm.addEventListener('change', onRoomsChange);
capacityForm.addEventListener('change', onRoomsChange);

// Передача координат главной метки в поле "Адрес (координаты)"
const getAddressCoordinates = (coordinates) => {
  addressForm.value = `${(coordinates.lat).toFixed(COORDINATE_ROUNDING)}, ${(coordinates.lng).toFixed(COORDINATE_ROUNDING)}`;
};

// Создать превью аватара (Ваша фотография)
const getAvatar = (result) => {
  const fragment = document.createDocumentFragment();
  avatarPreview.src = result;
  fragment.appendChild(avatarPreview);
  adFormAvatar.innerHTML = '';
  adFormAvatar.appendChild(fragment);
};

// Создать превью фотографии жилья
const getPhoto = (result) => {
  adFormPhoto.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const element = document.createElement('img');
  element.src = result;
  element.alt = 'Фото жилья';
  element.width = IMG_WIDTH;
  element.height = IMG_HEIGHT;
  fragment.appendChild(element);
  adFormPhoto.appendChild(fragment);
};

const getAvatarPreview = () => renderPhoto(avatarChooser, getAvatar);
const getPhotoPreview = () => renderPhoto(photoChooser, getPhoto);

getAvatarPreview();
getPhotoPreview();

// Неактивное состояние страницы: формы "Ваше объявление" и фильтра для карты
const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  for (const elem of adFormList) {
    elem.setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.setAttribute('disabled', 'disabled');
  }
};

// Активное состояние формы "Ваше объявление"
const activateAd = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const elem of adFormList) {
    elem.removeAttribute('disabled');
  }
};

// Отправка объявления по кнопке "опубликовать" (submit-форма)
const publishFormSubmit = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        showSuccessModal();
        resetPage();
        cb();
      },
      showErrorModal,
      formData);
  });
};

// Нажатие на кнопку "очистить" (reset-форма)
const onButtonReset = (cb) => {
  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
    cb();
  });
};

export {
  disablePage,
  activateAd,
  getAddressCoordinates,
  publishFormSubmit,
  adForm,
  onTypeChange,
  onButtonReset,
  avatarPreview,
  adFormPhoto
};
