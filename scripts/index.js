'use strict';

import { initialCards } from './constants.js';
import { validationSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const popupOpenedClass = 'popup_opened';

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

const popups = document.querySelectorAll('.popup');

const cardsContainer = document.querySelector('.cards');
const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item');

const formValidators = {}; // names : validations  of all form

//Function----------------------------------------------------------------------------
// Function Open Picture`s popup
function handleCardClick(name, link) {
  popupPictureImage.src = link;
  popupPictureImage.alt = ` Изображение ${name} не загрузилось`;
  popupPictureDescription.textContent = name;

  openPopup(popupPicture);
}

//Function Create card
function createCard(card) {
  const newCard = new Card(card, cardElement, handleCardClick);
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

//Function Add cards
function addInitialCards(cards) {
  cards.forEach((card) => {
    cardsContainer.prepend(createCard(card));
  });
}

//Function Close popup
function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
  window.removeEventListener('keydown', closePopupByEscape);
}

//Function press Escape to close popup
export function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//function Open popup
function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
  window.addEventListener('keydown', closePopupByEscape);
}

//function Submit Addpopup
function submitAddPopup(evt) {
  evt.preventDefault();
  const data = {
    name: popupAddInputTitle.value,
    link: popupAddInputLink.value,
  };

  cardsContainer.prepend(createCard(data));
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

// Function start vadidation
function startValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((form) => {
    const newFormValidator = new FormValidator(validationSettings, form);
    newFormValidator.enableValidation();
    formValidators[form.getAttribute('name')] = newFormValidator;
  });
}

//EventListener-----------------------------------------------------------------------
buttonAddCard.addEventListener('click', () => {
  formValidators['form_add'].resetValidation();
  openPopup(popupAdd);
});

buttonEditProfile.addEventListener('click', () => {
  formValidators['form_edit'].resetValidation();
  fillPopupEditInputs();
  openPopup(popupEdit);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

popupAddForm.addEventListener('submit', (evt) => submitAddPopup(evt));
popupEditForm.addEventListener('submit', (evt) => submitEditPopup(evt));

//main-------------------------------------------------------------------------------

addInitialCards(initialCards);
startValidation(validationSettings);

//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});
