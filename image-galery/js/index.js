const search = document.getElementById('search');
const clearBtn = document.querySelector('.clear');
const searchBtn = document.querySelector('.search');
const content = document.querySelector('.content-container');
const overlay = document.querySelector('.overlay');
const theme = document.querySelector('.theme');
const searchForm = document.querySelector('.search-container');

let query = 'cheetah';
const ID = 'h-JB_S_5wn16PF8uv5eRY9eWZlsPEzZk9vddRNpQjYo';

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (search.value.length != '0') {
    query = search.value;
    getData();
  }
});

async function getData() {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${ID}`;
  const res = await fetch(url);
  const data = await res.json();
  renderImages(data.results);
};

function renderImages(data) {
  const item = document.querySelector('.content-container');
  if (search.value.length > '0') { item.replaceChildren() };
  data.map(el => {
    const template = document.createElement('template');
    template.innerHTML = `<div class="content-container__item"><img src="${el.urls.regular}" alt="img">`;
    item.appendChild(template.content);
  });
  load();
};
getData();

clearBtn.addEventListener('click', clearInput);

search.addEventListener('input', function () {
  if (search.value.length > '0') {
    clearBtn.classList.add('_show');
  } else {
    clearBtn.classList.remove('_show');
  }
});

function clearInput() {
  search.value = '';
  clearBtn.classList.remove('_show');
};

function load() {
  const images = content.querySelectorAll('div');
  images.forEach((el) => {
    el.addEventListener('click', (e) => {
      el.classList.toggle('_show');
      overlay.classList.toggle('_active');
      document.body.classList.toggle('_block');
    });
  });
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

if (localStorage.getItem('isDark') == 'false') {
  document.documentElement.style.setProperty('--main-color', 'white');
  document.documentElement.style.setProperty('--text-color', 'black');
  document.documentElement.style.setProperty('--svg-color', 'black');
  document.documentElement.style.setProperty('--shadow-color', 'black');
  theme.classList.remove('_active');
} else {
  document.documentElement.style.setProperty('--main-color', 'black');
  document.documentElement.style.setProperty('--text-color', 'orange');
  document.documentElement.style.setProperty('--svg-color', 'orange');
  document.documentElement.style.setProperty('--shadow-color', 'orange');
  theme.classList.add('_active');
}

theme.addEventListener('click', () => {
  if (localStorage.getItem('isDark') == 'false') {
    document.documentElement.style.setProperty('--main-color', 'black');
    document.documentElement.style.setProperty('--text-color', 'orange');
    document.documentElement.style.setProperty('--svg-color', 'orange');
    document.documentElement.style.setProperty('--shadow-color', 'orange');
    localStorage.setItem('isDark', true);
    theme.classList.add('_active');
  }
  else {
    document.documentElement.style.setProperty('--main-color', 'white');
    document.documentElement.style.setProperty('--text-color', 'black');
    document.documentElement.style.setProperty('--svg-color', 'black');
    document.documentElement.style.setProperty('--shadow-color', 'black');
    localStorage.setItem('isDark', false);
    theme.classList.remove('_active');
  }
});