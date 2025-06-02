import './pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './components/cards.js';
import { addCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
export const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const formNewCard = document.forms["new-place"];
const formEditCard = document.forms["edit-profile"];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');

// Функция добавления новой карточки
function handleFormNewCardSubmit(evt) {
      evt.preventDefault();
      const newCardName = formNewCard.elements["place-name"];
      const newCardUrl = formNewCard.elements["link"];
      const newCard =   {
        name: newCardName.value,
        link: newCardUrl.value
      };
      formNewCard.reset();
      closeModal();
      placesList.prepend(addCard(newCard, removeCard, likeCard));
    };

// Функция редактирования профиля
function handleFormEditCardSubmit(evt) {
    evt.preventDefault();  
    nameInput.textContent = formEditCard.elements.name.value;
    jobInput.textContent = formEditCard.elements.description.value;
    closeModal();
}

// Функция скрытия модального окна по клавише Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

// Обработчики событий
profileEditButton.addEventListener('click', function (evt) {
  openModal(popupTypeEdit);
  formEditCard.elements.name.value = nameInput.textContent;
  formEditCard.elements.description.value = jobInput.textContent;
})

profileAddButton.addEventListener('click', function (evt) {
  openModal(popupTypeNewCard);
})

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    // так мы проверим, что кликнули на кнопку или оверлей
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
      // если это так, закрываем модалку, на которую добавили слушатель
      closeModal();
    }
  })
})

formNewCard.addEventListener('submit', handleFormNewCardSubmit);
formEditCard.addEventListener('submit', handleFormEditCardSubmit);
document.addEventListener('keydown', keyHandler);

// Вывести карточки на страницу

initialCards.forEach((card) => { 
  placesList.append(addCard(card, removeCard, likeCard));
});
