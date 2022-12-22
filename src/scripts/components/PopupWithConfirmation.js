'use strict';

import Popup from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmBtnSelector = this._popupSelector.querySelector('[name="confirm_btn"]');
  }
  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmBtnSelector.addEventListener('click', (evt) => {
      this._deleteCard();
    });
  }
}
