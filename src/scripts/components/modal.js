const modalOpenClass = 'popup_is-opened';
const modalContentSelector = '.popup__content';

const openModal = (modal, callback) => {
  modal.classList.add(modalOpenClass);

  if (typeof callback === 'function') {
    callback(modal);
  }
}

const isModalOpen = modal => {
  return modal.classList.contains(modalOpenClass);
}

const isModalAreaClick = (modal, event) => {
  if (!modal || !event instanceof PointerEvent) {
    return false;
  }
  const modalRect = modal.querySelector(modalContentSelector).getBoundingClientRect();

  return event.clientX >= modalRect.left &&
    modalRect.right >= event.clientX &&
    event.clientY >= modalRect.top &&
    modalRect.bottom >= event.clientY;
}

const closeModal = (modal, callback) => {
  modal.classList.remove(modalOpenClass);
  if (typeof callback === 'function') {
    callback(modal);
  }
}

export {
  openModal,
  isModalOpen,
  isModalAreaClick,
  closeModal
}