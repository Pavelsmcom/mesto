'use strict';

import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupPictureImage = document.querySelector('.popup__image');
    this.popupPictureDescription = document.querySelector('.popup__image-description');
  }
  open(name, link) {
    this.popupPictureImage.src = link;
    this.popupPictureImage.alt = ` Изображение ${name} не загрузилось`;
    this.popupPictureDescription.textContent = name;
    super.open();
  }
}
