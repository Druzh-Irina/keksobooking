// dry код (form.js - строки 38 и 39)!!!!!!!
const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

// fieldset и select в формах ".ad-form" и ".map__filters"
const mapFormBlocks = filterForm.children;
const adFormBlocks = adForm.children;

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

// Активное состояние формы "Ваше объявление"
const activateAd = () => {
  adForm.classList.remove('ad-form--disabled');
  setEnabled(adFormBlocks);
};

// Активное состояние фильтра для карты
const activateMapFilter = () => {
  filterForm.classList.remove('map__filters--disabled');
  setEnabled(mapFormBlocks);
};

export {
  disablePage,
  activateAd,
  activateMapFilter
};
