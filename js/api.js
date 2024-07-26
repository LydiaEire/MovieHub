const API_KEY = '827c7dbe-9cd5-489c-9eb6-31db220697f9';
const API_URL_NEW_MOVIES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_NEW_SERIES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?yearFrom=2023&yearTo=2024&order=RATING&type=TV_SERIES&page=1';
const API_URL_NEW_CARTOONS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=KIDS_ANIMATION_THEME&page=1';

async function fetchAPI(url) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`Не удалось получить данные: ${response.statusText}`);
    }

    return response.json();
}

function filterMovies(movies) {
    return movies.filter(movie => {
        return !movie.genres.some(genre => genre.genre.toLowerCase().includes('мультфильм') || genre.genre.toLowerCase().includes('мультфильмы'));
    });
}

function filterShows(shows) {
    return shows.filter(show => {
        return !show.genres.some(genre => genre.genre.toLowerCase().includes('документальный') || genre.genre.toLowerCase().includes('мультфильм'));
    });
}

function renderTemplate(data) {
    return `
        <div class="media-item">
            <div class="media-item__cover_inner">
                <img src="${data.posterUrlPreview}" class="media-item__cover" alt="${data.nameRu}">
                <div class="media-item__cover_darkened"></div>
            </div>
            <div class="media-item__info">
                <div class="media-item__title">${data.nameRu}</div>
                <div class="media-item__category">${data.genres.map(genre => genre.genre).join(', ')}</div>
                <div class="media-item__year">${data.year}</div>
                ${data.trailer_link ? `<a href="${data.trailer_link}" target="_blank" class="media-item__trailer-link">Смотреть трейлер</a>` : ''}
            </div>
        </div>
    `;
}

export {
    fetchAPI, filterMovies, filterShows, renderTemplate, API_URL_NEW_MOVIES, API_URL_NEW_SERIES, API_URL_NEW_CARTOONS
};
