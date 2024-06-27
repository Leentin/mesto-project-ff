function handleEscPress(evt) {
  const openedModal = document.querySelector(".popup_is-opened");
  if (evt.keyCode == 27) {
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscPress);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscPress);
}

export { openModal, closeModal };
