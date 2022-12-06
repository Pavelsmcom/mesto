'use strict';

export class UserInfo {
  constructor(userInfo) {
    this._name = userInfo.name;
    this._description = userInfo.description;
    this._profileName = document.querySelector('.profile__name');
    this._profileDescription = document.querySelector('.profile__description');
  }
  getUserInfo() {
    return { name: this._name, description: this._description };
  }
  setUserInfo(userInfo) {
    this._name = userInfo.name;
    this._description = userInfo.description;
    this._profileName.textContent = userInfo.name;
    this._profileDescription.textContent = userInfo.description;
  }
}
