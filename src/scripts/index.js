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

import { textStrings } from './components/textStrings';

// DOM узлы
const cardsholder = document.querySelector('.places');
const cardsList = cardsholder.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal  = document.querySelector('.popup_type_new-card');
const addCardForm = addCardModal.querySelector('.popup__form');
const submitCardButton = addCardForm.querySelector('.popup__button');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const submitProfileButton = editProfileForm.querySelector('.popup__button');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const editAvatarForm = editAvatarModal.querySelector('.popup__form');
const submitAvatarButton = editAvatarForm.querySelector('.popup__button');
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorBlockClass: 'popup__error'
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

const submitButtonStatus = (button, isLoading) => {
  if (isLoading) {
    button.textContent = textStrings.saving;
    button.disabled = true;
  } else {
    button.textContent = textStrings.save;
    button.disabled = false;
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
  })
}).catch(error => {
  console.log(error);
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
  clearValidation(editProfileForm, validationConfig);
})

editProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  submitButtonStatus(submitProfileButton, true);
  api.setUserInfo(editProfileForm.name.value, editProfileForm.description.value).then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(editProfileModal);
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    submitButtonStatus(submitProfileButton, false);
  })
});

// Добавление карточки.
addCardButton.addEventListener('click', event => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
})

addCardForm.addEventListener('submit', event => {
  event.preventDefault();
  submitButtonStatus(submitCardButton, true);
  api.addCard(addCardForm['place-name'].value, addCardForm.link.value).then(data => {
    cardsList.prepend(getCardHtml(data, removeConfirmation, likeCardCallback, imageClickEvent, data.owner._id));
    closeModal(addCardModal);
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    submitButtonStatus(submitCardButton, false);
  })
})

editAvatarButton.addEventListener('click', event => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarModal);
});

editAvatarForm.addEventListener('submit', event => {
  event.preventDefault();
  submitButtonStatus(submitAvatarButton, true);
  api.setAvatar(editAvatarForm.link.value).then(data => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    closeModal(editAvatarModal);
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    submitButtonStatus(submitAvatarButton, false);
  })
});

//Включение валидации.
enableValidation(validationConfig);

