const search = document.getElementById('search');
let query;
search.value.length > '0' ? query = search.value : query = 'cheetah';
const ID = 'h-JB_S_5wn16PF8uv5eRY9eWZlsPEzZk9vddRNpQjYo';

function changeValue() {
  query = search.value;
};

search.addEventListener('change', changeValue);
search.addEventListener('change', getData);

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

const clearBtn = document.querySelector('.clear');
const searchBtn = document.querySelector('.search');

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

const content = document.querySelector('.content-container');
const overlay = document.querySelector('.overlay');

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
