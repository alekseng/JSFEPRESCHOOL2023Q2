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

function paintSvg() {
  const link = document.querySelectorAll('.footer__link')
  const svgIcons = document.querySelectorAll('.svgIcons')

  link.forEach(el => {
    el.addEventListener('mouseover', function () {
      for (let icon of svgIcons) {
        if (icon.dataset.fill === el.dataset.color) {
          icon.classList.add('fill-svg')
        } else {
          icon.classList.remove('fill-svg')
        }
      };
    })
    el.addEventListener('mouseout', function () {
      for (let icon of svgIcons) {
        icon.classList.remove('fill-svg')
      }
    })
  })
}

paintSvg();

console.log(`Все требования к работе выполнены = 100 баллов
1.Вёрстка валидная + 10
2.Вёрстка семантическая + 16
3.Вёрстка соответствует макету + 54
  блок <header> + 8
  секция Welcome + 4
  секция About + 6
  секция Favorites + 8
  секция CoffeShop + 6
  секция LibraryCard + 8
  блок <footer> + 8
4.Общие требования к верстке +20 (все требования этого раздела выполнены)
`)