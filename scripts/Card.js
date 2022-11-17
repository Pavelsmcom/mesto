'use strict';

// Card Class
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._cardElement.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.cards__heart-btn');
    this._cardImage = this._element.querySelector('.cards__image');

    this._likeButton.addEventListener('click', () => {
      this._handleHeartClick();
    });

    this._element.querySelector('.cards__remove-btn').addEventListener('click', () => {
      this._handleRemoveBtnClick();
    });

    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleHeartClick() {
    this._likeButton.classList.toggle('cards__heart-btn_active');
  }

  _handleRemoveBtnClick() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__description').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = ` Изображение ${this._name} не загрузилось`;
    return this._element;
  }
}
