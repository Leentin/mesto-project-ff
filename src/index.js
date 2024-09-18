import "./pages/index.css";
import { createCard, deleteCard } from "./scripts/card";
import { openModal } from "./scripts/modal";
import { closeModal } from "./scripts/modal";

import addIconImage from "./images/add-icon.svg";
import avatarImage from "./images/avatar.jpg";
import cardOneImage from "./images/card_1.jpg";
import cardTwoImage from "./images/card_2.jpg";
import cardThreeImage from "./images/card_3.jpg";
import closeImage from "./images/close.svg";
import deleteIcon from "./images/delete-icon.svg";
import editIcon from "./images/edit-icon.svg";
import likeActive from "./images/like-active.svg";
import likeInactive from "./images/like-inactive.svg";
import logoIcon from "./images/logo.svg";
import {
  getInitialCards,
  getUserInfo,
  sendNewCard,
  updateUserAvatar,
  updateUserInfo,
} from "./scripts/api";
import {
  enableValidation,
  clearValidation,
  setFormValidity,
} from "./scripts/validation";

const projectImages = [
  { name: "add-icon", link: addIconImage },
  { name: "avatar", link: avatarImage },
  { name: "card_1", link: cardOneImage },
  { name: "card_2", link: cardTwoImage },
  { name: "card_3", link: cardThreeImage },
  { name: "close", link: closeImage },
  { name: "delete-icon", link: deleteIcon },
  { name: "edit-icon", link: editIcon },
  { name: "like-active", link: likeActive },
  { name: "like-inactive", link: likeInactive },
  { name: "logo", link: logoIcon },
];

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const places = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileEditAvatarPopup = document.querySelector(".popup_type_avatar");
const profileEditAvatarButton = document.querySelector(".profile__image-hover");

const popups = document.querySelectorAll(".popup");
const modalPopupImage = document.querySelector(".popup_type_image");
const modalImage = modalPopupImage.querySelector(".popup__image");
const modalImageName = modalPopupImage.querySelector(".popup__caption");

const popupCloseButtons = document.querySelectorAll(".popup__close");

const newPlaceForm = document.querySelector('form[name="new-place"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const editProfileAvatarForm = document.querySelector(
  'form[name="edit-avatar"]'
);

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileAvatarInput = editProfileAvatarForm.querySelector(
  ".popup__input_type_avatar"
);

const cardNameValue = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkValue = newPlaceForm.querySelector(".popup__input_type_url");

const setButtonLoadingState = (button, isLoading) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

function addNewCard(evt) {
  evt.preventDefault();
  const button = newPlaceForm.querySelector(".popup__button");
  const card = {
    name: cardNameValue.value,
    link: cardLinkValue.value,
  };
  setButtonLoadingState(button, true);
  sendNewCard(card)
    .then((card) => {
      const newCard = createCard(card, deleteCard, openImage, userId);
      places.prepend(newCard);
      newPlaceForm.reset();
      closeModal(profileAddPopup);
      setFormValidity(newPlaceForm, true);
    })
    .catch((err) => {
      setFormValidity(newPlaceForm, false);
    })
    .finally(() => {
      setButtonLoadingState(button, false);
    });
}
newPlaceForm.addEventListener("submit", addNewCard);

function editProfileAvatar(evt) {
  evt.preventDefault();
  const button = editProfileAvatarForm.querySelector(".popup__button");
  setButtonLoadingState(button, true);
  updateUserAvatar(profileAvatarInput.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(profileEditAvatarPopup);
      setFormValidity(editProfileAvatarForm, true);
    })
    .catch((err) => {
      setFormValidity(editProfileAvatarForm, false);
    })
    .finally(() => {
      setButtonLoadingState(button, false);
    });
}

function editProfile(evt) {
  evt.preventDefault();
  const button = editProfileForm.querySelector(".popup__button");
  setButtonLoadingState(button, true);
  const user = {
    name: nameInput.value,
    about: jobInput.value,
  };
  updateUserInfo(user)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(profileEditPopup);
      setFormValidity(editProfileForm, true);
    })
    .catch((err) => {
      setFormValidity(editProfileForm, false);
    })
    .finally(() => {
      setButtonLoadingState(button, false);
    });
}

function openImage(img, name) {
  modalImage.src = img;
  modalImage.alt = name;

  modalImageName.textContent = name;

  openModal(modalPopupImage);
}

profileEditButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  openModal(profileEditPopup);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(profileAddPopup);
});

profileEditAvatarButton.addEventListener("click", () => {
  clearValidation(editProfileAvatarForm, validationConfig);
  openModal(profileEditAvatarPopup);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (!evt.target.closest(".popup__content")) {
      closeModal(popup);
    }
  });
});

popupCloseButtons.forEach((button) => {
  const modal = button.closest(".popup");

  button.addEventListener("click", () => closeModal(modal));
});

editProfileForm.addEventListener("submit", editProfile);

editProfileAvatarForm.addEventListener("submit", editProfileAvatar);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;

    initialCards.forEach(function (element) {
      const card = createCard(element, deleteCard, openImage, userId);
      places.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
