export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const userId = '85e672627323b866bfd88576';

export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const buttonAddCard = document.querySelector('.profile__add-btn');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupEditForm = document.forms.form_edit;
export const popupEditInputName = popupEditForm.elements.name;
export const popupEditInputDescription = popupEditForm.elements.description;

export const popupAdd = document.querySelector('.popup_type_add');

export const popupPicture = document.querySelector('.popup_type_picture');

export const popupConfirmation = document.querySelector('.popup_type_confirm');

export const popupAvatar = document.querySelector('.popup_type_avatar');

export const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item');

export const avatar = document.querySelector('.profile__avatar-container');

export const formValidators = {}; // names : validations  of all form

export const optionsConnection = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56/',
  headers: {
    authorization: '246582af-db1f-41d3-a946-8c012a1490d8',
    'Content-Type': 'application/json',
  },
};
