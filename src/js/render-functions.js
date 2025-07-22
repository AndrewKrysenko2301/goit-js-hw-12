import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.getElementById('gallery');
const loader = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery__item">
          <a href="${largeImageURL}" class="gallery__link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
          </a>
          <ul class="info">
            <li>
              <p>Likes</p>
              <span>${likes}</span>
            </li>
            <li>
              <p>Views</p>
              <span>${views}</span>
            </li>
            <li>
              <p>Comments</p>
              <span>${comments}</span>
            </li>
            <li>
              <p>Downloads</p>
              <span>${downloads}</span>
            </li>
          </ul>
        </li>
      `;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
