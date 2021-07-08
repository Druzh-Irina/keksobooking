const mapForm = document.querySelector('.map__filters');
const mapFormBlocks = mapForm.children;
const adForm = document.querySelector('.ad-form');
const adFormBlocks = adForm.children;

// Блокировка полей в формах
const setDisabled = (elements) => {
  for (const element of elements) {
    element.disabled = true;
  }
};
// Неактивное состояние страницы
const disablePage = () => {
  mapForm.classList.add('map__filters--disabled');
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

// Активное состояние страницы

const activatePage = () => {
  mapForm.classList.remove('map__filters--disabled');
  setEnabled(mapFormBlocks);
  adForm.classList.remove('ad-form--disabled');
  setEnabled(adFormBlocks);
};

export {
  adForm,
  disablePage,
  activatePage
};
