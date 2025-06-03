// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const createCard = (card, removeCard, likeCard, addPopupImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', function () {
    removeCard(cardElement);
  });

  likeButton.addEventListener('click', function () {
    likeCard(cardElement);
  })

  cardImage.addEventListener('click', function () {
    addPopupImage(cardImage);
  })

  return cardElement;
};

// Функция удаления карточки
export const removeCard = (card) => {
  card.remove();
};

// Функция проставления лайка
export const likeCard = (card) => {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
};
