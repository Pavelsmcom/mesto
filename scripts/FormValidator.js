'use strict';

// Form validation Class
export class FormValidator {
  constructor(validationSettings, form) {
    this._validationSetting = validationSettings;
    this._form = form;
  }

  //Inputs
  _findLinkErrorElement(inputElement) {
    return this._form.querySelector(`.${inputElement.name}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const inputLinkError = this._findLinkErrorElement(inputElement);

    inputElement.classList.add(this._validationSetting.inputErrorClass);
    inputLinkError.textContent = errorMessage;
    inputLinkError.classList.add(this._validationSetting.errorClass);
  }

  _hideInputError(inputElement) {
    const inputLinkError = this._findLinkErrorElement(inputElement);

    inputElement.classList.remove(this._validationSetting.inputErrorClass);
    inputLinkError.classList.remove(this._validationSetting.errorClass);
    inputLinkError.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Buttons
  _enableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._validationSetting.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _disableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._validationSetting.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._enableSubmitButton(buttonElement, this._validationSetting);
    } else {
      this._disableSubmitButton(buttonElement, this._validationSetting);
    }
  }

  //Enable Validation
  enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._validationSetting.inputSelector));
    const buttonElement = this._form.querySelector(this._validationSetting.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}
