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
export const getCardHtml = (data, removeCardCallback, likeCardCallback, imageClickEvent, user_id) => {
  if (!template.source || typeof data !== 'object') {
    return;
  }

  data = Object.assign({ name: '', link: '' }, data);

  const card = template.source.cloneNode(true);
  const image = card.querySelector(template.selectors.image);
  const title = card.querySelector(template.selectors.title);
  const deleteButton = card.querySelector(template.selectors.deleteButton);
  const likeButton = card.querySelector(template.selectors.likeButton);

  card.querySelector('.' + template.classes.card).dataset.id = data._id;

  // Заполнение карточки.
  if (image) {
    image.alt = data.name;
    image.src = data.link;

    //Колбэк на картинке
    if (imageClickEvent) {
      image.addEventListener('click', imageClickEvent);
    }
  }

  if (title) {
    title.textContent = data.name;
  }

  // Колбэк на удаление по клику.
  if (user_id !== data.owner._id) {
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
      likeCardCallback(event.target, data._id, user_id);
    });
  }

  //обновить лайк
  updateLike(data, likeButton, user_id);

  return card;
}

// Функция удаления карточки
export const removeCard = (card) => {
  if (!card.classList.contains(template.classes.card)) {
    card = card.closest('.' + template.classes.card);
  }
  if (card) {
    card.remove();
  }
}

// Функция нажатия кнопки лайк.
export const updateLike = (response, button, user_id) => {
  const card = button.closest('.' + template.classes.card);
  const number = card.querySelector(template.selectors.likeNumber);
  if (response.likes.some(item => item._id === user_id)) {
    button.classList.add(template.classes.likeActive);
  }
  else {
    button.classList.remove(template.classes.likeActive);
  }
  number.textContent = response.likes.length;
}