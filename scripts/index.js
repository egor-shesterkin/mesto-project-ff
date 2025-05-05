// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(card, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', function () {
    removeCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => { 
  placesList.append(addCard(card, removeCard));
});