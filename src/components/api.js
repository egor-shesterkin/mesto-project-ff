import { checkResponse } from './utils/utils.js';

//Общий конфиг для запросов к серверу
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'dc218be0-f15c-47d7-b4ea-65baa6ad9dd0',
    'Content-Type': 'application/json'
  }
};

//Универсальная функция запроса с проверкой ответа от сервера
const request = (endpoint, options) => {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then(checkResponse);
};

//Функция получения данных по карточкам
export const getInitialCards = () => {
  return request('cards', {
    headers: config.headers
  });
};

//Функция получения данных по моему профилю
export const getMyProfile = () => {
    return request('users/me', {
      headers: config.headers
  });
};

// Функция создания карточки
export const addCard = (card) => {
    return request('cards', {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
  });
};

// Функция обновления аватара профиля
export const updateAvatar = (imageUrl) => {
  return request('users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${imageUrl}`
    })
  })
};

// Функция обновления данных профиля
export const updateMyProfile = (editForm) => {
  return request('users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${editForm.elements.name.value}`,
      about: `${editForm.elements.description.value}`
    })   
  })
};

// Функция удаления карточки
export const deleteCard = (cardId) => {
  return request(`cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers 
  })
};

// Функция проставления лайка по карточке
export const addLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
};

// Функция удаления лайка по карточке
export const removeLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};
