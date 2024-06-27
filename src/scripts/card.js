import { template } from "../index";
import { openImage } from "../index";

function createCard(data, deleteCard) {
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
    openImage(data.link);
  });

  cardLike.addEventListener("click", () => {
    cardLike.classList.add("card__like-button_is-active");
  });

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

export { createCard, deleteCard };
