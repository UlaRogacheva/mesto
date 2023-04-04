import { initialCards } from "./cards.js";

// popup_profile
const buttonEdit = document.querySelector(".profile__button-edit");
const editPopup = document.querySelector(".popup_profile");
const closePopupButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__form-input_type_name");
const jobInput = editPopup.querySelector(".popup__form-input_type_prof");
const popupSubmit = editPopup.querySelector(".popup__button");
const formElement = editPopup.querySelector(".popup__form_profile");
const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");

// popup_image
const buttonAdd = document.querySelector(".profile__button-add");
const addPopup = document.querySelector(".popup_image");
const closePopupAddButton = addPopup.querySelector(".popup__close");
const addFormImg = document.querySelector(".popup__form_image");
const nameInputAdd = addFormImg.querySelector(".popup__form-input_type_image");
const linkInputAdd = addFormImg.querySelector(".popup__form-input_type_link");

// popup-picture
const picturePopup = document.querySelector(".popup-picture");
const picturePopupImg = picturePopup.querySelector(".popup-picture__img");
const picturePopupCaption = picturePopup.querySelector(
  ".popup-picture__caption"
);

function openPopup(popup) {
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}

buttonEdit.addEventListener("click", () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closePopupButton.addEventListener("click", () => {
  closePopup(editPopup);
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editPopup);
});

buttonAdd.addEventListener("click", () => {
  nameInputAdd.value = "";
  linkInputAdd.value = "";

  openPopup(addPopup);
});

const handleAddImgSubmit = (event) => {
  event.preventDefault();

  const name = nameInputAdd.value;
  const link = linkInputAdd.value;

  const imageName = {
    name,
    link,
  };

  renderImageElement(createImageElement(imageName));
  closePopup(addPopup);
};

addFormImg.addEventListener("submit", handleAddImgSubmit);
closePopupAddButton.addEventListener("click", () => {
  closePopup(addPopup);
});

const imageTemplate = document.getElementById("image-template");
const imageGroup = document.querySelector(".elements__group");

const createImageElement = (imageData) => {
  const imageElement = imageTemplate.content
    .querySelector(".element")
    .cloneNode(true);

  const imageName = imageElement.querySelector(".element__title");
  const photoImage = imageElement.querySelector(".element__photo");
  const closePopupButtonPicture = picturePopup.querySelector(".popup__close");

  photoImage.addEventListener("click", () => {
    openPopup(picturePopup);
    picturePopupImg.src = imageData.link;
    picturePopupCaption.textContent = imageData.name;
  });

  closePopupButtonPicture.addEventListener("click", () => {
    closePopup(picturePopup);
  });

  imageName.innerHTML = imageData.name;
  photoImage.src = imageData.link;
  photoImage.alt = imageData.name;

  const deleteButton = imageElement.querySelector(".element__button-delete");
  const likeButton = imageElement.querySelector(".element__button");

  const handleDelete = () => {
    imageElement.remove();
  };
  const handleLikeButton = () => {
    likeButton.classList.toggle("element__button_active");
  };

  deleteButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLikeButton);

  return imageElement;
};

const renderImageElement = (imageElement) => {
  imageGroup.prepend(imageElement);
};

initialCards.forEach((image) => {
  renderImageElement(createImageElement(image));
});
