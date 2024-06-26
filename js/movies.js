const API_KEY = '827c7dbe-9cd5-489c-9eb6-31db220697f9';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?type=FILM&keyword=';
const API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

getSeries(API_URL_POPULAR);

async function getSeries(url, type = 'items') {
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const respData = await resp.json();
  showFilms(respData, type);
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

function showFilms(data, type) {
  const filmsEl = document.querySelector('.movies');
  document.querySelector('.movies').innerHTML = '';
  data[type].forEach((films) => {
    const filmsElement = document.createElement('div');
    filmsElement.classList.add('movie');
    filmsElement.innerHTML = `
      <div class="movie__cover_inner">
        <img
          src="${films.posterUrlPreview}"
          class="movie__cover"
          alt="${films.nameRu}"
        />
        <div class="movie__cover_darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title" style="color: white;">${films.nameRu}</div>
        <div class="movie__category">${films.genres
          .map((genre) => ` ${genre.genre}`)
          .join(', ')}</div>
          ${
            films.year &&
            `
              <div class="movie__year movie__year_${getClassByYear(
                films.year
              )}" style="background-color: gray;">
                ${films.year}
              </div>
            `
          }
      </div>
    `;
    const filmsId = films.kinopoiskId || films.filmId;
    filmsElement.addEventListener('click', () => openModal(filmId));

    filmsEl.appendChild(filmsElement);
  });
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getSeries(apiSearchUrl, 'films');
    search.value = '';
  }
});

//Окно
const modalEl = document.querySelector('.modal');
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
        <span class="modal__movie-title" >${respData.nameRu}, </span>
        <span class="modal__movie-release-year"> ${respData.year} год</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
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
        <li class="modal__movie-overview">Описание - ${
          respData.description
        }</li>
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
