const ESC_ALL_BROWSERS = 'Escape';
const ESC_IE = 'Esc';

const isEscEvent = (evt) => evt.key === ESC_ALL_BROWSERS || evt.key === ESC_IE;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  debounce,
  isEscEvent
};
