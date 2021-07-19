import {
  renderPhoto
} from './pictures.js';

const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

// fieldset и select в формах ".ad-form" и ".map__filters"
const mapFormBlocks = filterForm.children;
const adFormBlocks = adForm.children;

// Фото
const avatarForm = adForm.querySelector('.ad-form-header__input');
const avatarPreviewForm = adForm.querySelector('.ad-form-header__preview img');
const photoForm = adForm.querySelector('.ad-form__input');
const photoPreviewForm = adForm.querySelector('.ad-form__photo-preview img');

// Блокировка полей в формах
const setDisabled = (elements) => {
  for (const element of elements) {
    element.disabled = true;
  }
};

// Неактивное состояние страницы: формы "Ваше объявление" и фильтра для карты
const disablePage = () => {
  filterForm.classList.add('map__filters--disabled');
  setDisabled(mapFormBlocks);
  adForm.classList.add('ad-form--disabled');
  setDisabled(adFormBlocks);
};

disablePage(); // по умолчанию страница выключена до загрузки карты

// Активация полей в формах
const setEnabled = (elements) => {
  for (const element of elements) {
    element.disabled = false;
  }
};

// Активное состояние формы "Ваше объявление" и события с фото
const activateAd = () => {
  adForm.classList.remove('ad-form--disabled');
  setEnabled(adFormBlocks);
  avatarForm.addEventListener('change', () => renderPhoto(avatarForm, avatarPreviewForm));
  photoForm.addEventListener('change', () => renderPhoto(photoForm, photoPreviewForm));
};


// Активное состояние фильтра для карты
const activateMapFilter = () => {
  filterForm.classList.remove('map__filters--disabled');
  setEnabled(mapFormBlocks);
};

export {
  avatarPreviewForm,
  photoPreviewForm,
  disablePage,
  activateAd,
  activateMapFilter
};
