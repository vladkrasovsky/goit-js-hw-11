import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './js/pixabayAPI';
import { createMarkup } from './js/createMarkup';
import { refs } from './js/refs';

const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    Notify.failure('Enter query to search!');
    return;
  }

  pixabay.query = query;

  clearPage();

  try {
    const { hits: results, totalHits: total } = await pixabay.getPhotos();

    if (results.length === 0) {
      Notify.info(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }

    const markup = createMarkup(results);
    refs.list.insertAdjacentHTML('beforeend', markup);

    pixabay.calculateTotalPages(total);

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }

    Notify.success(`Hooray! We found ${total} images.`);
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!');
    clearPage();
  }
}

async function onLoadMore() {
  pixabay.incrementPage();

  if (!pixabay.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  try {
    const { hits: results } = await pixabay.getPhotos();

    const markup = createMarkup(results);
    refs.list.insertAdjacentHTML('beforeend', markup);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    const { height: headerHeight } = document
      .querySelector('.header')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2 - headerHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!');
    clearPage();
  }
}

function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
