'use strict';

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
//Functuion Close popup
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
  const newCard = {
    name: popupAddInputTitle.value,
    link: popupAddInputLink.value,
  };
  addCard(newCard);
  closePopup(popupAdd);
}

//function Submit Editpopup
function submitEditPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditInputName.value;
  profileDescription.textContent = popupEditInputDescription.value;
  closePopup(popupEdit);
}

//function Create 1 place
function createCard(newCard) {
  const newCardElement = cardElement.cloneNode(true);

  newCardElement.querySelector('.cards__description').textContent = newCard.name;
  const cardImage = newCardElement.querySelector('.cards__image');
  cardImage.src = newCard.link;
  cardImage.alt = ` Изображение ${newCard.name} не загрузилось`;
  //likeButton
  newCardElement.querySelector('.cards__heart-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__heart-btn_active');
  });
  //RemoveButton
  newCardElement.querySelector('.cards__remove-btn').addEventListener('click', function (evt) {
    newCardElement.remove();
  });
  //PicturePopup opened
  newCardElement.querySelector('.cards__image').addEventListener('click', () => {
    popupPictureImage.src = newCard.link;
    popupPictureImage.alt = ` Изображение ${newCard.name} не загрузилось`;
    popupPictureDescription.textContent = newCard.name;
    openPopup(popupPicture);
  });
  return newCardElement;
}

//function Add 1 place
function addCard(newCard) {
  cardsContainer.prepend(createCard(newCard));
}

//function Add initial place
function addInitialCards() {
  initialCards.forEach((card) => addCard(card));
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

    hideInputError(popup, inputElement, validationObj);
    enableSubmitButton(buttonElement, validationObj);
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
addInitialCards();
enableValidation(validationSettings);
//-----------------------------------------------------------------------------------
//Чтобы попапы не просвечивали при загрузке
window.addEventListener('load', () => {
  document.querySelector('.page').style.display = 'block';
});
