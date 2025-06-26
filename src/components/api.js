const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'dc218be0-f15c-47d7-b4ea-65baa6ad9dd0',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const getMyProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

// Функция создания карточки
export const addCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

// Функция обновления аватара профиля
export const updateAvatar = (imageUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${imageUrl}`
    })
  })
    .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

// Функция обновления данных профиля
export const updateMyProfile = (editForm) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${editForm.elements.name.value}`,
      about: `${editForm.elements.description.value}`
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};