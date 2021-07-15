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

const getMap = (callBackFunction) => {
  map.on('load', () => {
    callBackFunction();
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

// Создание меток с объявлениями
const createPinGroup = (places) => {
  places.forEach((ad) => {
    const marker = L.marker({
      lat: ad.location.lat,
      lng: ad.location.lng,
    }, {
      icon: PIN_AD,
    });

    marker.addTo(map).bindPopup(renderCard(ad), // привязывает балун-объявление к метке
      {
        keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
      });
  });
};

getMap(() => {
  activateAd(); // При успешной загрузке карты форма "Ваше объявление" переключается в активное состояние
  getData((json) => {
    createPinGroup(json.slice(0, SIMILAR_AD_COUNT));
    activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
  }, (error) => showAlert(error));
});

export {
  getMap,
  mainPin,
  map,
  CENTER_TOKYO,
  ZOOM_MAP,
  createPinGroup
};
