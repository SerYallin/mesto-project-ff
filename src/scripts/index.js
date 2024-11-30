import '../styles/pages/index.css'
import {
  getCardHtml,
  removeCard,
  updateLike,
} from './components/card';
import {
  openModal,
  closeModal,
  overlayClickModalEvent,
} from './components/modal';
import { enableValidation, clearValidation } from './components/validataion';
import * as api  from './api';

import { strings } from './components/strings';

// DOM узлы
const cardsholder = document.querySelector('.places');
const cardsList = cardsholder.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal  = document.querySelector('.popup_type_new-card');
const addCardForm = addCardModal.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const editAvatarForm = editAvatarModal.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const viewImageModal = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup');
const removeCardPopup = document.querySelector('.popup_type_remove-card');
const removeCardForm = removeCardPopup.querySelector('.popup__form');

const deleteConfirmData = {
  card: null,
  id: null
}

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

const removeConfirmation = (card, id) => {
  deleteConfirmData.card = card;
  deleteConfirmData.id = id;
  openModal(removeCardPopup);
}

const likeCardCallback = (button, id, user_id) => {
  const functionName = button.classList.contains('card__like-button_is-active') ? 'removeLike' : 'setLike';
  api[functionName](id).then(response => {
    updateLike(response, button, user_id);
  }).catch(error => {
    console.log(error);
  })
}

removeCardForm.addEventListener('submit', event => {
  event.preventDefault();
  api.removeCard(deleteConfirmData.id).then((data) => {
    removeCard(deleteConfirmData.card);
    closeModal(removeCardPopup);
  }).catch(error => {
    console.log(error);
  })
});

// Вывести карточки на страницу
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
  cards.forEach(item => {
    cardsList.append(getCardHtml(item, removeConfirmation, likeCardCallback, imageClickEvent, user._id));
  });
})

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
  const inputEvent = new Event('input');
  editProfileForm.name.value = profileName.textContent;
  editProfileForm.name.dispatchEvent(inputEvent);
  editProfileForm.description.value = profileDescription.textContent;
  editProfileForm.description.dispatchEvent(inputEvent);
  clearValidation(editProfileForm);
})

editProfileForm.addEventListener('submit', event => {
  const submitButton = editProfileForm.querySelector('.popup__button');
  event.preventDefault();
  submitButton.textContent = strings.saving;
  submitButton.disabled = true;
  api.setUserInfo(editProfileForm.name.value, editProfileForm.description.value).then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    submitButton.textContent = strings.save;
    submitButton.disabled = false;
    closeModal(editProfileModal);
  }).catch(error => {
    console.log(error);
  })
});

// Добавление карточки.
addCardButton.addEventListener('click', event => {
  addCardForm.reset();
  clearValidation(addCardForm);
  openModal(addCardModal);
})

addCardForm.addEventListener('submit', event => {
  const submitButton = addCardForm.querySelector('.popup__button');
  submitButton.textContent = strings.saving;
  submitButton.disabled = true;
  event.preventDefault();
  api.addCard(addCardForm['place-name'].value, addCardForm.link.value).then(data => {
    cardsList.prepend(getCardHtml(data, removeConfirmation, likeCardCallback, imageClickEvent, data.owner._id));
    submitButton.textContent = strings.save;
    submitButton.disabled = false;
    closeModal(addCardModal);
  }).catch(error => {
    console.log(error);
  })
})

editAvatarButton.addEventListener('click', event => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm);
  openModal(editAvatarModal);
});

editAvatarForm.addEventListener('submit', event => {
  const submitButton = editAvatarForm.querySelector('.popup__button');
  submitButton.textContent = strings.saving;
  submitButton.disabled = true;
  event.preventDefault();
  api.setAvatar(editAvatarForm.link.value).then(data => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    submitButton.textContent = strings.save;
    submitButton.disabled = false;
    closeModal(editAvatarModal);
  }).catch(error => {
    console.log(error);
  })
});

//Включение валидации.
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

