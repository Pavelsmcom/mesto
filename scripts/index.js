const POPUP_OPENED = 'popup_opened';

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__editBtn');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupCloseBtn = popupContainer.querySelector('.popup__closeBtn');
const popupInputName = popupContainer.querySelector('input[name="name"]');
const popupInputDescription = popupContainer.querySelector('input[name="description"]');


profileEditBtn.addEventListener('click', () => {
  popup.classList.add(POPUP_OPENED);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
});

popupCloseBtn.addEventListener('click', () => {
  popup.classList.remove(POPUP_OPENED);
});

popupContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  popup.classList.remove(POPUP_OPENED);
});
