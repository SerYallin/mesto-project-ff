// Заглушка, если список по каким-то причинам не загрузился.
if (typeof initialCards === 'undefined') {
  const initialCards = [];
}

// Темплейт карточки
const templateSource = document.querySelector('#card-template');

// DOM узлы
const cardsholder = document.querySelector('.places');
const cardsList = cardsholder.querySelector('.places__list');

// Функция создания карточки
const getCardHtml = (data, removeCardCallback) => {
  if (!templateSource || typeof data !== 'object') {
    return;
  }

  data = Object.assign({ name: '', link: '' }, data);

  const template = templateSource.content.cloneNode(true);
  const image = template.querySelector('.card__image');
  const title = template.querySelector('.card__title');
  const deletButton = template.querySelector('.card__delete-button');

  // Заполнение карточки.
  if (image) {
    image.alt = data.name;
    image.src = data.link;
  }

  if (title) {
    title.textContent = data.name;
  }

  // Колбэк на удаление по клику.
  if (deletButton) {
    deletButton.addEventListener('click', e => {
      removeCardCallback(e.target.closest('.card'));
    });
  }

  return template;
};

// Функция удаления карточки
const removeCard = node => {
  if (!node || !(node instanceof Element)) {
    return;
  }
  node.remove();
};

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsList.append(getCardHtml(item, removeCard));
});
