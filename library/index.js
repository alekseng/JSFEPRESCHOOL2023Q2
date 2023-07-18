function validateInput() {
  const input = document.querySelectorAll('.findCard__input');
  const prompt = document.querySelector('.prompt');

  input.forEach(el => {
    el.oninput = function () {
      el.value = el.value.replace(/[,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');
    }
    el.addEventListener('mouseover', function () {
      prompt.classList.add('_active')
    })
    el.addEventListener('mouseout', function () {
      prompt.classList.remove('_active')
    })
  });
};

validateInput();