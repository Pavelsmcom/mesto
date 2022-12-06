'use strict';

import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureImage = document.querySelector('.popup__image');
    this._popupPictureDescription = document.querySelector('.popup__image-description');
  }
  open(name, link) {
    this._popupPictureImage.src = link;
    this._popupPictureImage.alt = ` Изображение ${name} не загрузилось`;
    this._popupPictureDescription.textContent = name;
    super.open();
  }
}
