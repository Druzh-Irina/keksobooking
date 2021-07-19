import {
  renderCard
} from './card.js';
import {
  activateAd,
  activateMapFilter
} from './toggle-page-state.js';
import {
  getData
} from './server.js';
import {
  showAlert
} from './show-alert.js';
import {
  checkAllFilters,
  changeFilters
} from './filter.js';
import {
  debounce
} from './util.js';

const L = window.L;
const ZOOM_MAP = 12;
const SIMILAR_AD_COUNT = 10;

const CENTER_TOKYO = {
  lat: 35.69034,
  lng: 139.75175,
};

// Главная метка
const PIN_MAIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Метка для объявлений
const PIN_AD = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const LeafletParameters = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Отображение карты
const map = L.map('map-canvas');

const getMap = (cb) => {
  map.on('load', () => {
    cb();
  })
    .setView(
      CENTER_TOKYO,
      ZOOM_MAP);

  // добавление open source изображения на созданную карту
  L.tileLayer(
    LeafletParameters.TILE_LAYER, {
      attribution: LeafletParameters.ATTRIBUTION,
    },
  ).addTo(map);
};

// Добавление метки
const mainPin = L.marker(
  CENTER_TOKYO, {
    draggable: true, // передвижение метки по карте
    icon: PIN_MAIN,
  },
);

mainPin.addTo(map);

const markers = [];

// Создание меток с объявлениями
const addPinOnMap = (place) => {
  const marker = L.marker({
    lat: place.location.lat,
    lng: place.location.lng,
  }, {
    icon: PIN_AD,
  });

  marker.addTo(map).bindPopup(renderCard(place), // привязывает балун-объявление к метке
    {
      keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
    },
  );
  markers.push(marker);
};

// Отображение меток на карте не более 10 штук
const renderPins = (places) => {
  places.slice(0, SIMILAR_AD_COUNT).forEach((place) => {
    addPinOnMap(place);
  });
};

const removePins = () => {
  markers.forEach((marker) => marker.remove());
};

getMap(() => {
  activateAd(); // При успешной загрузке карты форма "Ваше объявление" переключается в активное состояние
  getData((places) => {
    renderPins(places);
    changeFilters(debounce(() => {
      removePins();
      renderPins(checkAllFilters(places));
    }));
    activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
  }, (error) => showAlert(error));
});

export {
  CENTER_TOKYO,
  ZOOM_MAP,
  getMap,
  mainPin,
  map,
  addPinOnMap,
  renderPins,
  removePins
};
