import '../styles/index.css'
import initialCards from './cards';
import CardsList from './modules/cardsList';
import Popup from './modules/popup'

(() => {

  // Инициализировать список карточек.
  const card = new CardsList({
    template: document.querySelector('#card-template'),
    holder: '.places',
    list: '.places__list',
    onCardAdded: (item) => {
      const image = item.querySelector('.card__image');
      const title = item.querySelector('.card__title');
      const likeButton = item.querySelector('.card__like-button');

      // Добавить попап для открытия картинки.
      new Popup({
        holder: '.popup_type_image',
        button: image,
        popupOpen: (e, obj) => {
          const popupImage = obj.holder.querySelector('.popup__image');
          const popupCaption = obj.holder.querySelector('.popup__caption');
          popupImage.src = image.src;
          popupCaption.textContent = title.textContent;
        }
      });

      // Событие для кнопочки лайк.
      likeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('card__like-button_is-active');
      })
    }
  });

  // Добавить попап для редактирования профиля
  new Popup({
    holder: '.popup_type_edit',
    button: '.profile__edit-button',
    submitAction: (e, form) => {
      e.preventDefault();
      const holder = document.querySelector('.profile');
      const title = holder.querySelector('.profile__title');
      const description = holder.querySelector('.profile__description');
      title.textContent = form.name.value;
      description.textContent = form.description.value;
    },
  });

  // Добавить попап для добавления карточки
  new Popup({
    holder: '.popup_type_new-card',
    button: '.profile__add-button',
    submitAction: (e, form) => {
      e.preventDefault();
      card.addItem({
        link: form.link.value,
        name: form['place-name'].value,
      });
      form.reset();
    },
  });

  // Вывести карточки на страницу
  initialCards.forEach(item => {
    card.addItem(item);
  });
})();

