const recordsBtn = document.querySelector('.records');
const recordList = document.querySelector('.items');
const controlsBtn = document.querySelector('.controls');
const controlsList = document.querySelector('.left');
const rulesBtn = document.querySelector('.rules');
const rulesModal = document.querySelector('.rules-modal');
const closeModalBtn = document.querySelector('.close-button');

controlsBtn.addEventListener('click', showControls);
recordsBtn.addEventListener('click', showRecords);
rulesBtn.addEventListener('click', showRules);
closeModalBtn.addEventListener('click', showRules);

function showRecords() {
  recordList.classList.toggle('_visible');
}

function showControls() {
  controlsList.classList.toggle('_visible');
}

function showRules() {
  rulesModal.classList.toggle('_visible');
}