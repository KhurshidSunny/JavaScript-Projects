'use strict';

const showModalButtons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

// open modal function
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// close modal fundtion
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// open the widnow by button
showModalButtons.forEach((button, i) => {
  button.addEventListener('click', openModal);
});

// Close with button
closeModalButton.addEventListener('click', closeModal);

// close the modal window by clicking outside the window
overlay.addEventListener('click', closeModal);

// clsoing the modal window by pressing Escape key
document.addEventListener('keyup', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
