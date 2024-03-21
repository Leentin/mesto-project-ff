// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const template = document.querySelector("#card-template");
const places = document.querySelector(".places__list");

function createCard(data, deleteCard) {
  const newCard = template.content.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__image").src = data.link;
  newCard.querySelector(".card__title").textContent = data.name;

  return newCard;
}

function deleteCard() {}

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard);
  places.append(card);
});

/*

Задачи: 
1. Рендерить карточки
2. Удалять карточки


1.1 Функция создания
1.3 Отрендерить карточку

Фунция создания:
  Принимает данные
  Создать карточку 
  Записать данные в карточку
  Добавить слушатель события
  Вернуть карточку

Рендер карточки:
  Проитерироваться по массиву карточек 
  Создаешь карточку
  Добавляешь карточку
  
*/
