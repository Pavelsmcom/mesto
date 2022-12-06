'use strict';

// Form validation Class
export class FormValidator {
  constructor(validationSettings, form) {
    this._validationSetting = validationSettings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationSetting.inputSelector));
    this._buttonElement = this._form.querySelector(this._validationSetting.submitButtonSelector);
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
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._validationSetting.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._validationSetting.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  //Reset Validation
  resetValidation() {
    this._disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = '';
    });
  }

  //Enable Validation
  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }
}
