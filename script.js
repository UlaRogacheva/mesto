const buttonEdit = document.querySelector(".profile__button-edit");
const editPopup = document.querySelector(".popup_type-edit");
const closePoputButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".poput__form-input_name");
const jobInput = editPopup.querySelector(".poput__form-input_prof");
const popupSubmit = editPopup.querySelector(".popup__button");
const formElement = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");

buttonEdit.addEventListener("click", () => {
  editPopup.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closePoputButton.addEventListener("click", () => {
  editPopup.classList.remove("popup_open");
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.innerHTML = nameInput.value;

  profileSubtitle.innerHTML = jobInput.value;
  editPopup.classList.remove("popup_open");
});

const elementButtonActive = document.querySelectorAll(".element__button");

elementButtonActive.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("element__button_active");
  });
});
