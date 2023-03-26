const buttonEdit = document.querySelector(".profile__button-edit");
const editPopup = document.querySelector(".popup");
const closePopupButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__form-input_type_name");
const jobInput = editPopup.querySelector(".popup__form-input_type_prof");
const popupSubmit = editPopup.querySelector(".popup__button");
const formElement = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");

buttonEdit.addEventListener("click", () => {
  editPopup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closePopupButton.addEventListener("click", () => {
  editPopup.classList.remove("popup_open");
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;

  profileSubtitle.textContent = jobInput.value;
  editPopup.classList.remove("popup_open");
});

const elementButtonActive = document.querySelectorAll(".element__button");

elementButtonActive.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("element__button_active");
  });
});
