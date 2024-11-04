// Темплейт карточки
const template = {
  source: document.querySelector('#card-template').content,
  selectors: {
    image: '.card__image',
    title: '.card__title',
    deleteButton: '.card__delete-button',
    likeButton: '.card__like-button',

  },
  classes: {
    card: 'card',
    likeActive: 'card__like-button_is-active',
  }
}

// Функция создания карточки
export const getCardHtml = (data, removeCardCallback, likeCardCallback) => {
  if (!template.source || typeof data !== 'object') {
    return;
  }

  data = Object.assign({ name: '', link: '' }, data);

  const card = template.source.cloneNode(true);
  const image = card.querySelector(template.selectors.image);
  const title = card.querySelector(template.selectors.title);
  const deleteButton = card.querySelector(template.selectors.deleteButton);
  const likeButton = card.querySelector(template.selectors.likeButton);

  // Заполнение карточки.
  if (image) {
    image.alt = data.name;
    image.src = data.link;
  }

  if (title) {
    title.textContent = data.name;
  }

  // Колбэк на удаление по клику.
  if (deleteButton && removeCardCallback) {
    deleteButton.addEventListener('click', e => {
      removeCardCallback(e.target);
    });
  }

  // Колбэк на лайк
  if (likeButton && likeCardCallback) {
    likeButton.addEventListener('click', e => {
      likeCardCallback(e.target);
    });
  }

  return card;
}

// Функция удаления карточки
export const removeCard = (card) => {
  if (!card) {
    return;
  }
  if (!card.classList.contains(template.classes.card)) {
    card = card.closest('.' + template.classes.card);
  }
  if (card) {
    card.remove();
  }
}

// Функция нажатия кнопки лайк.
export const likeCardCallback = (button) => {
  if (!button) {
    return;
  }
  button.classList.toggle(template.classes.likeActive);
}