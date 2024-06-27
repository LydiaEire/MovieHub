// Home Page Section //
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    try {
        await initPageContent();
        initSearchFeature();
        initAutoScroll();
        initModalFeature();
    } catch (error) {
        console.error('Error during DOMContentLoaded', error);
    }
});

async function initPageContent() {
    try {
        console.log('Initializing page content...');
        await loadHTML('#header', 'header.html');
        await loadHTML('#footer', 'footer.html');
        await loadPopularMovies();
        await loadTrendingShows();
        await loadPopularCartoons();
        loadPopularCategories();
    } catch (error) {
        console.error('Failed to initialize page content', error);
    }
}

function initSearchFeature() {
    setTimeout(() => {
        console.log('Initializing search feature...');
        const searchButton = document.getElementById('searchButton');
        const closeButton = document.getElementById('closeButton');
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('searchInput');

        if (searchButton && closeButton && searchContainer && searchInput) {
            searchButton.addEventListener('click', () => {
                searchContainer.classList.add('active');
                searchInput.focus();
            });

            closeButton.addEventListener('click', () => {
                searchContainer.classList.remove('active');
                searchInput.value = '';
            });
        } else {
            console.error('Search feature elements not found.');
        }
    }, 500);
}

function initAutoScroll() {
    console.log('Initializing auto scroll...');
    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => {
        let scrollAmount = 0;

        function autoScroll() {
            if (gallery.scrollLeft !== 0 && scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
                gallery.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                gallery.scrollBy({ left: 1, behavior: 'smooth' });
                scrollAmount += 1;
            }
        }

        setInterval(autoScroll, 20);
    });
}

function initModalFeature() {
    console.log('Initializing modal feature...');
    const registerButton = document.getElementById('registerButton');
    const registerModal = document.getElementById('registerModal');
    const closeModal = document.getElementById('closeModal');

    if (registerButton && registerModal && closeModal) {
        registerButton.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            registerModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });
    } else {
        console.error('Modal feature elements not found.');
    }
}

async function loadHTML(selector, url) {
    try {
        console.log(`Loading HTML for ${selector} from ${url}`);
        const response = await fetch(url);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;

        // Reinitialize search and modal features after header is loaded
        if (selector === '#header') {
            initSearchFeature();
            initModalFeature();
        }
    } catch (error) {
        console.error(`Error loading HTML into ${selector}:`, error);
    }
}

async function fetchAPI(url) {
    console.log(`Fetching data from ${url}`);
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
}

async function loadPopularMovies() {
    try {
        console.log('Loading popular movies...');
        const data = await fetchAPI(API_URL_NEW_MOVIES);
        const movieGallery = document.getElementById('movieGallery');
        movieGallery.innerHTML = data.films.map((movie) => renderTemplate(movie)).join('');
    } catch (error) {
        console.error('Error loading popular movies:', error);
    }
}

async function loadTrendingShows() {
    try {
        console.log('Loading trending shows...');
        const data = await fetchAPI(API_URL_NEW_SERIES);
        const tvShowGallery = document.getElementById('tvShowGallery');
        tvShowGallery.innerHTML = data.items.map((show) => renderTemplate(show)).join('');
    } catch (error) {
        console.error('Error loading trending shows:', error);
    }
}

async function loadPopularCartoons() {
    try {
        console.log('Loading popular cartoons...');
        const data = await fetchAPI(API_URL_NEW_CARTOONS);
        const cartoonGallery = document.getElementById('cartoonGallery');
        cartoonGallery.innerHTML = data.films.map((cartoon) => renderTemplate(cartoon)).join('');
    } catch (error) {
        console.error('Error loading popular cartoons:', error);
    }
}

function loadPopularCategories() {
    const categories = [
        {
            title: "TV Shows",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmfenNFcMhjKowTibjNgy5KqPmRd5rXmBsQ&s"
        },
        {
            title: "Cartoons",
            img: "https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/09/IMG_6086.jpeg"
        },
        {
            title: "Marvel",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg3rYHh9ONCog-Sf5Dx6crT7UBuG-I7P0RdA&s"
        },
        {
            title: "Movies",
            img: "https://www.vanas.ca/images/blog/vfx-visual-effects-vanas.jpg"
        },
    ];
    renderGallery('categories', 'category-card', categories, true);
}

const API_KEY = '827c7dbe-9cd5-489c-9eb6-31db220697f9';
const API_URL_NEW_MOVIES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_NEW_SERIES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?yearFrom=2023&yearTo=2024&order=RATING&type=TV_SERIES&page=1';
const API_URL_NEW_CARTOONS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_CARTOONS&page=1';

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
            </div>
        </div>
    `;
}

function renderGallery(containerId, cardClass, items, isCategory = false) {
    const container = document.getElementById(containerId) || document.querySelector(`.${containerId}`);
    if (container) {
        container.innerHTML = items.map(item => `
            <div class="${cardClass}" ${isCategory ? `data-title="${item.title}" style="background-image: url('${item.img}')"` : ''}>
                ${!isCategory ? `<img src="${item.img}" alt="${item.title}">` : ''}
                <div class="${cardClass}-info">${item.title}</div>
            </div>
        `).join('');
    }
}
export { initSearchFeature, initModalFeature };
// The end of Home Page Section //

