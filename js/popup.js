import {
  isEscEvent
} from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorPopupMessage = errorPopup.querySelector('.error__message');
const closeErrorButton = errorPopup.querySelector('.error__button');

const showSuccessModal = () => {
  document.body.appendChild(successPopup);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
    }
  });
  document.addEventListener('click', () => {
    successPopup.remove();
  });
};

const showErrorModal = () => {
  errorPopupMessage.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(errorPopup);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
    }
  });
  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
  });
  document.addEventListener('click', () => {
    errorPopup.remove();
  });
};

export {
  showSuccessModal,
  showErrorModal
};
