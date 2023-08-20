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
  const profile = document.querySelector('.icon')
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
  const login = document.querySelector('.login-pop-up__no-auth')
  const loginWithAuth = document.querySelector('.login-pop-up__with-auth')

  burger.addEventListener('click', () => {
    burger.classList.toggle('_active')
    menu.classList.toggle('_active-menu')
    span.classList.toggle('_active')
    login.classList.remove('_active');
    loginWithAuth.classList.remove('_active');
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

function toggleBooks() {
  const btns = document.getElementsByName('season')
  const books = document.querySelectorAll('.books__container')

  btns.forEach(el => {
    el.addEventListener('click', function () {
      for (let book of books) {
        if (book.dataset.filter === el.value) {
          book.classList.add('_books-show');
        } else {
          book.classList.remove('_books-show');
        }
      };
    })
  })
}

toggleBooks()

// кнопка профиля
const btn = document.querySelector('.icon')

// контейнер с модалками
const modal = document.querySelector('.modal')

// Модалка входа/регистрации
const loginNoAuth = document.querySelector('.login-pop-up__no-auth')
const loginLoginNoAuth = document.querySelector('.login-pop-up__no-auth__login')
const loginRegisterNoAuth = document.querySelector('.login-pop-up__no-auth__register')

// Модалка профиля/выхода из авторизации
const loginWithAuth = document.querySelector('.login-pop-up__with-auth')
const loginProfileInfoWithAuth = document.querySelector('.login-pop-up__with-auth__profile-info')
const loginRegisterWithAuth = document.querySelector('.login-pop-up__with-auth__register')

// Модалка регистрации
const modalRegister = document.querySelector('.modal__register')
const modalCloseBtnRegister = document.querySelector('.modal__close-btn__register')
const btnLogin = document.querySelector('.button__login') // кнопка входа

// Модалка авторизации
const modalLogin = document.querySelector('.modal__login')
const modalCloseBtnLogin = document.querySelector('.modal__close-btn__login')
const btnRegister = document.querySelector('.button__register') // кнопка регистрации

// Кнопки в секции Library Cards
const getCardBtnSignUp = document.querySelector('.getCard__btn__sign-up')
const getCardBtnSignIn = document.querySelector('.getCard__btn__log-in')

function profileModal() {
  btn.addEventListener('click', (e) => {
    if (localStorage.getItem('isAuth') != 'true' || localStorage.getItem('isRegister') != 'true') {
      loginNoAuth.classList.toggle('_active');
    } else if (localStorage.getItem('isAuth') == 'true') {
      loginWithAuth.classList.toggle('_active');
    }
  })
}
profileModal()

function openRegisterModal() {
  document.addEventListener('click', (e) => {
    if (e.target === loginRegisterNoAuth) {
      modal.classList.add('_active')
      modalRegister.classList.add('_active')
      closeProfileModalNoAuth()
    } else if (e.target === getCardBtnSignUp) {
      modal.classList.add('_active')
      modalRegister.classList.add('_active')
    }
  })
}
openRegisterModal()

function openLoginModal() {
  document.addEventListener('click', (e) => {
    if (e.target === loginLoginNoAuth) {
      modal.classList.add('_active')
      modalLogin.classList.add('_active')
      closeProfileModalNoAuth()
    } else if (e.target === getCardBtnSignIn) {
      modal.classList.add('_active')
      modalLogin.classList.add('_active')
    }
  })
}
openLoginModal()

function closeRegisterModal() {
  modalCloseBtnRegister.addEventListener('click', () => {
    modal.classList.remove('_active')
    modalRegister.classList.remove('_active')
  })
}
closeRegisterModal()

function closeLoginModal() {
  modalCloseBtnLogin.addEventListener('click', () => {
    modal.classList.remove('_active')
    modalLogin.classList.remove('_active')
  })
}
closeLoginModal()

function toggleRegisterLoginModals() {
  modal.addEventListener('click', (e) => {
    if (e.target === btnLogin) {
      modal.classList.remove('_active')
      modalRegister.classList.remove('_active')
      modal.classList.add('_active')
      modalLogin.classList.add('_active')
    } else if (e.target === btnRegister) {
      modal.classList.remove('_active')
      modalLogin.classList.remove('_active')
      modal.classList.add('_active')
      modalRegister.classList.add('_active')
    }
  })
}
toggleRegisterLoginModals()

function logOut() {
  loginRegisterWithAuth.addEventListener('click', (e) => {
    loginWithAuth.classList.remove('_active');
    localStorage.setItem('isAuth', false)
    location.reload()
  })
}

logOut()

function logIn() {
  const modalLoginForm = document.querySelector('.modal__login-form');
  const email = document.querySelector('#email-login')
  const password = document.querySelector('#password-login')
  const submitBtnLoginForm = modalLoginForm.querySelector('.form__btn');

  if (localStorage.getItem('isRegister') == 'true' && email != '' && password != '') {
    email.value = localStorage.getItem('email')
    password.value = localStorage.getItem('password')
    submitBtnLoginForm.addEventListener('click', () => {
      localStorage.setItem('isAuth', true)
    })
  }
}

logIn()

function closeProfileModalNoAuth() {
  loginRegisterNoAuth.addEventListener('click', () => {
    loginNoAuth.classList.remove('_active');
  })
  loginLoginNoAuth.addEventListener('click', () => {
    loginNoAuth.classList.remove('_active');
  })
}

closeProfileModalNoAuth()

function registerFunction() {
  const modalRegisterForm = document.querySelector('.modal__register-form');
  const firstName = modalRegisterForm.querySelector('#first-name')
  const lastName = modalRegisterForm.querySelector('#last-name')
  const email = modalRegisterForm.querySelector('#email-register')
  const password = modalRegisterForm.querySelector('#password-register')
  const submitBtnRegisterForm = modalRegisterForm.querySelector('.form__btn');

  min = Math.ceil(100000000);
  max = Math.floor(900000000);
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let cardNumber = randomNumber.toString(16).toUpperCase();
  for (let i = cardNumber.length; i < 9; i++) {
    cardNumber = 'F' + cardNumber;
  }

  submitBtnRegisterForm.addEventListener('click', (e) => {
    if (firstName.value != '' && lastName.value != '' && email.value != '' && password.value != '') {
      localStorage.setItem('firstName', `${firstName.value}`)
      localStorage.setItem('lastName', `${lastName.value}`)
      localStorage.setItem('email', `${email.value}`)
      localStorage.setItem('password', `${password.value}`)
      localStorage.setItem('isRegister', true)
      localStorage.setItem('isAuth', true)
      localStorage.setItem('cardNumber', cardNumber)
      modal.classList.remove('_active')
      modalRegister.classList.remove('_active')
    }
  })
}
registerFunction()

function changeProfileIcon() {
  const profileIcon = document.querySelector('.icon')

  if (localStorage.getItem('firstName') && localStorage.getItem('lastName') && localStorage.getItem('isAuth') == 'true') {
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    profileIcon.textContent = `${firstName.slice(0, 1)} ${lastName.slice(0, 1)}`
    profileIcon.setAttribute('title', `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`)
    profileIcon.classList.add('_active')
  }
}
changeProfileIcon()

function changeProfileCard() {
  const profileText = document.querySelector('.login-pop-up__with-auth__profile')

  if (localStorage.getItem('isAuth') == 'true' && localStorage.getItem('cardNumber')) {
    profileText.textContent = localStorage.getItem('cardNumber')
  }
}
changeProfileCard()

function showCardInfo() {
  const findCard = document.querySelector('.findCard')
  const template = document.createElement('template');
  const checkBtn = findCard.querySelector('.submit__btn')
  const inputName = findCard.querySelector('.findCard__input-name')
  const inputPassword = findCard.querySelector('.findCard__input-password')

  checkBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (localStorage.getItem('isAuth') != 'true' && localStorage.getItem('isRegister') == 'true' && inputName.value == localStorage.getItem('firstName') && inputPassword.value ==  localStorage.getItem('cardNumber')) {

      template.innerHTML = `
      <form class="findCard">
      <h3>Find your Library card</h3>
      <div class="findCard__container">
        <div class="input__container">
          <span>Brooklyn Public Library</span>
          <input class="findCard__input" type="text" value="${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}" required>
          <div class="prompt">
            В эти поля, Вы можете ввести только буквы, цифры и дефис.
          </div>
          <input class="findCard__input" type="text" value="${localStorage.getItem('cardNumber')}" required>
        </div>
        <div class="card__info">
          <div class="card__info__item">
            <span class="card__info__item-text">Visits</span>
            <span class="card__info__item-icon">
              <img src="./assets/svg/union.svg" alt="union">
            </span>
            <span class="card__info__item-value">23</span>
          </div>
          <div class="card__info__item">
            <span class="card__info__item-text">Bonuses</span>
            <span class="card__info__item-icon">
              <img src="./assets/svg/star.svg" alt="union">
            </span>
            <span class="card__info__item-value">1240</span>
          </div>
          <div class="card__info__item">
            <span class="card__info__item-text">Books</span>
            <span class="card__info__item-icon">
              <img src="./assets/svg/book.svg" alt="union">
            </span>
            <span class="card__info__item-value">2</span>
          </div>
        </div>
      </div>
    </form>
    `
      findCard.replaceWith(template.content)
    } if (localStorage.getItem('isAuth') != 'true' && localStorage.getItem('isRegister') == 'true' && inputName.value == localStorage.getItem('firstName') && inputPassword.value ==  localStorage.getItem('cardNumber')) {
      setTimeout(() => {
        template.innerHTML = `
        <form class="findCard">
        <h3>Find your Library card</h3>
        <div class="findCard__container">
          <div class="input__container">
            <span>Brooklyn Public Library</span>
            <input class="findCard__input" type="text" placeholder="Reader's name" required>
            <div class="prompt">
              В эти поля, Вы можете ввести только буквы, цифры и дефис.
            </div>
            <input class="findCard__input" type="text" placeholder="Card number" required>
          </div>
          <button class="submit__btn">Check the card</button>
        </div>
      </form>
      `
      findCard.replaceWith(template.content)
      location.reload()
      }, 10000);
    }
  })
}
showCardInfo()

// localStorage.removeItem('firstName')
// localStorage.removeItem('lastName')
// localStorage.removeItem('email')
// localStorage.removeItem('password')
// localStorage.removeItem('isRegister')
// localStorage.removeItem('isAuth')
// localStorage.removeItem('cardNumber')

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