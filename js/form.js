const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldset = mapForm.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

// Неактивное состояние страницы
const disablePage = () => {
  mapForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.setAttribute('disabled', '');
  });

  mapFormFieldset.setAttribute('disabled', '');

  adFormFieldsets.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

disablePage();

// Активное состояние страницы
const activatePage = () => {
  mapForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFormFieldset.removeAttribute('disabled');

  adFormFieldsets.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

activatePage();

export { disablePage, activatePage };
