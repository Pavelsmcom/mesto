const POPUP_OPENED = 'popup_opened';
const FULLSCREEN_OPENED = 'fullscreen-image_opened';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const EditBtn = document.querySelector('.profile__edit-btn');
const AddBtn = document.querySelector('.profile__add-btn');

const popups = document.querySelectorAll('.popup');
const popupEdit = popups[0];
const popupAdd = popups[1];

const popupEditCloseBtn = popupEdit.querySelector('.popup__close-btn');
const popupEditInputName = popupEdit.querySelector('input[name="name"]');
const popupEditInputDescription = popupEdit.querySelector('input[name="description"]');
const popupEditForm = popupEdit.querySelector('form[name="form"]');

const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddInputName = popupAdd.querySelector('input[name="name"]');
const popupAddInputDescription = popupAdd.querySelector('input[name="description"]');
const popupAddForm = popupAdd.querySelector('form[name="form"]');

const cardsContainer = document.querySelector('.cards');

const fullscreen = document.querySelector('.fullscreen-image');
const fullscreenImage = fullscreen.querySelector('.fullscreen-image__image');
const fullscreenCloseBtn = fullscreen.querySelector('.fullscreen-image__close-btn');
const fullscreenDescription = fullscreen.querySelector('.fullscreen-image__description');

const initialCards = [
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

//Function----------------------------------------------------------------------------
//function Open popup
function openPopup(popup) {
  if (popup === popupEdit) {
    popupEditInputName.value = profileName.textContent;
    popupEditInputDescription.value = profileDescription.textContent;
  }
  popup.classList.add(POPUP_OPENED);
}

//functuion Close popup
function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED);
}

//functuion Close fullscreen
function closeFullscreen() {
  fullscreen.classList.remove(FULLSCREEN_OPENED);
}

//functin Submit popup
function submitPopup(event, popup) {
  event.preventDefault();
  if (popup === popupEdit) {
    profileName.textContent = popupEditInputName.value;
    profileDescription.textContent = popupEditInputDescription.value;
  } else if (popup === popupAdd) {
    initialCards.push({ name: popupAddInputName.value, link: popupAddInputDescription.value });
    addPlace(initialCards, initialCards.length - 1);
  }
  closePopup(popup);
}

//function Add 1 place
function addPlace(initialCards, position) {
  const name = initialCards[position].name;
  const link = initialCards[position].link;

  const cardTemplate = document.querySelector('.cards__template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__description').textContent = initialCards[position].name;
  cardElement.querySelector('.cards__image').src = initialCards[position].link;

  cardsContainer.prepend(cardElement);
  //likeButton
  cardElement.querySelector('.cards__heart-btn').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__heart-btn_active');
  });
  //RemoveButton
  cardElement.querySelector('.cards__remove-btn').addEventListener('click', function (event) {
    event.target.closest('.cards__item').remove();
  });
  //fullscreen opened
  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    fullscreenImage.src = link;
    fullscreenDescription.textContent = name;
    fullscreen.classList.add(FULLSCREEN_OPENED);
  });
}

//function Add all place
function addAllPlaces(initialCards) {
  for (let i = initialCards.length - 1; i >= 0; i--) addPlace(initialCards, i);
}

//EventListener-----------------------------------------------------------------------
AddBtn.addEventListener('click', () => openPopup(popupAdd));
EditBtn.addEventListener('click', () => openPopup(popupEdit));

popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit', (event) => submitPopup(event, popupEdit));

popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit', (event) => submitPopup(event, popupAdd));

fullscreenCloseBtn.addEventListener('click', closeFullscreen);

//main-------------------------------------------------------------------------------
addAllPlaces(initialCards);
