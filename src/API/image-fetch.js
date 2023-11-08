function FetchImageApi(searchQuiry, page) {
  return fetch(
    `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${searchQuiry}&image_type=photo&orientation=horizontal&per_page=12&page=${page}&editors_choice=id,webformatURL,largeImageURL,tags`
  ).then(response => response.json());
}

const api = { FetchImageApi };
export default api;
