import {disablePage, publishFormSubmit, onButtonReset} from './form.js';
import {getMap, mainMarkerCoordinates} from './map.js';
import {getData} from './server.js';
import {activateMapFilter, checkAllFilters, changeFilters} from './filter.js';
import {debounce} from './util.js';
import './pictures.js';

// Задержка отображения маркеров на карте
const TIMEOUT_DELAY = 500;

disablePage(); // по умолчанию страница выключена до загрузки карты
getMap();
mainMarkerCoordinates();

getData((ads) => {
  checkAllFilters(ads),
  changeFilters(debounce(() => checkAllFilters(ads), TIMEOUT_DELAY));
  activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
  publishFormSubmit(() => checkAllFilters(ads));
  onButtonReset(() => checkAllFilters(ads));
});
