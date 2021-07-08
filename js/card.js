const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content;
const mapCard = cardTemplate.querySelector('.popup');


const renderFeatures = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add(`popup__feature--${item}`);
      fragment.appendChild(element);
    });

    container.appendChild(fragment);

  } else {
    container.classList.add('.visually-hidden');
  }
};

const renderPhotos = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.map((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    });

    container.appendChild(fragment);

  } else {
    container.classList.add('.visually-hidden');
  }
};

const renderCard = (element) => {
  const card = mapCard.cloneNode(true);
  card.querySelector('.popup__avatar').src = element.author.avatar;
  card.querySelector('.popup__title').textContent = element.offer.title;
  card.querySelector('.popup__text--address').textContent = element.offer.address;
  card.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[element.offer.type];

  card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнат для ${element.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const featureCard = card.querySelector('.popup__features');
  renderFeatures(element.offer.features, featureCard);

  const descriptionCard = card.querySelector('.popup__description');
  descriptionCard.textContent = element.offer.description;
  if (element.offer.description.length === 0) {
    descriptionCard.classList.add('.visually-hidden');
  }

  const photoCard = card.querySelector('.popup__photos');
  renderPhotos(element.offer.photos, photoCard);

  return card;
};

export {
  renderCard
};
