import { createMarkup } from './helpers/createMarkup';
import { PixabayApiService } from './helpers/pixabayApiService';

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

const pixabayApiService = new PixabayApiService();
console.log(pixabayApiService);

function onSearch(evt) {
  evt.preventDefault();
  clearContainer();

  const formData = new FormData(evt.currentTarget);
  pixabayApiService.query = formData.get('searchQuery');

  refs.loadMoreBtn.classList.add('hidden');
  pixabayApiService
    .getSearchPixabay()
    .then(data => {
      createMarkup([data], refs.galarryEl);
      refs.loadMoreBtn.classList.remove('hidden');
    })
    .catch(error => console.log(error));
}

function loadMore() {
  pixabayApiService.incrementPage();
  pixabayApiService.getSearchPixabay().then(data => {
    createMarkup([data], refs.galarryEl);
  });
}

function clearContainer(params) {
  refs.galarryEl.innerHTML = '';
}
