const DEFAULT_VALUE = 'any';

const priceMapFilter = {
  low: {start: 0, end: 10000},
  middle: {start: 10000, end: 50000},
  high: {start: 50000, end: 1000000},
};

const filterForm = document.querySelector('.map__filters');
const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomsFilter = filterForm.querySelector('#housing-rooms');
const guestsFilter = filterForm.querySelector('#housing-guests');

const checkType = (data) => typeFilter.value === data.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (data) => priceFilter.value === DEFAULT_VALUE || (data.offer.price >= priceMapFilter[priceFilter.value].start && data.offer.price <= priceMapFilter[priceFilter.value].end);

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
  const checkedFeatures = filterForm.querySelectorAll('input[name="features"]:checked');
  if (data.offer.features) {
    return Array.from(checkedFeatures).every((feature) => data.offer.features.includes(feature.value));
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
