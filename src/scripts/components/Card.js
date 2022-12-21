'use strict';

// Card Class
export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardRemoveBtnClick, handleLikeClick, userId) {
    this._data = data;
    this._name = this._data.name;
    this._link = this._data.link;
    this._cardId = this._data._id;
    this._cardOwner = this._data.owner;
    this._likes = this._data.likes;
    this._likeCounterValue = this._data.likes.length;

    this._cardElement = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoveBtnClick = handleCardRemoveBtnClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    return this._cardElement.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.cards__heart-btn');
    this._cardImage = this._element.querySelector('.cards__image');
    this._likeCounter = this._element.querySelector('.cards__like-counter');
    this._likeButton.addEventListener('click', () => {
      this._doLike();
    });
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    if (this._isCreator()) {
      this._element.querySelector('.cards__remove-btn').addEventListener('click', () => {
        this._handleRemoveBtnClick();
      });
    }
  }

  _isCreator() {
    return this._userId === this._cardOwner._id;
  }

  _isLiked(likes, userID) {
    if (likes.length) {
      return Boolean(likes.find((like) => like._id == userID));
    }
    return false;
  }

  _doLike() {
    this._handleLikeClick(this);
  }

  _changeLikeState(likes, userId) {
    this.isLike = this._isLiked(likes, userId);
    if (this.isLike) {
      this._likeButton.classList.add('cards__heart-btn_active');
    } else {
      this._likeButton.classList.remove('cards__heart-btn_active');
    }
  }

  updateLikeData(data) {
    this._data = data;
    this._likeCounterValue = this._data.likes.length;
    this._likeCounter.textContent = this._likeCounterValue;

    this._changeLikeState(this._data.likes, this._userId);
  }

  _handleRemoveBtnClick() {
    this._handleCardRemoveBtnClick(this);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    if (this._isCreator()) {
      this._element.insertAdjacentHTML('beforeend', `<button class="cards__remove-btn" type="button" aria-label="Кнопка удаления места"></button>`);
    }
    this._setEventListeners();
    this._element.querySelector('.cards__description').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = ` Изображение ${this._name} не загрузилось`;
    this._likeCounter.textContent = this._likeCounterValue;

    this._changeLikeState(this._data.likes, this._userId);

    return this._element;
  }
}
