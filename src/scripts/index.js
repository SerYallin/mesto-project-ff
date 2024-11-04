import '../styles/pages/index.css'
import initialCards from './cards'
import { getCardHtml, likeCardCallback, removeCard } from './components/card';
import { openModal, closeModal, isModalOpen, isModalAreaClick } from './components/modal';

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
const viewImagePopup = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup');

let activeModal = null;

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsList.append(getCardHtml(item, removeCard, likeCardCallback));
});

// Закрытие попапа.
const closeModalCallback = modal => {
  const form = modal.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
  document.removeEventListener('keyup', escapeModalEvent);
}

const openModalCallback = modal => {
  activeModal = modal;
  document.addEventListener('keyup', escapeModalEvent)
}

const escapeModalEvent = event => {
  if (activeModal && event.key === 'Escape') {
    closeModal(activeModal, closeModalCallback);
  }
}


// Глобальные события модального окна.
modals.forEach(modal => {
  const closeButton = modal.querySelector('.popup__close');

  // Закрытие по кнопки.
  if (closeButton) {
    closeButton.addEventListener('click', event => {
      closeModal(modal, closeModalCallback);
    })
  }
  // Закрытие по клику за пределами попапа.
  modal.addEventListener('click', event => {
    if (isModalOpen(modal) && ! isModalAreaClick(modal, event)) {
      closeModal(modal, closeModalCallback);
    }
  })
})

// Редактирование профиля
editProfileButton.addEventListener('click', event => {
  openModal(editProfileModal, (modal) => {
    openModalCallback(modal);
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
  });
})

editProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(activeModal, closeModalCallback);
});

// Добавление карточки.
addCardButton.addEventListener('click', event => {
  openModal(addCardModal, openModalCallback);
})

addCardForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = {
    name: addCardForm['place-name'].value,
    link: addCardForm.link.value
  }
  cardsList.prepend(getCardHtml(data, removeCard, likeCardCallback));
  closeModal(activeModal, closeModalCallback);
})

// Отображение модульного окна изображения.
cardsList.addEventListener('click', event => {
  const image = event.target;
  if (image.classList.contains('card__image')) {
    openModal(viewImagePopup, modal => {
      const popupImage = modal.querySelector('.popup__image');
      const popupCaption = modal.querySelector('.popup__caption');
      popupImage.src = image.src;
      popupImage.alt = image.alt;
      popupCaption.textContent = image.alt;
      openModalCallback(modal, openModalCallback);
    });
  }
})
