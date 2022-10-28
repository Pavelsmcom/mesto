'use strict';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Form validation---------------------------------------------------------------------
//Function find linkErrorElement
function findLinkErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.name}-error`);
}

//Function show input error
function showInputError(formElement, inputElement, errorMessage, validationObj) {
  const inputLinkError = findLinkErrorElement(formElement, inputElement);

  inputElement.classList.add(validationObj.inputErrorClass);
  inputLinkError.textContent = errorMessage;
  inputLinkError.classList.add(validationObj.errorClass);
}

//Function hide input error
function hideInputError(formElement, inputElement, validationObj) {
  const inputLinkError = findLinkErrorElement(formElement, inputElement);

  inputElement.classList.remove(validationObj.inputErrorClass);
  inputLinkError.classList.remove(validationObj.errorClass);
  inputLinkError.textContent = '';
}

//Function verify input valid
function checkInputValidity(formElement, inputElement, validationObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationObj);
  } else {
    hideInputError(formElement, inputElement, validationObj);
  }
}

//Function verify button valid
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Function change button state
function toggleButtonState(inputList, buttonElement, validationObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//Function add eventlisteners for all input
function setEventListeners(formElement, validationObj) {
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);

  fillPopupEditInput();

  toggleButtonState(inputList, buttonElement, validationObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationObj);
      toggleButtonState(inputList, buttonElement, validationObj);
    });
  });
}
//Function add eventlisteners for all form
function enableValidation(validationObj) {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationObj);
  });
}
