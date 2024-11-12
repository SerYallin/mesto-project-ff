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
  if (deleteButton && removeCardCallback) {
    deleteButton.addEventListener('click', event => {
      removeCardCallback(event.target);
    });
  }

  // Колбэк на лайк
  if (likeButton && likeCardCallback) {
    likeButton.addEventListener('click', event => {
      likeCardCallback(event.target);
    });
  }

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
export const likeCardCallback = (button) => {
  button.classList.toggle(template.classes.likeActive);
}