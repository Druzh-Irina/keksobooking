// eslint-disable-next-line no-redeclare
/* global L:readonly */
import {adForm, activatePage} from './toggle-page-state.js';
import {renderCard} from './card.js';

const COORDINATE_ROUNDING = 5;
const ZOOM_MAP = 12;

const CENTER_TOKYO = {
  lat: 35.69034,
  lng: 139.75175,
};

// Главная метка
// @ts-ignore
const PIN_MAIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Метка для объявлений
// @ts-ignore
const PIN_AD = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Open source изображение
const LeafletParameters = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Создание изначальных координат в поле "Адрес (координаты)"
const addressForm = adForm.querySelector('#address');
const updateAddress = (location) => {
  const lat = location.lat.toFixed(COORDINATE_ROUNDING);
  const lng = location.lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};

// Отображение карты
// @ts-ignore
const map = L.map('map-canvas')
  .on('load', () => { // инициализация карты, (слушатель события)
    updateAddress(CENTER_TOKYO);
    activatePage(); // При успешной загрузке карты старница переключается в активное состояние
  }).setView(CENTER_TOKYO, ZOOM_MAP);

// добавление open source изображения на созданную карту
// @ts-ignore
L.tileLayer(
  LeafletParameters.TILE_LAYER,
  {
    attribution: LeafletParameters.ATTRIBUTION,
  },
).addTo(map);

// Добавление метки
// @ts-ignore
const mainPin = L.marker(
  CENTER_TOKYO,
  {
    draggable: true, // передвижение метки по карте
    icon: PIN_MAIN,
  },
);

mainPin.addTo(map);

// Обработчик передвижения метки по карте
mainPin.on('move', (evt) => {
  updateAddress(evt.target.getLatLng());
});

const notice = document.querySelector('.notice');
const noticeForm = notice.querySelector('.ad-form');
const resetButton = noticeForm.querySelector('button[type="reset"]');

// Возвращение метки на исходные координаты
const resetMainPin = (marker) => {
  marker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, ZOOM_MAP);
};

const getResetForm = () => {
  resetMainPin(mainPin);
};

resetButton.addEventListener('click', getResetForm);

// Создание метки с объявлением
const createPinAd = (ad, layer = map) => {
  // @ts-ignore
  const marker = L.marker(ad.location, {icon: PIN_AD});
  marker
    .addTo(layer)
    .bindPopup(renderCard(ad), // привязывает балун-объявление к метке
      {
        keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
      },
    );
  return marker;
};

// Создание слоя с группой меток
const createMarkerGroup = (ads) => {
  // @ts-ignore
  const markerGroup = L.layerGroup().addTo(map);
  ads.forEach((ad) => createPinAd(ad, markerGroup));
  return markerGroup;
};

export {resetMainPin, createPinAd, createMarkerGroup};
