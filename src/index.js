import { createMarkup } from './helpers/createMarkup';
import { PixabayApiService } from './helpers/pixabayApiService';
import { scrollGallery } from './helpers/scrollGallery';
import { clearContainer } from './helpers/clearContainer';

import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  position: 'center-top',
  distance: '40px',
});

const refs = {
  formEl: document.querySelector('#search-form'),
  galarryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

const pixabayApiService = new PixabayApiService();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearch(evt) {
  evt.preventDefault();
  clearContainer(refs.galarryEl);

  const formData = new FormData(evt.currentTarget);
  pixabayApiService.query = formData.get('searchQuery');

  refs.loadMoreBtn.classList.add('hidden');
  pixabayApiService
    .getSearchPixabay()
    .then(data => {
      Notiflix.Notify.success(
        `Hooray! We found totalHits ${data.data.totalHits} images`
      );
      createMarkup([data], refs.galarryEl);
      refs.loadMoreBtn.classList.remove('hidden');
      lightbox.refresh();
    })
    .catch(error => console.log(error));
}

function loadMore() {
  pixabayApiService.incrementPage();
  pixabayApiService.getSearchPixabay().then(data => {
    createMarkup([data], refs.galarryEl);
    scrollGallery();
    lightbox.refresh();
  });
}
