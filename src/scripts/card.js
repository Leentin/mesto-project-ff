import { template } from "../index";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(data, deleteCard, openImage) {
  const newCard = template.content.querySelector(".card").cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  const cardName = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const cardLike = newCard.querySelector(".card__like-button");

  cardName.textContent = data.name;
  cardImage.src = data.link;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(newCard);
  });

  cardImage.addEventListener("click", () => {
    openImage(data.link, data.name);
  });

  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__like-button_is-active");
  });

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

export { createCard, deleteCard, initialCards };
