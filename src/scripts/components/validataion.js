const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'input_type_error',
  errorClass: 'error_visible',
  errorBlockClass: 'popup__error',
}
const showInputError = (formElement, inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement.classList.contains(settings.errorBlockClass)) {
    if (inputElement.validity.patternMismatch && inputElement.dataset.messageerror) {
      errorElement.textContent = inputElement.dataset.messageerror;
    }
    else {
      errorElement.textContent = inputElement.validationMessage;
    }
    errorElement.classList.add(settings.errorClass);
  }
  inputElement.classList.add(settings.inputErrorClass);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement.classList.contains(settings.errorBlockClass)) {
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }
  inputElement.classList.remove(settings.inputErrorClass);
}
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const button = formElement.querySelector(settings.submitButtonSelector);
  buttonStateToggle(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      buttonStateToggle(inputList, button);
    });
    isValid(formElement, inputElement);
  });
}
const enableValidation = (data) => {
  Object.keys(data).map(key => {settings[key] = data[key]});
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  })
}

const buttonStateToggle = (inputList, button, state) => {
  const isInvalid = typeof state !== 'undefined' ? !state : inputList.some((inputElement) => !inputElement.validity.valid)
  if (isInvalid) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}

const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const button = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement.classList.contains(settings.errorBlockClass)) {
      errorElement.classList.remove(settings.errorClass);
    }
    inputElement.classList.remove(settings.inputErrorClass);
  });
  buttonStateToggle(inputList, button, false);
}

export {
  enableValidation,
  clearValidation
}