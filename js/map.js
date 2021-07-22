import {
  activateAd,
  getAddressCoordinates,
  adForm,
  onTypeChange
} from './form.js';
import {
  renderCard
} from './card.js';
import {
  mapFilters
} from './filter.js';
import {
  avatarPreview,
  adFormPhoto
} from './form.js';

const L = window.L;
const ZOOM_MAP = 12;
const IMG_DEFAULT = 'img/muffin-grey.svg';

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

const getMap = () => {
  map.on('load', () => {
    activateAd(), // При успешной загрузке карты форма "Ваше объявление" переключается в активное состояние
    getAddressCoordinates(CENTER_TOKYO);
  })
    .setView(CENTER_TOKYO, ZOOM_MAP);

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

// Определение координат при передвижении метки по карте
const mainMarkerCoordinates = () => mainPin.on('move', (evt) => {
  const points = evt.target.getLatLng();
  getAddressCoordinates(points);
});

// Создание слоя с группой меток
const markerGroup = L.layerGroup().addTo(map);

// Создание меток с объявлениями
const createPinMarker = (data) => {
  const pinMarker = L.marker(
    data.location, {
      icon: PIN_AD,
    },
  );

  pinMarker
    .addTo(markerGroup)
    .bindPopup(
      renderCard(data), // привязывает балун-объявление к метке
      {
        keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
      },
    );
};

// Очищение слоя с метками объявлений
const clearMarker = () => markerGroup.clearLayers();

// Форма и карта переходят в дефолтное состояние
const resetPage = () => {
  mainPin.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, ZOOM_MAP);
  adForm.reset();
  avatarPreview.src = IMG_DEFAULT;
  adFormPhoto.innerHTML = '';
  const adFormInputs = adForm.querySelectorAll('input');
  adFormInputs.forEach((input) => input.style.borderColor = '');
  const resetMainPinMarker = mainPin.getLatLng();
  getAddressCoordinates(resetMainPinMarker);
  onTypeChange();
  mapFilters.reset();
  clearMarker();
};

export {
  getMap,
  createPinMarker,
  mainMarkerCoordinates,
  resetPage,
  clearMarker
};
