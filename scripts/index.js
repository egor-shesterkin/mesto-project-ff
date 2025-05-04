// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closeButton = popupNewCard.querySelector('.popup__close');
const saveButton = popupNewCard.querySelector('.popup__button');

// @todo: Функция создания карточки

function addCard(cardName, cardImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  placesList.append(cardElement);

  deleteButton.addEventListener('click', function () {
    removeCard(deleteButton);
  });
};

// @todo: Функция удаления карточки
function removeCard(deleteButton) {
  const listItem = deleteButton.closest('.card');
  listItem.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {  
  addCard(item.name, item.link);
});

addButton.addEventListener('click', function () {
  popupNewCard.classList.add('popup_is-opened');
});

closeButton.addEventListener('click', function () {
  popupNewCard.classList.remove('popup_is-opened');
});

saveButton.addEventListener('click', function () {
  const inputCardName = popupNewCard.querySelector('.popup__input_type_card-name');
  const inputCardImage = popupNewCard.querySelector('.popup__input_type_url');
  addCard(inputCardName.value, inputCardImage.value);
});