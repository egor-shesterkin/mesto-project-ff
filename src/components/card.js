import { deleteCard, addLike, removeLike } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const createCard = (card, userId, removeCard, likeCard, addPopupImage) => {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  if (!card.likes.length) {
    likeCounter.textContent = 0;
  } else {
    likeCounter.textContent = card.likes.length;
  }

  const likesList = [];
  card.likes.forEach((like) => {
    likesList.push(like._id);
  })

  if (likesList.includes(userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id !== userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', function () {
    deleteCard(card._id)
      .then(() => {
        removeCard(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
  });

  likeButton.addEventListener('click', function () {
    likeCard(cardElement, card);
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
export const likeCard = (cardElement, card) => {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(card._id)
    .then((response) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = response.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    addLike(card._id)
    .then((response) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = response.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }
};
