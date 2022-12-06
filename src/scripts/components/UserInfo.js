'use strict';

export class UserInfo {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.description = userInfo.description;
    this.profileName = document.querySelector('.profile__name');
    this.profileDescription = document.querySelector('.profile__description');
  }
  getUserInfo() {
    return { name: this.name, description: this.description };
  }
  setUserInfo(userInfo) {
    this.name = userInfo.name;
    this.description = userInfo.description;
    this.profileName.textContent = userInfo.name;
    this.profileDescription.textContent = userInfo.description;
  }
}
