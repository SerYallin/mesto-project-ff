import '../styles/pages/index.css'
import initialCards from './cards'
import { getCardHtml, likeCardCallback, removeCard } from './components/card';
import {
  openModal,
  closeModal,
  overlayClickModalEvent,
} from './components/modal';

// DOM узлы
const cardsholder = document.querySelector('.places');
const cardsList = cardsholder.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal  = document.querySelector('.popup_type_new-card');
const addCardForm = addCardModal.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const viewImageModal = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup');

// Отображение модульного окна изображения.
const imageClickEvent = (event) => {
  const image = event.target;
  if (image.classList.contains('card__image')) {
    openModal(viewImageModal);
    const popupImage = viewImageModal.querySelector('.popup__image');
    const popupCaption = viewImageModal.querySelector('.popup__caption');
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
  }
}

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsList.append(getCardHtml(item, removeCard, likeCardCallback, imageClickEvent));
});

// Глобальные события модального окна.
modals.forEach(modal => {
  const closeButton = modal.querySelector('.popup__close');

  // Закрытие по кнопки.
  if (closeButton) {
    closeButton.addEventListener('click', event => {
      closeModal(modal);
    })
  }
  // Закрытие по клику за пределами попапа.
  modal.addEventListener('click', overlayClickModalEvent)
})

// Редактирование профиля
editProfileButton.addEventListener('click', event => {
  openModal(editProfileModal);
  editProfileForm.name.value = profileName.textContent;
  editProfileForm.description.value = profileDescription.textContent;
})

editProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editProfileModal);
});

// Добавление карточки.
addCardButton.addEventListener('click', event => {
  addCardForm.reset();
  openModal(addCardModal);
})

addCardForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = {
    name: addCardForm['place-name'].value,
    link: addCardForm.link.value
  }
  cardsList.prepend(getCardHtml(data, removeCard, likeCardCallback, imageClickEvent));
  closeModal(addCardModal);
})

