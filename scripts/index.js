const POPUP_OPENED_CLASS = 'popup_opened';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const popupEdit = document.querySelector('.popup_edit');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-btn');
const popupEditInputName = popupEdit.querySelector('input[name="name"]');
const popupEditInputDescription = popupEdit.querySelector('input[name="description"]');
const popupEditForm = popupEdit.querySelector('form[name="form"]');

const popupAdd = document.querySelector('.popup_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddInputName = popupAdd.querySelector('input[name="name"]');
const popupAddInputDescription = popupAdd.querySelector('input[name="description"]');
const popupAddForm = popupAdd.querySelector('form[name="form"]');

const popupFullscreen = document.querySelector('.popup_dark');
const popupFullscreenImage = popupFullscreen.querySelector('.popup__image');
const popupFullscreenCloseBtn = popupFullscreen.querySelector('.popup__close-btn');
const popupFullscreenDescription = popupFullscreen.querySelector('.popup__image-description');

const cardsContainer = document.querySelector('.cards');
const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item');

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
  popup.classList.add(POPUP_OPENED_CLASS);
}

//functuion Close popup
function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

//function Submit Addpopup
function submitAddPopup(event) {
  event.preventDefault();
  const newCard = { name: popupAddInputName.value, link: popupAddInputDescription.value };
  addCard(newCard);
  closePopup(popupAdd);
}

//function Submit Editpopup
function submitEditPopup(event) {
  event.preventDefault();
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
  newCardElement.querySelector('.cards__heart-btn').addEventListener('click', function (event) {
    event.target.classList.toggle('cards__heart-btn_active');
  });
  //RemoveButton
  newCardElement.querySelector('.cards__remove-btn').addEventListener('click', function (event) {
    newCardElement.remove();
  });
  //fullscreen opened
  newCardElement.querySelector('.cards__image').addEventListener('click', () => {
    popupFullscreenImage.src = newCard.link;
    popupFullscreenImage.alt = ` Изображение ${newCard.name} не загрузилось`;
    popupFullscreenDescription.textContent = newCard.name;
    openPopup(popupFullscreen);
  });
  return newCardElement;
}

//function Add 1 place
function addCard(newCard) {
  cardsContainer.prepend(createCard(newCard));
}

//function Add initial place
function addInitialCards() {
  for (let i = initialCards.length - 1; i >= 0; i--) addCard(initialCards[i]);
}

//EventListener-----------------------------------------------------------------------
addBtn.addEventListener('click', () => openPopup(popupAdd));

editBtn.addEventListener('click', () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});

popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit', (event) => submitEditPopup(event));

popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit', (event) => submitAddPopup(event));

popupFullscreenCloseBtn.addEventListener('click', () => closePopup(popupFullscreen));
//main-------------------------------------------------------------------------------
addInitialCards();
