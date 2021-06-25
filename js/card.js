import { similarAds } from './data.js';

const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content;
const mapCard = cardTemplate.querySelector('.popup');

const renderCard = (element) => {
  const card = mapCard.cloneNode(true);
  card.querySelector('.popup__avatar').src = element.author.avatar;
  card.querySelector('.popup__title').textContent = element.offer.title;
  card.querySelector('.popup__text--address').textContent = element.offer.address;
  card.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[element.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const featureCard = card.querySelector('.popup__features');
  if (element.offer.features.length !== 0) {
    featureCard.innerHTML = '';
    element.offer.features.forEach((feature) => {
      const  subitem = document.createElement('li');
      subitem.classList.add('popup__feature');
      subitem.classList.add(`popup__feature--${feature}`);
      featureCard.appendChild(subitem);
    });
  } else {
    featureCard.classList.add('.visually-hidden');
  }

  if (element.offer.description.length !== 0) {
    card.querySelector('.popup__description').textContent = element.offer.description;
  } else {
    card.querySelector('.popup__description').classList.add('.visually-hidden');
  }

  const photoCard = card.querySelector('.popup__photos');
  if (element.offer.photos.length !== 0) {
    photoCard.innerHTML = '';
    element.offer.photos.forEach((photo) => {
      const image = document.createElement('img');
      image.classList.add('popup__photo');
      image.src = photo;
      image.width = 45;
      image.height = 40;
      image.alt = 'Фотография жилья';
      photoCard.appendChild(image);
    });
  } else {
    photoCard.classList.add('.visually-hidden');
  }

  return card;
};

// Отрисовка первого[0] сгенерированного DOM-элемента в блок #map-canvas
const map = document.querySelector('#map-canvas');
map.appendChild(renderCard(similarAds[0]));

export { renderCard };
