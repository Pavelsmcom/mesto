'use strict';

import { openPopup, closePopupByEscape } from './index.js';
export const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImage = popupPicture.querySelector('.popup__image');
const popupPictureDescription = popupPicture.querySelector('.popup__image-description');

// Card Class
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = templateSelector;
  }

  _getTemplate() {
    return this._cardElement.cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.cards__heart-btn').addEventListener('click', () => {
      this._handleHeartClick();
    });

    this._element.querySelector('.cards__remove-btn').addEventListener('click', () => {
      this._handleRemoveBtnClick();
    });

    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handlePictureClick();
    });
  }

  _handleHeartClick() {
    this._element.querySelector('.cards__heart-btn').classList.toggle('cards__heart-btn_active');
  }

  _handleRemoveBtnClick() {
    this._element.remove();
  }

  _handlePictureClick() {
    popupPictureImage.src = this._link;
    popupPictureImage.alt = ` Изображение ${this._name} не загрузилось`;
    popupPictureDescription.textContent = this._name;

    openPopup(popupPicture);
    window.addEventListener('keydown', closePopupByEscape);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__description').textContent = this._name;
    const cardImage = this._element.querySelector('.cards__image');
    cardImage.src = this._link;
    cardImage.alt = ` Изображение ${this._name} не загрузилось`;
    return this._element;
  }
}
