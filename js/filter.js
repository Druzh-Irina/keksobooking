import {
  createPinMarker,
  clearMarker
} from './map.js';

const DEFAULT_VALUE = 'any';
const SIMILAR_AD_COUNT = 10;

const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');

// Активное состояние фильтра для карты
const activateMapFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.removeAttribute('disabled');
  }
};

const checkType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (ad) => priceFilter.value === DEFAULT_VALUE || (ad.offer.price >= priceMapFilter[priceFilter.value].start && ad.offer.price <= priceMapFilter[priceFilter.value].end);

const checkRooms = (ad) => ad.offer.rooms === +roomsFilter.value || roomsFilter.value === DEFAULT_VALUE;

const checkGuests = (ad) => ad.offer.guests === +guestsFilter.value || guestsFilter.value === DEFAULT_VALUE;

const checkFeatures = (ad) => Array.from(featuresFilter)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(filterFeature.value);
  });

// Отфильтрованные объявления
const checkAllFilters = (ads) =>
  ads
    .slice()
    .filter((ad) => (checkType(ad) && checkPrice(ad) && checkRooms(ad) && checkGuests(ad) && checkFeatures(ad)))
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((ad) => createPinMarker(ad));

// Перерисовка карты
const changeFilters = (cb) => {
  mapFilters.addEventListener('change', () => {
    clearMarker(),
    cb();
  });
};

export {
  mapFilters,
  mapFiltersList,
  activateMapFilter,
  checkAllFilters,
  changeFilters
};
