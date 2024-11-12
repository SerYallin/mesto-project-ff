const modalOpenClass = 'popup_is-opened';
const modalClass = 'popup';

const openModal = (modal) => {
  modal.classList.add(modalOpenClass);
  document.addEventListener('keyup', escapeModalEvent)
}

const isModalOpen = modal => {
  return modal.classList.contains(modalOpenClass);
}

const isModalOverlayClick = (event) => {
  return event.target.classList.contains(modalClass);
}

const closeModal = (modal) => {
  modal.classList.remove(modalOpenClass);
  document.removeEventListener('keyup', escapeModalEvent);
}

const escapeModalEvent = event => {
  const modal = document.querySelector('.' + modalOpenClass);
  if (modal && event.key === 'Escape') {
    closeModal(modal);
  }
}

const overlayClickModalEvent = event => {
  const modal = event.target;
  if  (isModalOverlayClick(event) && isModalOpen(modal)) {
    closeModal(modal);
  }
}

export {
  openModal,
  isModalOpen,
  overlayClickModalEvent,
  closeModal
}