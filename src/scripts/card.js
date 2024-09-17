import { dislikeCard, likeCard, removeCard } from "./api";

function createCard(data, deleteCard, openImage, userId) {
  const template = document.querySelector("#card-template");
  const newCard = template.content.querySelector(".card").cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  const cardName = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");
  const likeCounter = newCard.querySelector(".card__like-counter");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  newCard.id = data._id;
  likeCounter.textContent = data.likes.length;

  if (data.likes.find((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (data.owner._id === userId) {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(newCard);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardImage.addEventListener("click", () => {
    openImage(data.link, data.name);
  });

  likeButton.addEventListener("click", (evt) =>
    handleLikeCard(likeButton, likeCounter, data, userId)
  );

  return newCard;
}

function handleLikeCard(likeButton, likeCounter, card, userId) {
  if (card.likes.find((like) => like._id === userId)) {
    dislikeCard(card._id)
      .then((res) => {
        card.likes = res.likes;
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    likeCard(card._id)
      .then((res) => {
        card.likes = res.likes;
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

function deleteCard(card) {
  removeCard(card.id)
    .then((res) => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard };
