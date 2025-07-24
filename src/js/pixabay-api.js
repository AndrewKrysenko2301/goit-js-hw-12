import axios from 'axios';

const API_KEY = '51333362-4829905c1402d27e64b07a684';
const BASE_URL = 'https://pixabay.com/api/';

const IMAGES_PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });

  return response.data;
}
