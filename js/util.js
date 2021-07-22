const DELAY = 500;

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscEvent = (evt) => evt.keyCode === 27 || evt.key === 'Escape' || evt.key === 'Esc';

export {
  debounce,
  isEscEvent
};
