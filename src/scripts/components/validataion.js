const showInputError = (formElement, inputElement, configs) => {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement.classList.contains(configs.errorBlockClass)) {
    if (inputElement.validity.patternMismatch && inputElement.dataset.messageerror) {
      errorElement.textContent = inputElement.dataset.messageerror;
    }
    else {
      errorElement.textContent = inputElement.validationMessage;
    }
    errorElement.classList.add(configs.errorClass);
  }
  console.log(errorElement.textContent);
  inputElement.classList.add(configs.inputErrorClass);
}

const hideInputError = (formElement, inputElement, configs) => {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement.classList.contains(configs.errorBlockClass)) {
    errorElement.textContent = '';
    errorElement.classList.remove(configs.errorClass);
  }
  inputElement.classList.remove(configs.inputErrorClass);
}
const isValid = (formElement, inputElement, configs) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, configs);
  } else {
    hideInputError(formElement, inputElement, configs);
  }
}
const setEventListeners = (formElement, configs) => {
  const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
  const button = formElement.querySelector(configs.submitButtonSelector);
  buttonStateToggle(inputList, button, configs);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, configs);
      buttonStateToggle(inputList, button, configs);
    });
    isValid(formElement, inputElement, configs);
  });
}
const enableValidation = (configs) => {
  const formList = Array.from(document.querySelectorAll(configs.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configs);
  })
}

const buttonStateToggle = (inputList, button, configs, state) => {
  const isInvalid = typeof state !== 'undefined' ? !state : inputList.some((inputElement) => !inputElement.validity.valid)
  if (isInvalid) {
    button.classList.add(configs.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(configs.inactiveButtonClass);
    button.disabled = false;
  }
}

const clearValidation = (formElement, configs) => {
  const inputList = Array.from(formElement.querySelectorAll(configs.inputSelector));
  const button = formElement.querySelector(configs.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configs);
  });
  buttonStateToggle(inputList, button,  configs, false);
}

export {
  enableValidation,
  clearValidation
}