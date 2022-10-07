const POPUP_OPENED = 'popup_opened';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupInputName = popup.querySelector('input[name="name"]');
const popupForm = popup.querySelector('form[name="form"]')
const popupInputDescription = popup.querySelector('input[name="description"]');

function closePopup() {
  popup.classList.remove(POPUP_OPENED);
};

function openPopup() {
  popup.classList.add(POPUP_OPENED);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
};

function submitPopup(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
};

profileEditBtn.addEventListener('click',openPopup);
popupCloseBtn.addEventListener('click',closePopup);
popupForm.addEventListener('submit',submitPopup);
