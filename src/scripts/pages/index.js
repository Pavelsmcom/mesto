'use strict';
import '../../pages/index.css';

import {
  initialCards,
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
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//Function----------------------------------------------------------------------------
// Function start validation
function startValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((form) => {
    const newFormValidator = new FormValidator(validationSettings, form);
    newFormValidator.enableValidation();
    formValidators[form.getAttribute('name')] = newFormValidator;
  });
}

//main-------------------------------------------------------------------------------
const user = new UserInfo({ name: 'Жак-Ив Кусто', description: 'Исследователь океана' });

const picturePopup = new PopupWithImage(popupPicture);
picturePopup.setEventListeners();

const editPopup = new PopupWithForm(popupEdit, (data) => {
  user.setUserInfo(data);
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(popupAdd, (card) => {
  const newCard = new Card(card, cardElement, (name, link) => {
    picturePopup.open(name, link);
  });
  const newCardElement = newCard.generateCard();
  cardList.addItem(newCardElement);
});
addPopup.setEventListeners();

const cardList = new Section(
  {
    renderer: (card) => {
      const newCard = new Card(card, cardElement, (name, link) => {
        picturePopup.open(name, link);
      });
      const newCardElement = newCard.generateCard();
      cardList.addItem(newCardElement);
    },
  },
  '.cards'
);
cardList.renderer(initialCards);

startValidation(validationSettings);

//EventListener-----------------------------------------------------------------------
buttonAddCard.addEventListener('click', () => {
  formValidators['form_add'].resetValidation();
  addPopup.open();
});

buttonEditProfile.addEventListener('click', () => {
  formValidators['form_edit'].resetValidation();
  popupEditInputName.value = user.getUserInfo().name;
  popupEditInputDescription.value = user.getUserInfo().description;
  editPopup.open();
});
//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});