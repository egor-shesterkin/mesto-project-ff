import './pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

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
const handleFormNewCardSubmit = (event) => {
      event.preventDefault();
      const newCardName = formNewCard.elements["place-name"];
      const newCardUrl = formNewCard.elements["link"];
      const newCard =   {
        name: newCardName.value,
        link: newCardUrl.value
      };
      formNewCard.reset();
      closeModal();
      placesList.prepend(createCard(newCard, removeCard, likeCard, addPopupImage));
    };

// Функция редактирования профиля
const handleFormEditCardSubmit = (event) => {
    event.preventDefault();  
    nameInput.textContent = formEditCard.elements.name.value;
    jobInput.textContent = formEditCard.elements.description.value;
    closeModal();
}

// Функция по добавлению описания и картинки в модалке по нажатию изображения
const addPopupImage = (cardImage) => {
    openModal(popupTypeImage);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
};

// Обработчики событий
profileEditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
  formEditCard.elements.name.value = nameInput.textContent;
  formEditCard.elements.description.value = jobInput.textContent;
})

profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
})

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    // так мы проверим, что кликнули на кнопку или оверлей
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup_is-opened')) {
      // если это так, закрываем модалку, на которую добавили слушатель
      closeModal();
    }
  })
  popup.classList.add('popup_is-animated');
})

formNewCard.addEventListener('submit', handleFormNewCardSubmit);
formEditCard.addEventListener('submit', handleFormEditCardSubmit);

// Вывести карточки на страницу
initialCards.forEach((card) => { 
  placesList.append(createCard(card, removeCard, likeCard, addPopupImage));
});
