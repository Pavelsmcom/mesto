'use strict';

export class Api {
  constructor(optionsConnection) {
    this._baseUrl = optionsConnection.baseUrl;
    this._headers = optionsConnection.headers;
  }
  // Получаем массив карточек от сервера
  async getInitialCards() {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Ошибка получения карточек с сервера:\n ${err.message}`);
    }
  }
  // Загружаем картчоку на сервер
  async addCard(card) {
    try {
      const response = await fetch(`${this._baseUrl}/cards `, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Ошибка загрузки карточки на сервер:\n ${err.message}`);
    }
  }
  // Удаляем карточку
  async deleteCard(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/${cardId} `, {
        method: 'DELETE',
        headers: this._headers,
      });
    } catch (err) {
      console.log(`Ошибка удаления карточки:\n ${err.message}`);
    }
  }
  // Ставим или удаляем лайк
  async changeLike(cardId, isLike) {
    try {
      const response = isLike
        ? await fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
            method: 'DELETE',
            headers: this._headers,
          })
        : await fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
            method: 'PUT',
            headers: this._headers,
          });
      const data = await response.json();

      return data;
    } catch (err) {
      console.log(`Ошибка изменения статуса лайка:\n ${err.message}`);
    }
  }
  // Получаем данные пользователя от сервера
  async getUserInfo() {
    try {
      const response = await fetch(`${this._baseUrl}/users/me `, {
        headers: this._headers,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Ошибка получения данных пользователя:\n ${err.message}`);
    }
  }
  // Изменяем данные пользователя
  async setUserInfo(userInfo) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me `, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userInfo.name,
          about: userInfo.description,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Ошибка изменения данных пользователя:\n ${err.message}`);
    }
  }
  // Изменяем аватар пользователя
  async setAvatar(link) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(`Ошибка изменения аватара пользователя:\n ${err.message}`);
    }
  }
}
