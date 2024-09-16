import { template } from '../index'
import { dislikeCard, likeCard, removeCard } from './api'

function createCard(data, deleteCard, openImage, userId) {
  const newCard = template.content.querySelector('.card').cloneNode(true)

  const cardDeleteButton = newCard.querySelector('.card__delete-button')
  const cardName = newCard.querySelector('.card__title')
  const cardImage = newCard.querySelector('.card__image')
  const cardLike = newCard.querySelector('.card__like-button')
  const cardLikeCounter = newCard.querySelector('.card__like-counter')

  cardName.textContent = data.name
  cardImage.src = data.link
  newCard.id = data._id
  cardLikeCounter.textContent = data.likes.length

  if (data.likes.find((like) => like._id === userId)) {
    cardLike.classList.add('card__like-button_is-active')
  }

  if (data.owner._id === userId) {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(newCard)
    })
  } else {
    cardDeleteButton.remove()
  }

  cardImage.addEventListener('click', () => {
    openImage(data.link, data.name)
  })

  cardLike.addEventListener('click', (evt) => handleLikeCard(evt, data, userId))

  return newCard
}

function handleLikeCard(evt, card, userId) {
  const likeBlock = evt.target.closest('.card__like')
  const likeButton = likeBlock.querySelector('.card__like-button')
  const likeCounter = likeBlock.querySelector('.card__like-counter')
  if (card.likes.find((like) => like._id === userId)) {
    dislikeCard(card._id).then((res) => {
      card.likes = res.likes
      likeButton.classList.remove('card__like-button_is-active')
      likeCounter.textContent = res.likes.length
    })
  } else {
    likeCard(card._id).then((res) => {
      card.likes = res.likes
      likeButton.classList.add('card__like-button_is-active')
      likeCounter.textContent = res.likes.length
    })
  }
}

function deleteCard(card) {
  removeCard(card.id).then((res) => {
    card.remove()
  })
}

export { createCard, deleteCard }
