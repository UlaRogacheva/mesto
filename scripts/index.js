import { initialCards } from "./cards.js";

const popups = document.querySelectorAll(".popup");
// popup_profile
const buttonEdit = document.querySelector(".profile__button-edit");
const editPopup = document.querySelector(".popup_profile");
const profileNameInput = editPopup.querySelector(
  ".popup__form-input_type_name"
);
const profileJobInput = editPopup.querySelector(".popup__form-input_type_prof");
const profilePopupSubmit = editPopup.querySelector(".popup__button");
const profileFormElement = editPopup.querySelector(".popup__form_profile");
const profileName = document.querySelector(".profile-info__name");
const profileSubtitle = document.querySelector(".profile-info__subtitle");

// popup_image
const buttonAdd = document.querySelector(".profile__button-add");
const addPopup = document.querySelector(".popup_image");
const cardFormImg = document.forms["cardForm"];
const cardNameInput = cardFormImg.querySelector(
  ".popup__form-input_type_image"
);
const cardLinkInput = cardFormImg.querySelector(".popup__form-input_type_link");

// popup-picture
const picturePopup = document.querySelector(".popup-picture");
const picturePopupImg = picturePopup.querySelector(".popup-picture__img");
const picturePopupCaption = picturePopup.querySelector(
  ".popup-picture__caption"
);

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", () => {
  openPopup(editPopup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileSubtitle.textContent;
});

profileFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(editPopup);
  event.target.reset();
});

buttonAdd.addEventListener("click", () => {
  openPopup(addPopup);
});

const handleAddImgSubmit = (event) => {
  event.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const imageName = {
    name,
    link,
  };
  event.target.reset();

  renderImageElement(createImageElement(imageName));
  closePopup(addPopup);
};

cardFormImg.addEventListener("submit", handleAddImgSubmit);

const imageTemplate = document.getElementById("image-template");
const imageGroup = document.querySelector(".elements__group");

const createImageElement = (imageData) => {
  const imageElement = imageTemplate.content
    .querySelector(".element")
    .cloneNode(true);

  const imageName = imageElement.querySelector(".element__title");
  const photoImage = imageElement.querySelector(".element__photo");

  photoImage.addEventListener("click", () => {
    openPopup(picturePopup);
    picturePopupImg.src = imageData.link;
    picturePopupCaption.textContent = imageData.name;
    picturePopupImg.alt = imageData.name;
  });

  imageName.textContent = imageData.name;
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
