'use strict';

import { initialCards } from './constants';
import { validationSettings } from './constants';
import { FormValidator } from './FormValidator';
import { Card } from './Card';

console.log(validationSettings);

const PopupOpenedClass = 'popup_opened';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddCard = document.querySelector('.profile__add-btn');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms.form_edit;
const popupEditInputName = popupEditForm.elements.name;
const popupEditInputDescription = popupEditForm.elements.description;

const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.forms.form_add;
const popupAddInputTitle = popupAddForm.elements.title;
const popupAddInputLink = popupAddForm.elements.link;

const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImage = popupPicture.querySelector('.popup__image');
const popupPictureDescription = popupPicture.querySelector('.popup__image-description');

const cardsContainer = document.querySelector('.cards');
const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item');

//Function----------------------------------------------------------------------------
// Function start vadidation
function startValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((form) => {
    const newFormValidator = new FormValidator(validationSettings, form);
    newFormValidator.enableValidation();
  });
}

//Function Add cards
function addInitialCards(cards) {
  cards.forEach((card) => {
    const newCard = new Card(card, cardElement);
    const newCardElement = newCard.generateCard();
    cardsContainer.prepend(newCardElement);
  });
}
//Function Close popup
function closePopup(popup) {
  popup.classList.remove(PopupOpenedClass);
  window.removeEventListener('keydown', closePopupByEscape);
}

//Function press Escape to close popup
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Function click to close popup
function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(evt.currentTarget);
  }
}

//function Open popup
function openPopup(popup) {
  popup.classList.add(PopupOpenedClass);
  window.addEventListener('keydown', closePopupByEscape);
}

//function Submit Addpopup
function submitAddPopup(evt) {
  evt.preventDefault();
  const data = {
    name: popupAddInputTitle.value,
    link: popupAddInputLink.value,
  };

  const newCard = new Card(data, cardElement);
  const newCardElement = newCard.generateCard();
  cardsContainer.prepend(newCardElement);

  closePopup(popupAdd);
}

//function Submit Editpopup
function submitEditPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditInputName.value;
  profileDescription.textContent = popupEditInputDescription.value;
  closePopup(popupEdit);
}

//function Fill popup Edit input
function fillPopupEditInputs() {
  popupEditInputName.value = profileName.textContent;
  popupEditInputDescription.value = profileDescription.textContent;
}
//Function Clear Popup when opening
function clearPopup(popup, validationObj) {
  const inputList = Array.from(popup.querySelectorAll(validationObj.inputSelector));
  const buttonElement = popup.querySelector(validationObj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.value = '';

    //clear Input Error
    const inputLinkError = popup.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(validationObj.inputErrorClass);
    inputLinkError.classList.remove(validationObj.errorClass);
    inputLinkError.textContent = '';

    //enable Submit Button
    buttonElement.classList.add(validationObj.inactiveButtonClass);
    buttonElement.disabled = true;

    //-----------------------------------------------------------------------
  });
}

//EventListener-----------------------------------------------------------------------
buttonAddCard.addEventListener('click', () => {
  clearPopup(popupAdd, validationSettings);
  openPopup(popupAdd);
});
popupAdd.addEventListener('mousedown', closePopupByClick);
popupAddForm.addEventListener('submit', (evt) => submitAddPopup(evt));

buttonEditProfile.addEventListener('click', () => {
  clearPopup(popupEdit, validationSettings);
  fillPopupEditInputs();
  openPopup(popupEdit);
});
popupEdit.addEventListener('mousedown', closePopupByClick);
popupEditForm.addEventListener('submit', (evt) => submitEditPopup(evt));

popupPicture.addEventListener('mousedown', closePopupByClick);

//main-------------------------------------------------------------------------------

addInitialCards(initialCards);
startValidation(validationSettings);

//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});
