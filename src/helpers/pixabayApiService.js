const axios = require('axios').default;
const BASE_URL = `https://pixabay.com/api/`;

class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchForm = '';
  }

  async getSearchPixabay() {
    const response = await axios.get(
      `${BASE_URL}?key=45910491-7a91b10438fcd735159f6d92e&q=${this.searchForm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`
    );
    if (response.ok) {
      throw new Error(response.status);
    }
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(NewQuery) {
    this.searchForm = NewQuery;
  }

  get query() {
    return this.searchForm;
  }
}

export { PixabayApiService };
