const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscEvent,
  debounce
};
