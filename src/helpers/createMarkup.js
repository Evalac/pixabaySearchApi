function createMarkup(data, domEl) {
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
        }) => `<a href="${largeImageURL}" class="gallery__item"> 
        <div class="photo-card">
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
</div>  </a>`
      )
      .join('')
  );

  return domEl.insertAdjacentHTML('beforeend', markup);
}

export { createMarkup };
