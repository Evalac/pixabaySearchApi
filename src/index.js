const { error, log } = require('console');
const { release } = require('process');
const res = '';
const axios = require('axios').default;
const BASE_URL = `https://pixabay.com/api/`;

const options = {
  key: `45910491-7a91b10438fcd735159f6d92e`,
  q: `cat`,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const refs = {
  formEl: document.querySelector('#search-form'),
  galarryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

function loadMore(evt) {}

function onSearch(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const inputValue = formData.get('searchQuery');
  const data = getSearchPixabay(inputValue);

  return data
    .then(data => {
      console.log(data);
      createMarkup([data]);
    })
    .catch(error => console.log(error))
    .finally();
}

async function getSearchPixabay(inputValue) {
  const response = await axios.get(
    `${BASE_URL}?key=45910491-7a91b10438fcd735159f6d92e&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  );
  if (response.ok) {
    throw new Error(response.status);
  }
  return response;
}

function createMarkup(data) {
  const markup = data.map(({ data: { hits } }) =>
    hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
      )
      .join('')
  );

  return (refs.galarryEl.innerHTML = markup);
}
