const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// Шаблон для функции renderCard
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const words = {
  rooms: ['комнатa', 'комнаты', 'комнат'],
  guests: ['гостя', 'гостей', 'гостей'],
};

const Count = {
  ONE: 1,
  ELEVEN: 11,
  TWO: 2,
  FOUR: 4,
  TEN: 10,
  TWENTY: 20,
  ONE_HUNDRED: 100,
};

// Функция для подбора верной формулировки в ".popup__text--capacity"
const getWords = (count, word) => {
  const num = count % Count.ONE_HUNDRED;
  const mod = num % Count.TEN;

  if (num !== Count.ELEVEN && mod === Count.ONE) {
    return words[word][0];
  } else if (mod >= Count.TWO && mod <= Count.FOUR && (num < Count.TEN || num > Count.TWENTY)) {
    return words[word][1];
  } else {
    return words[word][2];
  }
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

const createPhotos = (template, photosSrc, offerTitle) => {
  const photosFragment = document.createDocumentFragment();
  photosSrc.forEach((photoSrc) => {
    const newPhoto = template.cloneNode(false);
    newPhoto.src = photoSrc;
    newPhoto.alt = `${newPhoto.alt} к объявлению ${offerTitle}`;
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

// Функция клонирует и заполняет шаблон cardTemplate
const renderCard = ({
  author,
  offer,
}) => {
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.popup__title');
  if (offer.title) {
    cardTitle.textContent = offer.title;
  } else {
    cardTitle.remove();
  }

  const cardAddress = card.querySelector('.popup__text--address');
  if (offer.address) {
    cardAddress.textContent = offer.address;
  } else {
    cardAddress.remove();
  }

  const cardPrice = card.querySelector('.popup__text--price');
  if (offer.price) {
    cardPrice.textContent = `${offer.price} \u20bd/ночь`;
  } else {
    cardPrice.textContent = 'Бесплатно';
  }

  const cardType = card.querySelector('.popup__type');
  if (TYPES_OF_HOUSING[offer.type]) {
    cardType.textContent = TYPES_OF_HOUSING[offer.type];
  } else {
    cardType.remove();
  }

  const cardCapacity = card.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    cardCapacity.textContent = `${offer.rooms} ${getWords(offer.rooms, 'rooms')} для ${offer.guests} ${getWords(offer.guests, 'guests')}`;
  } else {
    cardCapacity.remove();
  }

  const cardTime = card.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    cardTime.remove();
  }

  const cardDescription = card.querySelector('.popup__description');
  if (offer.description) {
    cardDescription.textContent = offer.description;
  } else {
    cardDescription.remove();
  }

  const cardFeatures = card.querySelector('.popup__features');
  if (offer.features && offer.features.length) {
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFeatures(offer.features));
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  if (offer.photos && offer.photos.length) {
    const photoTemplate = card.querySelector('.popup__photo').cloneNode(false);
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createPhotos(photoTemplate, offer.photos, offer.title));
  } else {
    cardPhotos.remove();
  }

  const cardAvatar = card.querySelector('.popup__avatar');
  if (author.avatar) {
    cardAvatar.src = author.avatar;
  } else {
    cardAvatar.remove();
  }

  return card;
};

export {
  renderCard
};
