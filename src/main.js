import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import errorIcon from './img/error-icon.svg';

iziToast.settings({
  position: 'topRight',
  timeout: 5000,
});

const IMAGES_PER_PAGE = 15;

const form = document.getElementById('search-form');
const input = form.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.getElementById('load-more-btn');

document.addEventListener('DOMContentLoaded', () => hideLoadMoreButton());

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      iconUrl: errorIcon,
    });
    return;
  }

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        iconUrl: errorIcon,
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);

    if (totalHits > currentPage * IMAGES_PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    if (totalHits > currentPage * IMAGES_PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // Плавне прокручування після підвантаження
    const galleryItem = document.querySelector('.gallery__item');
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});
