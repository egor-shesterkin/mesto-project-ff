// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const createCard = (card, removeCard, likeCard, addPopupImage) => {

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

  if (likesList.includes('a8c7400683337fd7ee5e54d5')) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id !== 'a8c7400683337fd7ee5e54d5') {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', function () {
    removeCard(cardElement);
    deleteCard(card._id);
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
  likeButton.classList.toggle('card__like-button_is-active');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    const result = addLike(card._id);
    result.then((response) => {
      likeCounter.textContent = response.likes.length;
    });
  } else {
    const result = removeLike(card._id);
    result.then((response) => {
      likeCounter.textContent = response.likes.length;
    })
  }
};

// Функция удаления карточки
const deleteCard = (cardId) => {
  fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'dc218be0-f15c-47d7-b4ea-65baa6ad9dd0'
    }
  });
};

// Функция проставления лайка по карточке
const addLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'dc218be0-f15c-47d7-b4ea-65baa6ad9dd0'
    }
  })
    .then((response) => response.json())
}

// Функция удаления лайка по карточке
const removeLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'dc218be0-f15c-47d7-b4ea-65baa6ad9dd0'
    }
  })
  .then((response) => response.json())
}
