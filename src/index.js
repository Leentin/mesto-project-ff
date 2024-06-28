import "./pages/index.css";
import { createCard, deleteCard } from "./scripts/card";
import { openModal } from "./scripts/modal";
import { closeModal } from "./scripts/modal";
import { initialCards } from "./scripts/card";

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

const template = document.querySelector("#card-template");
const places = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");

const popups = document.querySelectorAll(".popup");
const modal = document.querySelector(".popup_type_image");
const modalImage = modal.querySelector(".popup__image");
const modalImageName = modal.querySelector(".popup__caption");

const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupButton = document.querySelectorAll(".popup__button");

const newPlaceForm = document.querySelector('form[name="new-place"]');
const editProfileForm = document.querySelector('form[name="edit-profile"]');

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardNameValue = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkValue = newPlaceForm.querySelector(".popup__input_type_url");

function addNewCard(evt) {
  evt.preventDefault();

  const cardName = cardNameValue.value;
  const cardLink = cardLinkValue.value;
  const newCard = createCard(
    { name: cardName, link: cardLink },
    deleteCard,
    openImage
  );
  places.prepend(newCard);
  newPlaceForm.reset();

  popupButton.forEach((button) => {
    const modal = button.closest(".popup");
    button.addEventListener("click", () => closeModal(modal));
  });
}
newPlaceForm.addEventListener("submit", addNewCard);

function editProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupButton.forEach((button) => {
    const modal = button.closest(".popup");
    button.addEventListener("click", () => closeModal(modal));
  });
}
editProfileForm.addEventListener("submit", editProfile);

function openImage(img, name) {
  modalImage.src = img;
  modalImage.alt = name;

  modalImageName.textContent = name;

  openModal(modal);
}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, openImage);
  places.append(card);
});

profileEditButton.addEventListener("click", () => {
  openModal(profileEditPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  openModal(profileAddPopup);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (!evt.target.closest(".popup__content")) {
      closeModal(popup);
    }
  });
});

// popupButton.forEach((button) => {
//   const modal = button.closest(".popup");
//   button.addEventListener("click", () => closeModal(modal));
// });
popupCloseButtons.forEach((button) => {
  const modal = button.closest(".popup");

  button.addEventListener("click", () => closeModal(modal));
});

export { template, profileEditButton };
