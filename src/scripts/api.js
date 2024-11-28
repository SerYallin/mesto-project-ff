const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  apiCards: '/cards',
  apiUser: '/users/me',
  apiAvatar: '/users/me/avatar',
  headers: {
    authorization: '9a968fd7-1674-4659-aab2-f08b905c4304',
    'Content-Type': 'application/json'
  }
}

const getJson = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + config.apiCards, { headers: config.headers })
  .then(getJson)
}

export const addCard = (name, link) => {
  return fetch(config.baseUrl + config.apiCards, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getJson)
}

export const removeCard = (cardId) => {
  return fetch(config.baseUrl + config.apiCards + '/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getJson)
}

export const getUserInfo = () => {
  return fetch(config.baseUrl + config.apiUser, { headers: config.headers })
  .then(getJson)
}

export const setUserInfo = (name, about) => {
  return fetch(config.baseUrl + config.apiUser, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(getJson)
}

export const setLike = (cardId) => {
  return fetch(config.baseUrl + config.apiCards + '/' + cardId + '/likes', {
    method: 'PUT',
    headers: config.headers
  })
  .then(getJson)
}

export const removeLike = (cardId) => {
  return fetch(config.baseUrl + config.apiCards + '/' + cardId + '/likes', {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getJson)
}

export const setAvatar = (avatar) => {
  return fetch(config.baseUrl + config.apiAvatar, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(getJson)
}