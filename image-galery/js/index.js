let query = 'cats';
const ID = 'h-JB_S_5wn16PF8uv5eRY9eWZlsPEzZk9vddRNpQjYo';

async function getData(renderImages) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${ID}`;
  const res = await fetch(url);
  const data = await res.json();
  renderImages(data.results);
};

function renderImages(data) {
  const item = document.querySelector('.content-container');
  data.forEach(el => {
    const template = document.createElement('template');
    template.innerHTML = `<div class="content-container__item"><img src="${el.urls.small}" alt="img">`;
    item.appendChild(template.content);
  });
};
getData(renderImages);