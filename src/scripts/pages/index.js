'use strict';
import '../../pages/index.css';

import {
  validationSettings,
  buttonEditProfile,
  buttonAddCard,
  popupEdit,
  popupEditInputName,
  popupEditInputDescription,
  popupAdd,
  popupPicture,
  cardElement,
  formValidators,
  popupConfirmation,
  popupAvatar,
  optionsConnection,
  avatar,
  userId,
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

//Function

// Функция старта валидации
function startValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((form) => {
    const newFormValidator = new FormValidator(validationSettings, form);
    newFormValidator.enableValidation();
    formValidators[form.getAttribute('name')] = newFormValidator;
  });
}

//Функция создания карточки
function createCard(card) {
  const newCard = new Card(
    card,
    cardElement,
    (name, link) => {
      popupFullSizePicture.open(name, link);
    },
    (card) => {
      popupConfirm.open(async () => {
        try {
          await api.deleteCard(card._cardId);
          popupConfirm.close();
          card.removeCard();
        } catch (Error) {
          console.log(Error.message);
        }
      });
    },
    async (card) => {
      try {
        const data = await api.changeLike(card._cardId, card.isLike);
        card.updateLikeData(data);
      } catch (Error) {
        console.log(Error.message);
      }
    },
    userId
  );
  return newCard.generateCard();
}
// Функция изменяет надпись на кнопке сабмита, пока идёт отправка данных на сервер
function changeSubmitStatus(popupSelector, text) {
  popupSelector.setSubmitStatus(text);
}

//main-------------------------------------------------------------------------------
const user = new UserInfo();
const api = new Api(optionsConnection);

const cardList = new Section(
  {
    renderer: (card) => cardList.addItem(createCard(card)),
  },
  '.cards'
);

// Получаем данные о пользователе и данные карточек
(async () => {
  try {
    const data = await api.getUserInfo();
    const cards = await api.getInitialCards();

    user.setUserInfo({ name: data.name, about: data.about });
    user.setUserAvatar(data.avatar);
    cardList.renderItems(cards);
  } catch (Error) {
    console.log(Error.message);
  }
})();

// Изменение данных пользователя
const popupUserProfile = new PopupWithForm(popupEdit, async (data) => {
  try {
    changeSubmitStatus(popupUserProfile, 'Сохранение...');
    const userInfo = await api.setUserInfo(data);
    popupUserProfile.close();
    user.setUserInfo(userInfo);
  } catch (Error) {
    console.log(Error.message);
  } finally {
    changeSubmitStatus(popupUserProfile, 'Сохранить');
  }
});
popupUserProfile.setEventListeners();

// Изменение аватара пользователя
const popupChangeAvatar = new PopupWithForm(popupAvatar, async (data) => {
  try {
    changeSubmitStatus(popupChangeAvatar, 'Сохранение...');
    const response = await api.setAvatar(data.link);
    popupChangeAvatar.close();
    user.setUserAvatar(response.avatar);
  } catch (Error) {
    console.log(Error.message);
  } finally {
    changeSubmitStatus(popupChangeAvatar, 'Сохранить');
  }
});
popupChangeAvatar.setEventListeners();

// Добавление новой карточки
const popupAddNewCard = new PopupWithForm(popupAdd, async (card) => {
  try {
    changeSubmitStatus(popupAddNewCard, 'Сохранение...');
    const data = await api.addCard(card);
    popupAddNewCard.close();
    cardList.addItem(createCard(data));
  } catch (Error) {
    console.log(Error.message);
  } finally {
    changeSubmitStatus(popupAddNewCard, 'Создать');
  }
});
popupAddNewCard.setEventListeners();

// Открытие изображения карточки на весь экран
const popupFullSizePicture = new PopupWithImage(popupPicture);
popupFullSizePicture.setEventListeners();

// Подтверждение перед удалением
const popupConfirm = new PopupWithConfirmation(popupConfirmation);
popupConfirm.setEventListeners();

startValidation(validationSettings);

//EventListener
buttonAddCard.addEventListener('click', () => {
  formValidators['form_add'].resetValidation();
  popupAddNewCard.open();
});

buttonEditProfile.addEventListener('click', () => {
  formValidators['form_edit'].resetValidation();
  popupEditInputName.value = user.getUserInfo().name;
  popupEditInputDescription.value = user.getUserInfo().description;
  popupUserProfile.open();
});

avatar.addEventListener('click', () => {
  formValidators['form_avatar'].resetValidation();
  popupChangeAvatar.open();
});
//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});
