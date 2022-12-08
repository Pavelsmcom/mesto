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

//Function createCard
function createCard(card) {
  const newCard = new Card(card, cardElement, (name, link) => {
    popupFullSizePicture.open(name, link);
  });
  return newCard.generateCard();
}
//main-------------------------------------------------------------------------------
const user = new UserInfo({ name: 'Жак-Ив Кусто', description: 'Исследователь океана' });

const popupFullSizePicture = new PopupWithImage(popupPicture);
popupFullSizePicture.setEventListeners();

const popupUserProfile = new PopupWithForm(popupEdit, (data) => {
  user.setUserInfo(data);
});
popupUserProfile.setEventListeners();

const popupAddNewCard = new PopupWithForm(popupAdd, (card) => {
  cardList.addItem(createCard(card));
});
popupAddNewCard.setEventListeners();

const cardList = new Section(
  {
    renderer: (card) => cardList.addItem(createCard(card)),
  },
  '.cards'
);
cardList.renderer(initialCards);

startValidation(validationSettings);

//EventListener-----------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});
