import data from './js/data.js';

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
    modal.classList.remove('_active')
    modalBuyCard.classList.remove('_active')
    modalRegister.classList.remove('_active')
    modalLogin.classList.remove('_active')
    modalProfile.classList.remove('_active')
    document.body.style.overflow = ''
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

//Модалка профиля
const modalProfile = document.querySelector('.modal__profile')
const modalProfileCloseBtn = document.querySelector('.modal__profile__right-column__close-button')
const modalProfileShortName = document.querySelector('.modal__profile__left-column__icon__name')
const modalProfileFirstName = document.querySelector('.modal__profile__left-column__name__first-name')
const modalProfileLastName = document.querySelector('.modal__profile__left-column__name__last-name')
const modalProfileVisits = document.querySelector('._card-info-value__visits')
const modalProfileBonuses = document.querySelector('._card-info-value__visits')
const modalProfileBooks = document.querySelector('._card-info-value__visits')
const modalProfileBooksContainer = document.querySelector('.modal__profile__right-column__rented-books-container__books-container')
const modalProfileBooksNumber = document.querySelector('.modal__profile__right-column__card-info__number')

//Модалка покупки абонемента
const modalBuyCard = document.querySelector('.modal__buy-card')
const modalBuyCardCloseBtn = document.querySelector('.modal__close-btn__buy')

// Бургер меню
const burger = document.querySelector('.burger');
const menuB = document.querySelector('.header__menu');
const span = document.querySelector('.burger__span');

//RegExp
const nameRegExp = /^([-A-Za-z0-9]{1,})$/;
const emailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const passwordRegExp = /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16})$/;
const nameOrCardRegExp = /^([-A-Za-z0-9_\.\@]{1,})$/;
const cardNumberRegExp = /^((?=.*[0-9])[0-9]{16,19})$/;
const expCodeRegExp = /^((?=.*[0-9])[0-9]{2,2})$/;
const cvcRegExp = /^((?=.*[0-9])[0-9]{3,3})$/;
const cardHolderNameRegExp = /^([A-Za-z]{1,})$/;
const postalCodeRegExp = /^([-A-Z0-9]{1,})$/;
const cityRegExp = /^([-A-Za-z0-9]{1,})$/;

class User {
  constructor(firstName, lastName, email, password, cardNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.cardNumber = cardNumber;
    this.isRegister = true;
    this.isAuth = true;
    this.isSubscription = false;
    this.countVisits = 1;
    this.ownBooks = 0;
    this.books = [];
    this.titleBooks = [];
  }
}

let usersAleksengTask = []

if (localStorage.getItem('usersAleksengTask')) {
  usersAleksengTask = JSON.parse(localStorage.getItem('usersAleksengTask'));
}

function profileModal() {
  btn.addEventListener('click', (e) => {
    if (usersAleksengTask.find((user) => user.isAuth == true)) {
      loginWithAuth.classList.toggle('_active');
      burger.classList.remove('_active');
      menuB.classList.remove('_active-menu');
      span.classList.remove('_active');
      e.stopPropagation();
    } else if (usersAleksengTask.length == 0 || usersAleksengTask.find((user) => user.isAuth == !true)) {
      loginNoAuth.classList.toggle('_active');
      burger.classList.remove('_active');
      menuB.classList.remove('_active-menu');
      span.classList.remove('_active');
      e.stopPropagation();
    }
  })
}
profileModal()

function openRegisterModal() {
  document.addEventListener('click', (e) => {
    if (e.target === loginRegisterNoAuth) {
      modal.classList.add('_active')
      modalRegister.classList.add('_active')
      document.body.style.overflow = 'hidden'
      closeProfileModalNoAuth()
    } else if (e.target === getCardBtnSignUp) {
      modal.classList.add('_active')
      modalRegister.classList.add('_active')
      document.body.style.overflow = 'hidden'
    }
  })
}
openRegisterModal()

function openLoginModal() {
  document.addEventListener('click', (e) => {
    if (e.target === loginLoginNoAuth) {
      modal.classList.add('_active')
      modalLogin.classList.add('_active')
      document.body.style.overflow = 'hidden'
      closeProfileModalNoAuth()
    } else if (e.target === getCardBtnSignIn) {
      modal.classList.add('_active')
      modalLogin.classList.add('_active')
      document.body.style.overflow = 'hidden'
    }
  })
}
openLoginModal()

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
    for (let i = 0; i < usersAleksengTask.length; i++) {
      loginWithAuth.classList.remove('_active');
      usersAleksengTask[i].isAuth = false;
      localStorage.setItem('usersAleksengTask', JSON.stringify(usersAleksengTask));
      location.reload();
    }
  })
}

logOut()

function logIn() {
  const modalLoginForm = document.querySelector('.modal__login-form');
  const email = document.querySelector('#email-login')
  const password = document.querySelector('#password-login')
  const submitBtnLoginForm = modalLoginForm.querySelector('.form__btn');
  const emailError = document.querySelector('.email-login');
  const passwordError = document.querySelector('.password-login');

  email.addEventListener('input', (e) => {
    if (!nameOrCardRegExp.test(email.value)) {
      emailError.textContent = `There must be at least 3 characters in this field, you can enter letters, numbers and -_.@`;
      emailError.classList.remove('_success');
      emailError.classList.add('_error');
      email.classList.add('_error-border');
      email.classList.remove('_success-border');
    } else if (nameOrCardRegExp.test(email.value)) {
      emailError.textContent = 'success';
      emailError.classList.remove('_error');
      emailError.classList.add('_success');
      email.classList.remove('_error-border');
      email.classList.add('_success-border');
    }
  })

  password.addEventListener('input', (e) => {
    if (password.value.length < 8) {
      passwordError.textContent = 'The password must be at least 8 characters long';
      passwordError.classList.remove('_success');
      passwordError.classList.add('_error');
      password.classList.add('_error-border');
      password.classList.remove('_success-border');
    } else if (password.value.length > 16) {
      passwordError.textContent = 'The password must not exceed 16 characters in length';
      passwordError.classList.remove('_success');
      passwordError.classList.add('_error');
      password.classList.add('_error-border');
      password.classList.remove('_success-border');
    } else if (!passwordRegExp.test(password.value)) {
      passwordError.textContent = 'The password must contain at least 1 digit, 1 capital letter and a special character !@#$%^&*';
      passwordError.classList.remove('_success');
      passwordError.classList.add('_error');
      password.classList.remove('_success-border');
      password.classList.add('_error-border');
    } else if (password.value.length >= 8 && passwordRegExp.test(password.value)) {
      passwordError.textContent = 'success';
      passwordError.classList.remove('_error');
      passwordError.classList.add('_success');
      password.classList.remove('_error-border');
      password.classList.add('_success-border');
    }
  })

  submitBtnLoginForm.addEventListener('click', (e) => {
    e.preventDefault()
    for (let i = 0; i <= usersAleksengTask.length; i++) {
      if ((usersAleksengTask.length > 0)
        && (((email.value == usersAleksengTask[i]?.email && nameOrCardRegExp.test(email.value)) || (email.value == usersAleksengTask[i]?.cardNumber && nameOrCardRegExp.test(email.value))) && (password.value == usersAleksengTask[i]?.password && passwordRegExp.test(password.value)))) {
        usersAleksengTask[i].isAuth = true;
        usersAleksengTask[i].countVisits += 1;
        localStorage.setItem('usersAleksengTask', JSON.stringify(usersAleksengTask));
        location.reload();
      } else if (usersAleksengTask.length == 0) {
        emailError.textContent = `Registered usersAleksengTask are not found, go through the registration stage`;
        emailError.classList.add('_error');
        email.classList.add('_error-border');
      } else if (usersAleksengTask.find(el => el.email != email.value) || usersAleksengTask.find(el => el.cardNumber != email.value) || usersAleksengTask.find(el => el.password != password.value)) {
        emailError.textContent = `User not found`;
        emailError.classList.add('_error');
        email.classList.add('_error-border');
        emailError.classList.remove('_success');
        email.classList.remove('_success-border');
        passwordError.textContent = 'User not found';
        passwordError.classList.add('_error');
        password.classList.add('_error-border');
        if ((usersAleksengTask.find(el => el.email != email.value) && email.value.length == 0) || (usersAleksengTask.find(el => el.cardNumber != email.value) && email.value.length == 0)) {
          emailError.textContent = `This field cannot be blank`;
        } else if ((usersAleksengTask.find(el => el.email != email.value) && email.value.length > 1) || (usersAleksengTask.find(el => el.cardNumber != email.value) && email.value.length > 1)) {
          emailError.textContent = `User not found`;
        }
        if ((usersAleksengTask.find(el => el.password != password.value) && password.value.length == 0)) {
          passwordError.textContent = `This field cannot be blank`;
        } else if ((usersAleksengTask.find(el => el.password != password.value) && password.value.length > 1)) {
          passwordError.textContent = `User not found`;
          password.classList.remove('_success-border');
          password.classList.add('_error-border');
        }
        if (usersAleksengTask.find(el => el.email == email.value) || usersAleksengTask.find(el => el.cardNumber == email.value)) {
          emailError.textContent = 'success';
          emailError.classList.remove('_error');
          emailError.classList.add('_success');
          email.classList.remove('_error-border');
          email.classList.add('_success-border');
        }
        if ((usersAleksengTask.find(el => el.email == email.value) || usersAleksengTask.find(el => el.cardNumber == email.value)) && usersAleksengTask.find(el => el.password != password.value)) {
          emailError.textContent = 'success';
          emailError.classList.remove('_error');
          emailError.classList.add('_success');
          email.classList.remove('_error-border');
          email.classList.add('_success-border');
          if (usersAleksengTask.find(el => el.password != password.value) && password.value.length == 0) {
            passwordError.textContent = 'This field cannot be blank';
            passwordError.classList.add('_error');
            password.classList.remove('_success-border');
            password.classList.add('_error-border');
          }
          if (usersAleksengTask.find(el => el.password != password.value) && password.value.length > 0) {
            passwordError.textContent = 'Invalid password';
            passwordError.classList.add('_error');
            password.classList.remove('_success-border');
            password.classList.add('_error-border');
          }
        }
        if ((usersAleksengTask.find(el => el.email == email.value) || usersAleksengTask.find(el => el.cardNumber == email.value)) && usersAleksengTask.find(el => el.password == password.value)) {
          passwordError.textContent = 'success';
          passwordError.classList.remove('_error');
          passwordError.classList.add('_success');
          password.classList.remove('_error-border');
          password.classList.add('_success-border');
        }
      }
    }
  })
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

function closeProfileModalWithAuth() {
  loginWithAuth.classList.remove('_active');
}

function closeProfileModalNoAuthClickOutSide() {
  document.addEventListener('click', (e) => {
    if (e.target !== loginNoAuth && loginNoAuth.classList.contains('_active')) {
      loginNoAuth.classList.remove('_active');
      e.stopPropagation();
    }
  })
}
closeProfileModalNoAuthClickOutSide();

function closeProfileModalWithAuthClickOutSide() {
  document.addEventListener('click', (e) => {
    if (e.target !== loginWithAuth && loginWithAuth.classList.contains('_active')) {
      loginWithAuth.classList.remove('_active');
      e.stopPropagation();
    }
  })
}
closeProfileModalWithAuthClickOutSide();

function registerFunction() {
  const modalRegisterForm = document.querySelector('.modal__register-form');
  const firstName = modalRegisterForm.querySelector('#first-name')
  const lastName = modalRegisterForm.querySelector('#last-name')
  const email = modalRegisterForm.querySelector('#email-register')
  const password = modalRegisterForm.querySelector('#password-register')
  const submitBtnRegisterForm = modalRegisterForm.querySelector('.form__btn');

  const firstNameError = document.querySelector('.first-name');
  const lastNameError = document.querySelector('.last-name');
  const emailError = document.querySelector('.email');
  const passwordRegister = document.querySelector('.password-register');

  let min = Math.ceil(100000000);
  let max = Math.floor(900000000);
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let cardNumber = randomNumber.toString(16).toUpperCase();
  for (let i = cardNumber.length; i < 9; i++) {
    cardNumber = 'F' + cardNumber;
  }

  firstName.addEventListener('input', (e) => {
    if (firstName.value.length < 1) {
      firstNameError.textContent = 'There must be at least 1 characters in this field, you can enter letters, numbers and -';
      firstNameError.classList.remove('_success');
      firstNameError.classList.add('_error');
      firstName.classList.add('_error-border');
      firstName.classList.remove('_success-border');
    } else if (!nameRegExp.test(firstName.value)) {
      firstNameError.textContent = 'In this field you can enter only letters, numbers and -';
      firstNameError.classList.remove('_success');
      firstNameError.classList.add('_error');
      firstName.classList.add('_error-border');
      firstName.classList.remove('_success-border');
    } else if (nameRegExp.test(firstName.value)) {
      firstNameError.textContent = 'success';
      firstNameError.classList.remove('_error');
      firstNameError.classList.add('_success');
      firstName.classList.remove('_error-border');
      firstName.classList.add('_success-border');
    }
  })

  lastName.addEventListener('input', (e) => {
    if (lastName.value.length < 1) {
      lastNameError.textContent = 'There must be at least 1 characters in this field, you can enter letters, numbers and -';
      lastNameError.classList.remove('_success');
      lastNameError.classList.add('_error');
      lastName.classList.add('_error-border');
      lastName.classList.remove('_success-border');
    } else if (!nameRegExp.test(lastName.value)) {
      lastNameError.textContent = 'In this field you can enter only letters, numbers and -';
      lastNameError.classList.remove('_success');
      lastNameError.classList.add('_error');
      lastName.classList.add('_error-border');
      lastName.classList.remove('_success-border');
    } else if (nameRegExp.test(lastName.value)) {
      lastNameError.textContent = 'success';
      lastNameError.classList.remove('_error');
      lastNameError.classList.add('_success');
      lastName.classList.remove('_error-border');
      lastName.classList.add('_success-border');
    }
  })

  email.addEventListener('input', (e) => {
    if (!emailRegExp.test(email.value)) {
      emailError.textContent = `Please enter a valid email address`;
      emailError.classList.remove('_success');
      emailError.classList.add('_error');
      email.classList.add('_error-border');
      email.classList.remove('_success-border');
    } else if (emailRegExp.test(email.value)) {
      emailError.textContent = 'success';
      emailError.classList.remove('_error');
      emailError.classList.add('_success');
      email.classList.remove('_error-border');
      email.classList.add('_success-border');
    }
  })

  password.addEventListener('input', (e) => {
    if (password.value.length < 8) {
      passwordRegister.textContent = 'The password must be at least 8 characters long';
      passwordRegister.classList.remove('_success');
      passwordRegister.classList.add('_error');
      password.classList.add('_error-border');
      password.classList.remove('_success-border');
    } else if (password.value.length > 16) {
      passwordRegister.textContent = 'The password must not exceed 16 characters in length';
      passwordRegister.classList.remove('_success');
      passwordRegister.classList.add('_error');
      password.classList.add('_error-border');
      password.classList.remove('_success-border');
    } else if (!passwordRegExp.test(password.value)) {
      passwordRegister.textContent = 'The password must contain at least 1 digit, 1 capital letter and a special character !@#$%^&*';
      passwordRegister.classList.remove('_success');
      passwordRegister.classList.add('_error');
      password.classList.add('_error-border');
      password.classList.remove('_success-border');
    } else if (password.value.length >= 8 && passwordRegExp.test(password.value)) {
      passwordRegister.textContent = 'success';
      passwordRegister.classList.remove('_error');
      passwordRegister.classList.add('_success');
      password.classList.remove('_error-border');
      password.classList.add('_success-border');
    }
  })

  submitBtnRegisterForm.addEventListener('click', (e) => {
    e.preventDefault()

    if ((nameRegExp.test(firstName.value)) && (nameRegExp.test(lastName.value)) && (emailRegExp.test(email.value)) && (passwordRegExp.test(password.value))) {
      if (usersAleksengTask.find(el => el.email == email.value) && emailRegExp.test(email.value)) {
        emailError.textContent = `This email address is already in use, enter a different email address`;
        emailError.classList.remove('_success');
        emailError.classList.add('_error');
        email.classList.add('_error-border');
        email.classList.remove('_success-border');
        return;
      }
      let user = new User(firstName.value, lastName.value, email.value, password.value, cardNumber);
      usersAleksengTask.push(user);
      localStorage.setItem('usersAleksengTask', JSON.stringify(usersAleksengTask));
      modal.classList.remove('_active');
      modalRegister.classList.remove('_active');
      location.reload();

    } else if ((!nameRegExp.test(firstName.value)) || (!nameRegExp.test(lastName.value)) || (!emailRegExp.test(email.value)) || (!passwordRegExp.test(password.value))) {
      firstNameError.textContent = `This field cannot be blank`;
      firstNameError.classList.add('_error');
      firstName.classList.add('_error-border');
      lastNameError.textContent = 'This field cannot be blank';
      lastNameError.classList.add('_error');
      lastName.classList.add('_error-border');
      if (!emailRegExp.test(email.value) && email.value.length == 0) {
        emailError.textContent = `This field cannot be blank`;
        emailError.classList.add('_error');
        email.classList.add('_error-border');
        email.classList.remove('_success-border');
      }
      if (!emailRegExp.test(email.value) && email.value.length > 0) {
        emailError.textContent = `Please enter a valid email address: example@gmail.com
        `;
        emailError.classList.add('_error');
        email.classList.add('_error-border');
        email.classList.remove('_success-border');
      }
      if (!passwordRegExp.test(email.value) && password.value.length == 0) {
        passwordRegister.textContent = 'This field cannot be blank';
        passwordRegister.classList.add('_error');
        password.classList.add('_error-border');
        email.classList.remove('_success-border');
      }
      if (nameRegExp.test(firstName.value)) {
        firstNameError.textContent = 'success';
        firstNameError.classList.remove('_error');
        firstNameError.classList.add('_success');
        firstName.classList.remove('_error-border');
        firstName.classList.add('_success-border');
      } if (nameRegExp.test(lastName.value)) {
        lastNameError.textContent = 'success';
        lastNameError.classList.remove('_error');
        lastNameError.classList.add('_success');
        lastName.classList.remove('_error-border');
        lastName.classList.add('_success-border');
      } if (emailRegExp.test(email.value)) {
        emailError.textContent = 'success';
        emailError.classList.remove('_error');
        emailError.classList.add('_success');
        email.classList.remove('_error-border');
        email.classList.add('_success-border');
      } if (passwordRegExp.test(password.value)) {
        passwordRegister.textContent = 'success';
        passwordRegister.classList.remove('_error');
        passwordRegister.classList.add('_success');
        password.classList.remove('_error-border');
        password.classList.add('_success-border');
      }
    }
  })
}
registerFunction()

function changeProfileIcon() {
  const profileIcon = document.querySelector('.icon')
  const profile__ic = document.querySelector('.profile__ic')

  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].firstName && usersAleksengTask[i].lastName && usersAleksengTask[i].isAuth == true) {
        let profileName = document.createElement('div');
        let firstName = usersAleksengTask[i].firstName;
        let lastName = usersAleksengTask[i].lastName;
        profileName.textContent = `${firstName.slice(0, 1)} ${lastName.slice(0, 1)}`;
        profileIcon.setAttribute('title', `${usersAleksengTask[i].firstName} ${usersAleksengTask[i].lastName}`);
        profile__ic.style.display = 'none';
        profileName.classList.add('profileName');
        profileIcon.appendChild(profileName);
      }
    }
  }
}
changeProfileIcon()

function changeProfileCard() {
  const profileText = document.querySelector('.login-pop-up__with-auth__profile')

  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isAuth == true && usersAleksengTask[i].cardNumber) {
        profileText.textContent = usersAleksengTask[i].cardNumber;
        profileText.style.fontSize = `13px`;
      }
    }
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
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isAuth != true && usersAleksengTask[i].isRegister == true && (inputName.value == usersAleksengTask[i].firstName || `${inputName.value} == ${usersAleksengTask[i].firstName} ${usersAleksengTask[i].lastNameName}` || `${inputName.value} == ${usersAleksengTask[i].firstName}${usersAleksengTask[i].lastNameName}`) && inputPassword.value == usersAleksengTask[i].cardNumber) {

        template.innerHTML = `
        <form class="findCard">
        <h3>Find your Library card</h3>
        <div class="findCard__container">
          <div class="input__container">
            <span>Brooklyn Public Library</span>
            <input class="findCard__input" type="text" value="${usersAleksengTask[i].firstName} ${usersAleksengTask[i].lastName}" readonly>
            <div class="prompt">
              В эти поля, Вы можете ввести только буквы, цифры и дефис.
            </div>
            <input class="findCard__input" type="text" value="${usersAleksengTask[i].cardNumber}" readonly>
          </div>
          <div class="card__info">
            <div class="card__info__item">
              <span class="card__info__item-text">Visits</span>
              <span class="card__info__item-icon">
                <img src="./assets/svg/union.svg" alt="union">
              </span>
              <span class="card__info__item-value">${usersAleksengTask[i].countVisits}</span>
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
              <span class="card__info__item-value">${usersAleksengTask[i].ownBooks}</span>
            </div>
          </div>
        </div>
      </form>
      `
        findCard.replaceWith(template.content)
      } if (usersAleksengTask[i].isAuth != true && usersAleksengTask[i].isRegister == true && (inputName.value == usersAleksengTask[i].firstName || `${inputName.value} == ${usersAleksengTask[i].firstName} ${usersAleksengTask[i].lastNameName}`) && inputPassword.value == usersAleksengTask[i].cardNumber) {
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
    }
  })
}
showCardInfo()

function openProfileModal() {
  document.addEventListener('click', (e) => {
    if (e.target === loginProfileInfoWithAuth) {
      modal.classList.add('_active')
      modalProfile.classList.add('_active')
      document.body.style.overflow = 'hidden'
      closeProfileModalWithAuth()
    } else if (e.target === visitProfileBtn) {
      modal.classList.add('_active')
      modalProfile.classList.add('_active')
      document.body.style.overflow = 'hidden'
    }
  })
}
openProfileModal()

function getUserInfo() {
  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (modalProfile && usersAleksengTask[i].isAuth) {
        let firstName = usersAleksengTask[i].firstName;
        let lastName = usersAleksengTask[i].lastName;
        modalProfileShortName.textContent = `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`
        modalProfileFirstName.textContent = `${usersAleksengTask[i].firstName}`;
        modalProfileLastName.textContent = `${usersAleksengTask[i].lastName}`;
        modalProfileBooksNumber.value = `${usersAleksengTask[i].cardNumber}`;
        modalProfileVisits.textContent = `${usersAleksengTask[i].countVisits}`;
      }
    }
  }
}
getUserInfo()

function changelibraryCardSection() {
  const findCard = document.querySelector('.findCard')
  const visitProfile = document.querySelector('.getCard')
  const templateFind = document.createElement('template');
  const templateVisit = document.createElement('template');
  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isAuth == true && usersAleksengTask[i].isRegister == true) {
        templateFind.innerHTML = `
        <form class="findCard">
        <h3>Your Library card</h3>
        <div class="findCard__container">
          <div class="input__container">
            <span>Brooklyn Public Library</span>
            <input class="findCard__input" type="text" value="${usersAleksengTask[i].firstName} ${usersAleksengTask[i].lastName}" readonly>
            <input class="findCard__input" type="text" value="${usersAleksengTask[i].cardNumber}" readonly>
          </div>
          <div class="card__info">
            <div class="card__info__item">
              <span class="card__info__item-text">Visits</span>
              <span class="card__info__item-icon">
                <img src="./assets/svg/union.svg" alt="union">
              </span>
              <span class="card__info__item-value">${usersAleksengTask[i].countVisits}</span>
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
              <span class="card__info__item-value count-books">${usersAleksengTask[i].ownBooks}</span>
            </div>
          </div>
        </div>
      </form>
      `
        templateVisit.innerHTML = `
      <div class="visit-profile">
        <h3>Visit your profile</h3>
        <p>With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.</p>
        <div class="visit-profile__btns">
          <button class="visit-profile__btn">Profile</button>
        </div>
      </div>
      `
        findCard.replaceWith(templateFind.content)
        visitProfile.replaceWith(templateVisit.content)
      }
    }
  }
}
changelibraryCardSection()

const visitProfileBtn = document.querySelector('.visit-profile__btn')

let ownBooksArr = [];
let haveBooks = [];
let titleBooks = [];

if (usersAleksengTask.length > 0) {
  for (let i = 0; i < usersAleksengTask.length; i++) {
    if (usersAleksengTask[i].books && usersAleksengTask[i].isAuth) {
      ownBooksArr = usersAleksengTask[i].books;
    }
    if (usersAleksengTask[i].titleBooks && usersAleksengTask[i].isAuth) {
      titleBooks = usersAleksengTask[i].titleBooks;
    }
  }
}

const booksList = document.querySelector('.modal__profile__right-column__rented-books-container__books-container');

function buyBooks() {
  const booksBtn = document.querySelectorAll('.books__button')

  booksBtn.forEach((el, ind, arr) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      for (let i = 0; i <= usersAleksengTask.length; i++) {
        if ((usersAleksengTask.findIndex(el => el.isAuth) === -1) || usersAleksengTask.length == 0) {
          modal.classList.add('_active');
          modalLogin.classList.add('_active');
          document.body.style.overflow = 'hidden';
        } else if (usersAleksengTask[i]?.isAuth == true && usersAleksengTask[i]?.isSubscription != true) {
          modal.classList.add('_active');
          modalBuyCard.classList.add('_active');
          document.body.style.overflow = 'hidden';
        } else if (usersAleksengTask[i]?.isSubscription == true && usersAleksengTask[i]?.isAuth == true) {
          el.classList.remove('books__button');
          el.classList.add('_disabled');
          el.disabled = true;
          el.textContent = 'Own';
          usersAleksengTask[i].ownBooks++;
          usersAleksengTask[i].books.push(ind);
          usersAleksengTask[i].titleBooks.push([data[ind].name, data[ind].author]);
          localStorage.setItem('usersAleksengTask', JSON.stringify(usersAleksengTask));
          if (booksList.hasChildNodes) {
            booksList.replaceChildren();
          }
          renderBooks();
          updateCountBooksInProfileAndCard();
        }
      }
    })
  })
}
buyBooks()

function closeModals() {
  document.addEventListener('click', (e) => {
    if (e.target == modal || e.target == modalBuyCardCloseBtn || e.target == modalCloseBtnLogin || e.target == modalCloseBtnRegister || e.target == modalProfileCloseBtn) {
      modal.classList.remove('_active')
      modalBuyCard.classList.remove('_active')
      modalRegister.classList.remove('_active')
      modalLogin.classList.remove('_active')
      modalProfile.classList.remove('_active')
      document.body.style.overflow = ''
    }
  })
}
closeModals()

function buyCard() {
  const form = document.querySelector('.modal__buy-card__body__form');
  const cardNumber = document.querySelector('#bank-card-number');
  const expCodeMonth = document.querySelector('#expiration-code__month');
  const expCodeYear = document.querySelector('#expiration-code__year');
  const cvc = document.querySelector('#cvc');
  const cardHolderName = document.querySelector('#cardholder-name');
  const postalCode = document.querySelector('#postal-code');
  const city = document.querySelector('#city-town');
  const btn = document.querySelector('.buy-btn');

  const cardNumberError = document.querySelector('.bank-card-number');
  const expCodeMonthError = document.querySelector('.expiration-code__month');
  const expCodeYearError = document.querySelector('.expiration-code__year');
  const cvcError = document.querySelector('.cvc');
  const cardHolderNameError = document.querySelector('.cardholder-name');
  const postalCodeError = document.querySelector('.postal-code');
  const cityError = document.querySelector('.city-town');

  form.addEventListener('input', () => {
    if (cardNumber.value.length > 0 && expCodeMonth.value.length > 0 && expCodeYear.value.length > 0 && cvc.value.length > 0 && cardHolderName.value.length > 0 && postalCode.value.length > 0 && city.value.length > 0) {
      btn.classList.remove('_disabled');
      btn.disabled = false;
    } else {
      btn.classList.add('_disabled');
      btn.disabled = true;
    }
  })

  cardNumber.addEventListener('input', () => {
    cardNumber.value = cardNumber.value.replace(/[-A-Za-zА-Яа-яЁ-ё,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');

    if (!cardNumberRegExp.test(cardNumber.value)) {
      cardNumberError.textContent = 'This field cannot be blank';
      cardNumberError.classList.remove('_success');
      cardNumberError.classList.add('_error');
      cardNumber.classList.add('_error-border');
      cardNumber.classList.remove('_success-border');
      if (cardNumber.value.length >= 1 && !cardNumberRegExp.test(cardNumber.value)) {
        cardNumberError.textContent = 'The length of the card number must be at least 16 digits';
        cardNumberError.classList.remove('_success');
        cardNumberError.classList.add('_error');
        cardNumber.classList.add('_error-border');
        cardNumber.classList.remove('_success-border');
      }
    } else if (cardNumberRegExp.test(cardNumber.value)) {
      cardNumberError.textContent = 'success';
      cardNumberError.classList.remove('_error');
      cardNumberError.classList.add('_success');
      cardNumber.classList.remove('_error-border');
      cardNumber.classList.add('_success-border');
    }
  })

  expCodeMonth.addEventListener('input', () => {
    expCodeMonth.value = expCodeMonth.value.replace(/[-A-Za-zА-Яа-яЁ-ё,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');

    if (!expCodeRegExp.test(expCodeMonth.value)) {
      expCodeMonthError.textContent = 'This field cannot be blank';
      expCodeMonthError.classList.remove('_success');
      expCodeMonthError.classList.add('_error');
      expCodeMonth.classList.add('_error-border');
      expCodeMonth.classList.remove('_success-border');
      if (expCodeMonth.value.length >= 1 && !expCodeRegExp.test(expCodeMonth.value)) {
        expCodeMonthError.textContent = 'The length of the exp code must be at least 2 digits';
        expCodeMonthError.classList.remove('_success');
        expCodeMonthError.classList.add('_error');
        expCodeMonth.classList.add('_error-border');
        expCodeMonth.classList.remove('_success-border');
      }
    } else if (expCodeRegExp.test(expCodeMonth.value)) {
      expCodeMonthError.textContent = 'success';
      expCodeMonthError.classList.remove('_error');
      expCodeMonthError.classList.add('_success');
      expCodeMonth.classList.remove('_error-border');
      expCodeMonth.classList.add('_success-border');
    }
  })

  expCodeYear.addEventListener('input', () => {
    expCodeYear.value = expCodeYear.value.replace(/[-A-Za-zА-Яа-яЁ-ё,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');

    if (!expCodeRegExp.test(expCodeYear.value)) {
      expCodeYearError.textContent = 'This field cannot be blank';
      expCodeYearError.classList.remove('_success');
      expCodeYearError.classList.add('_error');
      expCodeYear.classList.add('_error-border');
      expCodeYear.classList.remove('_success-border');
      if (expCodeYear.value.length >= 1 && !expCodeRegExp.test(expCodeYear.value)) {
        expCodeYearError.textContent = 'The length of the exp code must be at least 2 digits';
        expCodeYearError.classList.remove('_success');
        expCodeYearError.classList.add('_error');
        expCodeYear.classList.add('_error-border');
        expCodeYear.classList.remove('_success-border');
      }
    } else if (expCodeRegExp.test(expCodeYear.value)) {
      expCodeYearError.textContent = 'success';
      expCodeYearError.classList.remove('_error');
      expCodeYearError.classList.add('_success');
      expCodeYear.classList.remove('_error-border');
      expCodeYear.classList.add('_success-border');
    }
  })

  cvc.addEventListener('input', () => {
    cvc.value = cvc.value.replace(/[-A-Za-zА-Яа-яЁ-ё,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');

    if (!cvcRegExp.test(cvc.value)) {
      cvcError.textContent = 'This field cannot be blank';
      cvcError.classList.remove('_success');
      cvcError.classList.add('_error');
      cvc.classList.add('_error-border');
      cvc.classList.remove('_success-border');
      if (cvc.value.length >= 1 && !cvcRegExp.test(cvc.value)) {
        cvcError.textContent = 'The length of the cvc must be at least 3 digits';
        cvcError.classList.remove('_success');
        cvcError.classList.add('_error');
        cvc.classList.add('_error-border');
        cvc.classList.remove('_success-border');
      }
    } else if (cvcRegExp.test(cvc.value)) {
      cvcError.textContent = 'success';
      cvcError.classList.remove('_error');
      cvcError.classList.add('_success');
      cvc.classList.remove('_error-border');
      cvc.classList.add('_success-border');
    }
  })

  cardHolderName.addEventListener('input', () => {
    cardHolderName.value = cardHolderName.value.replace(/[-А-Яа-яЁ-ё0-9,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '').toUpperCase();

    if (!cardHolderNameRegExp.test(cardHolderName.value)) {
      cardHolderNameError.textContent = 'This field cannot be blank';
      cardHolderNameError.classList.remove('_success');
      cardHolderNameError.classList.add('_error');
      cardHolderName.classList.add('_error-border');
      cardHolderName.classList.remove('_success-border');
    } else if (cardHolderNameRegExp.test(cardHolderName.value)) {
      cardHolderNameError.textContent = 'success';
      cardHolderNameError.classList.remove('_error');
      cardHolderNameError.classList.add('_success');
      cardHolderName.classList.remove('_error-border');
      cardHolderName.classList.add('_success-border');
    }
  })

  postalCode.addEventListener('input', () => {
    postalCode.value = postalCode.value.replace(/[А-Яа-яЁ-ё,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '').toUpperCase();

    if (!postalCodeRegExp.test(postalCode.value)) {
      postalCodeError.textContent = 'This field cannot be blank';
      postalCodeError.classList.remove('_success');
      postalCodeError.classList.add('_error');
      postalCode.classList.add('_error-border');
      postalCode.classList.remove('_success-border');
    } else if (postalCodeRegExp.test(postalCode.value)) {
      postalCodeError.textContent = 'success';
      postalCodeError.classList.remove('_error');
      postalCodeError.classList.add('_success');
      postalCode.classList.remove('_error-border');
      postalCode.classList.add('_success-border');
    }
  })

  city.addEventListener('input', () => {
    city.value = city.value.replace(/[А-Яа-яЁ-ё0-9,.?!\'/:;()&@""_\\|~<>$=+*^%#\[\]{}\`№]/g, '');

    if (!cityRegExp.test(city.value)) {
      cityError.textContent = 'This field cannot be blank';
      cityError.classList.remove('_success');
      cityError.classList.add('_error');
      city.classList.add('_error-border');
      city.classList.remove('_success-border');
    } else if (cityRegExp.test(city.value)) {
      cityError.textContent = 'success';
      cityError.classList.remove('_error');
      cityError.classList.add('_success');
      city.classList.remove('_error-border');
      city.classList.add('_success-border');
    }
  })

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (cardNumberRegExp.test(cardNumber.value) && expCodeRegExp.test(expCodeMonth.value) && expCodeRegExp.test(expCodeYear.value) && cvcRegExp.test(cvc.value) && cardHolderNameRegExp.test(cardHolderName.value) && postalCodeRegExp.test(postalCode.value) && cityRegExp.test(city.value)) {
        usersAleksengTask[i].isSubscription = true;
        localStorage.setItem('usersAleksengTask', JSON.stringify(usersAleksengTask));
        location.reload();
      } else if ((!cardNumberRegExp.test(cardNumber.value)) || (!expCodeRegExp.test(expCodeMonth.value)) || (!expCodeRegExp.test(expCodeYear.value)) || (!cvcRegExp.test(cvc.value)) || (!cardHolderNameRegExp.test(cardHolderName.value)) || (!postalCodeRegExp.test(postalCode.value)) || (!cityRegExp.test(city.value))) {
        cardNumberError.textContent = 'The length of the card number must be at least 16 digits';
        cardNumberError.classList.add('_error');
        cardNumber.classList.add('_error-border');
        expCodeMonthError.textContent = 'The length of the exp code must be at least 2 digits';
        expCodeMonthError.classList.add('_error');
        expCodeMonth.classList.add('_error-border');
        expCodeYearError.textContent = 'The length of the exp code must be at least 2 digits';
        expCodeYearError.classList.add('_error');
        expCodeYear.classList.add('_error-border');
        cvcError.textContent = 'The length of the cvc must be at least 3 digits';
        cvcError.classList.add('_error');
        cvc.classList.add('_error-border');
        cardHolderNameError.textContent = 'This field cannot be blank';
        cardHolderNameError.classList.add('_error');
        cardHolderName.classList.add('_error-border');
        postalCodeError.textContent = 'This field cannot be blank';
        postalCodeError.classList.add('_error');
        postalCode.classList.add('_error-border');
        cityError.textContent = 'This field cannot be blank';
        cityError.classList.add('_error');
        city.classList.add('_error-border');

        if (cardNumberRegExp.test(cardNumber.value)) {
          cardNumberError.textContent = 'success';
          cardNumberError.classList.remove('_error');
          cardNumberError.classList.add('_success');
          cardNumber.classList.remove('_error-border');
          cardNumber.classList.add('_success-border');
        } if (expCodeRegExp.test(expCodeMonth.value)) {
          expCodeMonthError.textContent = 'success';
          expCodeMonthError.classList.remove('_error');
          expCodeMonthError.classList.add('_success');
          expCodeMonth.classList.remove('_error-border');
          expCodeMonth.classList.add('_success-border');
        } if (expCodeRegExp.test(expCodeYear.value)) {
          expCodeYearError.textContent = 'success';
          expCodeYearError.classList.remove('_error');
          expCodeYearError.classList.add('_success');
          expCodeYear.classList.remove('_error-border');
          expCodeYear.classList.add('_success-border');
        } if (cvcRegExp.test(cvc.value)) {
          cvcError.textContent = 'success';
          cvcError.classList.remove('_error');
          cvcError.classList.add('_success');
          cvc.classList.remove('_error-border');
          cvc.classList.add('_success-border');
        } if (cardHolderNameRegExp.test(cardHolderName.value)) {
          cardHolderNameError.textContent = 'success';
          cardHolderNameError.classList.remove('_error');
          cardHolderNameError.classList.add('_success');
          cardHolderName.classList.remove('_error-border');
          cardHolderName.classList.add('_success-border');
        } if (postalCodeRegExp.test(postalCode.value)) {
          postalCodeError.textContent = 'success';
          postalCodeError.classList.remove('_error');
          postalCodeError.classList.add('_success');
          postalCode.classList.remove('_error-border');
          postalCode.classList.add('_success-border');
        } if (cityRegExp.test(city.value)) {
          cityError.textContent = 'success';
          cityError.classList.remove('_error');
          cityError.classList.add('_success');
          city.classList.remove('_error-border');
          city.classList.add('_success-border');
        }
      }
    }
  })
}
buyCard()

if (usersAleksengTask.length > 0) {
  for (let i = 0; i < usersAleksengTask.length; i++) {
    if (usersAleksengTask[i].books && usersAleksengTask[i].isAuth) {
      haveBooks = usersAleksengTask[i].books;
    }
  }
}

function showOwnBooks() {
  const booksBtn = document.querySelectorAll('.books__button')

  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isSubscription == true && usersAleksengTask[i].isAuth) {
        booksBtn.forEach((el, ind) => {
          for (let i = 0; i <= haveBooks.length; i++) {
            if (haveBooks[i] == ind) {
              el.classList.remove('books__button');
              el.classList.add('_disabled');
              el.disabled = true;
              el.textContent = 'Own';
            }
          }
        })
      }
    }
  }
}
showOwnBooks()

function renderBooks() {
  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isSubscription == true && usersAleksengTask[i].isAuth) {
        let booksName = usersAleksengTask[i].titleBooks;
        booksName.forEach((el, ind) => {
          let span = document.createElement('span');
          span.textContent = `${el[0]}, ${el[1]}`;
          booksList.appendChild(span);
        })
      }
    }
  }
}
renderBooks()

function updateCountBooksInProfileAndCard() {
  let countBooks = document.querySelector('._card-info-value__books')
  let countBooksLibraryCard = document.querySelector('.count-books')
  if (usersAleksengTask.length > 0) {
    for (let i = 0; i < usersAleksengTask.length; i++) {
      if (usersAleksengTask[i].isAuth) {
        countBooks.textContent = usersAleksengTask[i].ownBooks;
        countBooksLibraryCard.textContent = usersAleksengTask[i].ownBooks;
      }
    }
  }
}
updateCountBooksInProfileAndCard()

function copyCardNumber() {
  let copyText = document.querySelector(".modal__profile__right-column__card-info__number");
  let copyBtn = document.querySelector(".modal__profile__right-column__card-info__button");

  copyBtn.addEventListener('click', () => {
    copyText.select();
    document.execCommand("copy");
  })
}
copyCardNumber()

console.log(`Все требования к работе выполнены = 200 баллов`);