// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
}

// Функция закрытия модального окна
export function closeModal() {
  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
}