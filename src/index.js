const axios = require('axios').default;
const BASE_URL = `https://pixabay.com/api/`;
import { createMarkup } from './helpers/createMarkup';

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
      createMarkup([data], refs.galarryEl);
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
