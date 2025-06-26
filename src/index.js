import './pages/index.css'; // импорт главного файла стилей 
// import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { getInitialCards, getMyProfile, addCard, updateAvatar, updateMyProfile } from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const profileImageButton = document.querySelector('.image__edit-button');
const popups = document.querySelectorAll('.popup');
const formNewCard = document.forms["new-place"];
const formNewImage = document.forms["new-image"];
const formEditCard = document.forms["edit-profile"];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewImage = document.querySelector('.popup_type_new-image');
const popupTypeImage = document.querySelector('.popup_type_image');

// Функция добавления новой карточки
const handleFormNewCardSubmit = (event) => {
  event.preventDefault();
  renderLoading(true, formNewCard);
  const newCardName = formNewCard.elements["place-name"];
  const newCardUrl = formNewCard.elements["link"];
  const newCard = {
    name: newCardName.value,
    link: newCardUrl.value
  };

  addCard(newCard)
    .then((res) => {
      placesList.prepend(createCard(res, removeCard, likeCard, addPopupImage));
      formNewCard.reset();
      renderLoading(false, formNewCard);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
};

//Функция добавления нового аватара
const handleFormNewImagedSubmit = (event) => {
  event.preventDefault();
  renderLoading(true, formNewImage);
  const newImageUrl = formNewImage.elements["link"].value;
  updateAvatar(newImageUrl)
  .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        renderLoading(false, formNewImage);
        formNewImage.reset();
        closeModal();
      })
  .catch((err) => {
    console.log(err);
  })
};

// Функция редактирования профиля
const handleFormEditCardSubmit = (event) => {
  event.preventDefault();
  renderLoading(true, formEditCard);
  nameInput.textContent = formEditCard.elements.name.value;
  jobInput.textContent = formEditCard.elements.description.value;
  updateMyProfile(formEditCard)
  .then(() => {
    renderLoading(false, formEditCard);
    closeModal();
  })
  .catch((err) => {
    console.log(err);
  })
};

// Функция по добавлению описания и картинки в модалке по нажатию изображения
const addPopupImage = (cardImage) => {
  openModal(popupTypeImage);
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
};

// Обработчики событий для кнопок
profileEditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);

  formEditCard.elements.name.value = nameInput.textContent;
  formEditCard.elements.description.value = jobInput.textContent;
  
  clearValidation(formEditCard, validationConfig);
})

profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);

  clearValidation(formNewCard, validationConfig);
})

profileImageButton.addEventListener('click', function () {
  openModal(popupTypeNewImage);

  clearValidation(formNewImage, validationConfig);
})

// обработчики событий для закрытия модальных окон
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

// Обработчики событий для форм
formNewCard.addEventListener('submit', handleFormNewCardSubmit);
formEditCard.addEventListener('submit', handleFormEditCardSubmit);
formNewImage.addEventListener('submit', handleFormNewImagedSubmit);

// Вывести карточки из статичного списка на страницу
// initialCards.forEach((card) => { 
//   placesList.append(createCard(card, removeCard, likeCard, addPopupImage));
// });

//Получаем карточки, профиль с сервера и отрисовываем полученные данные - инициализация приложения
(() => {
  const promises = [];
  promises.push(getInitialCards(), getMyProfile());

  Promise.all(promises)
  .then(responses => {
      responses[0].forEach((card) => {
      placesList.append(createCard(card, removeCard, likeCard, addPopupImage));
    });
    nameInput.textContent = responses[1].name;
    jobInput.textContent = responses[1].about;
    profileImage.style.backgroundImage = `url(${responses[1].avatar})`;
  })
  .catch((err) => {
    console.log(err);
  })
})();

// Отрисовка индикации обмена данными с сервером
const renderLoading = (isLoading, form) => {
  const submitButton = form.querySelector('.popup__button');
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig); 