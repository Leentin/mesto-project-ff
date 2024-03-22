// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const template = document.querySelector("#card-template");
const places = document.querySelector(".places__list");

function createCard(data, deleteCard) {
  const newCard = template.content.querySelector(".card").cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  const cardName = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(newCard);
  });

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard);
  places.append(card);
});
