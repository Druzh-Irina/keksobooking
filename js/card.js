const TYPES_OF_HOUSING = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const getRoomsEnding = (roomCount) => {
  switch (roomCount) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

const getGuestsEnding = (guestCount) => {
  if (guestCount === 0) {
    return 'не для гостей';
  }
  if (guestCount > 1) {
    return `для ${guestCount} гостей`;
  }
  return `для ${guestCount} гостя`;
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photoSrc;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

// Шаблон для функции renderCard
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Функция клонирует и заполняет шаблон cardTemplate
const renderCard = ({
  author,
  offer,
}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar || '';
  card.querySelector('.popup__title').textContent = offer.title || '';
  card.querySelector('.popup__text--address').textContent = offer.address || '';
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` || '';
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type] || '';
  card.querySelector('.popup__text--capacity').textContent = (!offer.rooms || !Number.isInteger(offer.guests)) ? '' : `${offer.rooms} ${getRoomsEnding(offer.rooms)} ${getGuestsEnding(offer.guests)}`;
  card.querySelector('.popup__text--time').textContent = (!offer.checkin || !offer.checkout) ? '' : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').textContent = offer.description || '';

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (offer.features) {
    const newFeatureElements = createFeatures(offer.features);
    cardFeatures.appendChild(newFeatureElements);
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  if (offer.photos) {
    const newPhotoElements = createPhotos(offer.photos);
    cardPhotos.appendChild(newPhotoElements);
  } else {
    cardPhotos.remove();
  }

  return card;
};

export {
  renderCard
};
