const DEFAULT_VALUE = 'any';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelector('#housing-features');

const checkType = (data) => typeFilter.value === data.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (data) => {
  switch (priceFilter.value) {
    case 'low':
      return data.offer.price < MIN_PRICE;
    case 'middle':
      return data.offer.price >= MIN_PRICE && data.offer.price <= MAX_PRICE;
    case 'high':
      return data.offer.price > MAX_PRICE;
    case 'any':
      return true;
  }
};

const checkRooms = (data) => {
  if (roomsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return +roomsFilter.value === data.offer.rooms;
};

const checkGuests = (data) => {
  if (guestsFilter.value === DEFAULT_VALUE) {
    return true;
  }
  return +guestsFilter.value === data.offer.guests;
};

const checkFeatures = (data) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = data.offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const checkAllFilters = (data) => data.filter((value) =>
  checkType(value) &&
  checkPrice(value) &&
  checkRooms(value) &&
  checkGuests(value) &&
  checkFeatures(value));

const changeFilters = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

export {
  checkAllFilters,
  changeFilters
};
