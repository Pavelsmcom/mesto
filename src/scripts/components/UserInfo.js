'use strict';

export class UserInfo {
  constructor() {
    this._profileName = document.querySelector('.profile__name');
    this._profileDescription = document.querySelector('.profile__description');
    this._profileAvatar = document.querySelector('.profile__avatar');
  }
  getUserInfo() {
    return { name: this._name, description: this._description, avatar: this._avatar };
  }
  setUserInfo(userInfo) {
    this._name = userInfo.name;
    this._description = userInfo.about;
    this._profileName.textContent = userInfo.name;
    this._profileDescription.textContent = userInfo.about;
  }
  setUserAvatar(avatarLink) {
    this._profileAvatar.src = avatarLink;
  }
}
