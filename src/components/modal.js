// Функция открытия модального окна
export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
export const closeModal = () => {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция скрытия модального окна по клавише Esc
const handleEscClose = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
}