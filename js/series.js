import { initSearchFeature } from './main.js';
import { initModalFeature } from './main.js';
initModalFeature();
const loaderOverlay = document.querySelector('.loader-overlay');
const errorMessageEl = document.querySelector('.error-message');
const seriesEl = document.querySelector('.movies');
const modalEl = document.querySelector('.modal');
const API_KEY = 'c99a5bc9-624b-419a-9b53-f34d728d4d85';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=POPULAR_SERIES&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?type=TV_SERIES&keyword=';
const API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
function showLoader() {
  loaderOverlay.style.display = 'flex';
  setTimeout(() => {
    document.body.classList.add('loading');
  }, 2000);
}
function hideLoader() {
  loaderOverlay.style.display = 'none';
  document.body.classList.remove('loading');
}
function showError(message) {
  console.log('showError called with message:', message);
  errorMessageEl.textContent = message;
  errorMessageEl.style.display = 'block';
  setTimeout(() => {
    errorMessageEl.style.display = 'none';
  }, 5000);
}
getSeries(API_URL_POPULAR);
async function getSeries(url, type = 'items') {
  showLoader();
  try {
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    });
    const respData = await resp.json();
    showSeries(respData, type);
  } catch (error) {
    showError(`Упс.. Возникла ошибка: ${error.message}`);
  } finally {
    hideLoader();
  }
}
function getClassByYear(year) {
  if (!year) {
    return '';
  }
  if (typeof year !== 'number') {
    year = parseInt(year, 10);
    if (isNaN(year)) {
      return '';
    }
  }
  if (year >= 2020) {
    return 'green';
  } else if (year > 2015) {
    return 'orange';
  } else {
    return 'red';
  }
}
function showSeries(data, type) {
  try {
    document.querySelector('.movies').innerHTML = '';
    data[type].forEach((series) => {
      const seriesElement = document.createElement('div');
      seriesElement.classList.add('movie');
      seriesElement.innerHTML = `
      <div class="movie__cover_inner">
        <img
          src="${series.posterUrlPreview}"
          class="movie__cover"
          alt="${series.nameRu}"
        />
        <div class="movie__cover_darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${series.nameRu}</div>
        <div class="movie__category">${series.genres
          .map((genre) => ` ${genre.genre}`)
          .join(', ')}</div>
          ${
            series.year
              ? `
              <div class="movie__year movie__year_${getClassByYear(
                series.year
              )}">
                ${series.year}
              </div>
            `
              : ''
          }
      </div>
    `;
      const seriesId = series.kinopoiskId || series.filmId;
      seriesElement.addEventListener('click', () => openModal(seriesId));
      seriesEl.appendChild(seriesElement);
    });
  } catch (error) {
    showError(`Упс.. Возникла ошибка: ${error.message}`);
  }
}
initSearchFeature(searchSeries);
async function getSeriesByKeyword(url, func, key) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': key,
    },
  });
  const respData = await resp.json();
  if (!respData || !respData.films || respData.films.length === 0) {
    showError('Фильмы по Вашему запросу не найдены');
    return;
  }
  func(respData, 'films');
}
function searchSeries() {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`;
      getSeriesByKeyword(apiSearchUrl, showSeries, API_KEY);
      searchInput.value = '';
    }
  });
}
async function openModal(id) {
  modalEl.innerHTML = '';
  const resp = await fetch(API_URL_DETAILS + id, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  modalEl.classList.add('modal__show');
  document.body.classList.add('stop-scrolling');
  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${respData.nameRu}</span>
        </h2>
       
    
      <ul class="modal__movie-info">
         ${
           respData.year
             ? `<li class="modal__movie-release-year">Год - ${respData.year}</li>`
             : ''
         }
        <li class="modal__movie-genre">Жанр - ${respData.genres.map(
          (el) => `<span>${el.genre}</span>`
        )}</li>
       ${
         respData.filmLength
           ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>`
           : ''
       }
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
        ${
          respData.description
            ? `<li class="modal__movie-overview">Описание - ${respData.description}</li>`
            : ''
        }
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `;
  const btnClose = document.querySelector('.modal__button-close');
  btnClose.addEventListener('click', () => closeModal());
}
function closeModal() {
  modalEl.classList.remove('modal__show');
  document.body.classList.remove('stop-scrolling');
}
window.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27 || e.keyCode === 13) {
    closeModal();
  }
});
