import { initModalFeature } from './main.js';
import { getVideoByKeyword } from './services.js';
import { initSearchFeature } from './main.js';

const API_KEY = 'c99a5bc9-624b-419a-9b53-f34d728d4d85';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?type=FILM&keyword=';
const API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

getSeries(API_URL_POPULAR);

async function getSeries(url) {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  console.log(respData)
  showFilms(respData);
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
}

function showFilms(data) {
  const filmsEl = document.querySelector('.movies');

  filmsEl.innerHTML = '';

  data.items.forEach((film) => {
    const filmElement = document.createElement('div');
    filmElement.classList.add('movie');
    filmElement.innerHTML = `
      <div class="movie__cover_inner">
        <img
          src="${film.posterUrlPreview}"
          class="movie__cover"
          alt="${film.nameRu}"
        />
        <div class="movie__cover_darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${film.nameRu}</div>
        <div class="movie__category">${film.genres
          .map((genre) => ` ${genre.genre}`)
          .join(', ')}</div>
          ${
            film.year &&
            `
              <div class="movie__year movie__year_${getClassByYear(
                film.year
              )}" style="background-color: gray;">
                ${film.year}
              </div>
            `
          }
      </div>
    `;
    // const filmsId = film.kinopoiskId || film.filmId;
    filmElement.addEventListener('click', ()=> openModal(film.kinopoiskId))

    filmsEl.appendChild(filmElement);
  });
}

// const form = document.querySelector('form');
// const search = document.querySelector('.header__search');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
//   if (search.value) {
//     getSeries(apiSearchUrl, 'films');
//     search.value = '';
//   }
// });

//Поиск по ключевому слову


initSearchFeature(searchMovie);

function searchMovie () {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        const searchUrl = `${API_URL_SEARCH}${searchInput.value}`;
        getVideoByKeyword(searchUrl, showVideoByKeyword, API_KEY);
        searchInput.value = '';
    }
  });
}

function showVideoByKeyword(data) {
  const filmsEl = document.querySelector('.movies');

  filmsEl.innerHTML = "";

  data.films.forEach((film)=>{
      const filmElement = document.createElement("div");
      filmElement.classList.add("movie");
      filmElement.innerHTML = `
      <div class="movie__cover_inner">
          <img
            src="${film.posterUrlPreview}"
            alt="${film.nameRu}"
            class="movie__cover"
          />
          <div class="movie__cover_darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${film.nameRu}</div>
          <div class="movie__category">${film.genres
          .map((genre) => ` ${genre.genre}`)
          .join(', ')}</div>
          ${
            film.year &&
            `
              <div class="movie__year movie__year_${getClassByYear(
                film.year
              )}" style="background-color: gray;">
                ${film.year}
              </div>
            `
          }
      </div>
    `;
      
    filmElement.addEventListener('click', ()=> openModal(film.filmId))
      filmsEl.appendChild(filmElement);
  })
}

// форма регистрации

initModalFeature();

//Окно
const modalEl = document.querySelector('#modal-info');

async function openModal(id) {
  // modalEl.innerHTML = '';
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
      <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="${respData.nameRu}">
      <h2>
        <div class="modal__movie-title"> ${respData.nameRu}</div>
              </h2>
      <ul class="modal__movie-info">
        <li class=""modal__movie-release-year">Год - ${respData.year}</li>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map((genre) => ` ${genre.genre}`)}</li>
       <li class="modal__movie-country">Страна - ${respData.countries.map((el)=>`<span> ${el.country} </span>`)}</li>
        <li class="modal__movie-overview">Описание - ${respData.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `
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
