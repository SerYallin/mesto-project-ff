import * as api from '../api';

// Темплейт карточки
const template = {
  source: document.querySelector('#card-template').content,
  selectors: {
    image: '.card__image',
    title: '.card__title',
    deleteButton: '.card__delete-button',
    deletePopup: '.card__delete-button',
    likeButton: '.card__like-button',
    likeNumber: '.card__like-num',

  },
  classes: {
    card: 'card',
    likeActive: 'card__like-button_is-active',
  }
}

// Функция создания карточки
export const getCardHtml = (data, removeCardCallback, likeCardCallback, imageClickEvent) => {
  if (!template.source || typeof data !== 'object') {
    return;
  }

  data = Object.assign({ name: '', link: '' }, data);

  const card = template.source.cloneNode(true);
  const image = card.querySelector(template.selectors.image);
  const title = card.querySelector(template.selectors.title);
  const deleteButton = card.querySelector(template.selectors.deleteButton);
  const likeButton = card.querySelector(template.selectors.likeButton);
  const likeNumber = card.querySelector(template.selectors.likeNumber);

  likeNumber.textContent = data.likes.length || 0;
  card.querySelector('.' + template.classes.card).dataset.id = data._id;

  // Заполнение карточки.
  if (image) {
    image.alt = data.name;
    image.src = data.link;

    //Колбэк на картинке
    if (imageClickEvent) {
      console.log(imageClickEvent);
      image.addEventListener('click', imageClickEvent);
    }
  }

  if (title) {
    title.textContent = data.name;
  }

  // Колбэк на удаление по клику.
  if (data.user_id !== data.owner._id) {
    deleteButton.remove();
  }
  else if (removeCardCallback) {
    deleteButton.addEventListener('click', event => {
      removeCardCallback(event.target, data._id);
    });
  }

  // Колбэк на лайк
  if (likeButton && likeCardCallback) {
    likeButton.addEventListener('click', event => {
      likeCardCallback(event.target, data._id);
    });
  }

  //добавление класса на лайк
  if (data.likes.length && data.likes.some(item => item._id === data.user_id)) {
    likeButton.classList.add(template.classes.likeActive);
  }

  return card;
}

// Функция удаления карточки
export const removeCard = (card, id) => {
  api.removeCard(id).then(
    (data) => {
      if (!card.classList.contains(template.classes.card)) {
        card = card.closest('.' + template.classes.card);
      }
      if (card) {
        card.remove();
      }
    }
  ).catch(
    error => {
      console.log(error);
    }
  )
}

const updateLike = (response, button) => {
  const card = button.closest('.' + template.classes.card);
  const number = card.querySelector(template.selectors.likeNumber);
  button.classList.toggle(template.classes.likeActive);
  number.textContent = response.likes.length;
}

// Функция нажатия кнопки лайк.
export const likeCardCallback = (button, id) => {
  const functionName = button.classList.contains(template.classes.likeActive) ? 'removeLike' : 'setLike';
  api[functionName](id).then(response => {
    updateLike(response, button);
  }).catch(error => {
    console.log(error);
  })
}