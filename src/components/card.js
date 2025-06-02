// Импорт нужных переменных и функций
import { openModal } from "./modal.js";
import { cardTemplate, popupImage, popupCaption, popupTypeImage } from '../index.js';

// Функция создания карточки
export function addCard(card, removeCard, likeCard) {
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
    openModal(popupTypeImage, cardImage);
  })

  return cardElement;
};

// Функция удаления карточки
export function removeCard(card) {
  card.remove();
};

// Функция проставления лайка
export function likeCard(card) {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
};

// Функция по добавлению описания и картинки в модалке по нажатию изображения
function addPopupImage(cardImage) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
}