export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const buttonAddCard = document.querySelector('.profile__add-btn');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupEditForm = document.forms.form_edit;
export const popupEditInputName = popupEditForm.elements.name;
export const popupEditInputDescription = popupEditForm.elements.description;

export const popupAdd = document.querySelector('.popup_type_add');
export const popupPicture = document.querySelector('.popup_type_picture');

export const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item');

export const formValidators = {}; // names : validations  of all form
