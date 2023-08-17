function validateInput() {
  const input = document.querySelectorAll('.findCard__input');
  const prompt = document.querySelector('.prompt');

  input.forEach(el => {
    el.oninput = function () {
      el.value = el.value.replace(/[,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');
    }
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

function paintProfileIcon() {
  const profile = document.querySelector('.profile')
  const profileIcon = document.querySelector('.profile__icon')

  profile.addEventListener('mouseover', function () {
    profileIcon.classList.add('_active-profile')
  })

  profile.addEventListener('mouseout', function () {
    profileIcon.classList.remove('_active-profile')
  })
}

paintProfileIcon();

function menu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__menu');
  const span = document.querySelector('.burger__span');
  burger.addEventListener('click', () => {
    burger.classList.toggle('_active')
    menu.classList.toggle('_active-menu')
    span.classList.toggle('_active')
    document.body.classList.toggle('_block')
  })
  const linkContainer = document.querySelector('.header__menu__ul');
  linkContainer.addEventListener('click', (e) => {
    const isLi = e.target.closest('.header__menu__li')
    if (isLi) {
      burger.classList.remove('_active');
      menu.classList.remove('_active-menu');
      span.classList.remove('_active');
      document.body.classList.remove('_block')
    }
  })
  document.addEventListener("click", (e) => {
    if (e.target === menu || e.target === burger || e.target === span) {
    } else {
      burger.classList.remove('_active');
      menu.classList.remove('_active-menu');
      span.classList.remove('_active');
      document.body.classList.remove('_block')
    }
  });
  addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      burger.classList.remove('_active');
      menu.classList.remove('_active-menu');
      span.classList.remove('_active');
      document.body.classList.remove('_block')
    }
  })
}

menu()

function changeLogoText() {
  const logoText = document.querySelector('.header__logo__heading');
  console.log(logoText.innerHTML);
  let text = logoText;
  addEventListener('resize', () => {
    if (window.outerWidth <= 470) {
      text.textContent = 'BPL'
      text.style.letterSpacing = '5.6px'
    } else {
      text.textContent = 'Brooklyn Public Library'
      text.style.letterSpacing = '0.6px'
    }
  })

  addEventListener('load', () => {
    if (window.outerWidth <= 470) {
      text.textContent = 'BPL'
      text.style.letterSpacing = '5.6px'
    } else {
      text.textContent = 'Brooklyn Public Library'
      text.style.letterSpacing = '0.6px'
    }
  })
}

changeLogoText()

function slider() {
  const slider = document.querySelector('.slides__container');
  const dots = document.querySelectorAll('.slider__dot');
  const slideItemInd = document.querySelectorAll('.slides__item');
  const slideItem = document.querySelector('.slides__img');
  const leftBtn = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');

  let countWidth = 0;
  let left = slideItem.clientWidth + 25;
  let right = slideItem.clientWidth + 25;
  let index = 1;
  addEventListener('resize', () => {
    slider.style.transform = `translate3d(0px, 0px, 0px)`;
    left = slideItem.clientWidth + 25;
    right = slideItem.clientWidth + 25;
    countWidth = 0;
    leftBtn.disabled = true
    rightBtn.disabled = false
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('_active')
      dots[i].classList.remove('_non-active')
      dots[0].classList.add('_active')
      dots[0].classList.add('_non-active')
    }
  })
  dots.forEach((el, ind) => {
    el.addEventListener('click', function () {
      countWidth = (slideItem.clientWidth * ind) + (25 * ind);
      index = ind + 1;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('_active')
        dots[i].classList.remove('_non-active')
      }
      if (el.dataset.index) {
        slider.style.transform = `translate3d(-${(slideItem.clientWidth * ind) + (25 * ind)}px, 0px, 0px)`;
        el.classList.add('_active')
        el.classList.add('_non-active')
        rightBtn.disabled = false
        leftBtn.disabled = false
      }
      if (index == 1) {
        leftBtn.disabled = true
        rightBtn.disabled = false
      }
      if (index == dots.length) {
        rightBtn.disabled = true
        leftBtn.disabled = false
      }
    })
  })
  leftBtn.addEventListener('click', function () {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('_active')
      dots[i].classList.remove('_non-active')
    }
    if (countWidth > 0) {
      slider.style.transform += `translate3d(${left}px, 0px, 0px)`;
      countWidth -= left;
      index--
      for (let dot of dots) {
        if (dot.dataset.index == index) {
          dot.classList.add('_active')
          dot.classList.add('_non-active')
        }
      }
    }
    if (index == 1) {
      leftBtn.disabled = true
    } else if (index > 1) {
      rightBtn.disabled = false
    }
  })

  rightBtn.addEventListener('click', function () {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('_active')
      dots[i].classList.remove('_non-active')
    }
    if (countWidth < (right * slideItemInd.length - 1) - right) {
      countWidth += right;
      slider.style.transform += `translate3d(-${right}px, 0px, 0px)`;
      index++
      for (let dot of dots) {
        if (dot.dataset.index == index) {
          dot.classList.add('_active')
          dot.classList.add('_non-active')
        }
      }
    }
    if (index == dots.length) {
      rightBtn.disabled = true
    } else if (index < dots.length) {
      leftBtn.disabled = false
    }
  })
}

slider()

// console.log(`Все требования к работе выполнены = 50 баллов

// 1.Вёрстка соответствует макету. Ширина экрана 768px +26
// 2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки.
//   Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
// 3.На ширине экрана 768рх реализовано адаптивное меню +12
//   (бургер-меню появляется на ширине 1024px, как рекомендовано в задании):
//   - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
//   - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
//   - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +2
//   - размеры открытого бургер-меню соответствуют макету +2
// 4. Сделан адаптив до 320px
// `)