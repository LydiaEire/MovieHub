// Home Page Section //

document.addEventListener('DOMContentLoaded', async () => {
    await initPageContent();
    initSearchFeature();
    initAutoScroll();
    initModalFeature();
});

async function initPageContent() {
    try {
        await loadHTML('#header', 'header.html');
        await loadHTML('#footer', 'footer.html');
        loadPopularMovies();
        loadTrendingShows();
        loadPopularCartoons();
        loadPopularCategories();
    } catch (error) {
        console.error('Failed to initialize page content', error);
    }
}

function initSearchFeature() {
    setTimeout(() => {
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
    const galleries = document.querySelectorAll('#movieGallery, #cartoonGallery, #tvShowGallery');
    galleries.forEach(gallery => {
        let scrollAmount = 0;

        function autoScroll() {
            gallery.scrollBy(1, 0);
            scrollAmount += 1;
            if (scrollAmount >= gallery.scrollWidth) {
                gallery.scrollTo(0, 0);
                scrollAmount = 0;
            }
        }

        setInterval(autoScroll, 20);
    });
}

function initModalFeature() {
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
        const response = await fetch(url);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;

        // Реконфигурация логики после загрузки HTML
        if (selector === '#header') {
            initSearchFeature();
            initModalFeature();
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

function loadPopularMovies() {
    const movies = [
        { title: "Avengers: Endgame", img: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
        { title: "Joker", img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
        { title: "Earth", img: "https://m.media-amazon.com/images/M/MV5BMTU0N2Y5OWUtMjk5Zi00ZTkyLWEwZWItNTk2ZDlhN2E0MjQyXkEyXkFqcGdeQXVyMTY4NDIxODQ0._V1_.jpg" },
        { title: "Pulp Fiction", img: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
        { title: "Fight Club", img: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg" },
        { title: "The Lord of the Rings", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwjvtARVQAFZvjgby4i1ev7I2h0OgHcG8YoQ&s" },
    ];
    renderGallery('movieGallery', 'movie-card', movies);
}

function loadTrendingShows() {
    const tvShows = [
        { title: "House of Dragon", img: "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_.jpg" },
        { title: 'Breaking Bad', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7AUQ1ap545wJq1Op_9GPLFAV15boesLoyZA&s' },
        { title: 'Supernatural', img: 'https://m.media-amazon.com/images/M/MV5BNzRmZWJhNjUtY2ZkYy00N2MyLWJmNTktOTAwY2VkODVmOGY3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg' },
        { title: 'Sherlock', img: 'https://m.media-amazon.com/images/M/MV5BMWEzNTFlMTQtMzhjOS00MzQ1LWJjNjgtY2RhMjFhYjQwYjIzXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg' },
        { title: 'The Office', img: 'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg' },
        { title: 'Friends', img: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg'},
    ];
    renderGallery('tvShowGallery', 'tvshow-card', tvShows);
}

function loadPopularCartoons() {
    const cartoons = [
        { title: "Frozen II", img: "https://m.media-amazon.com/images/I/81gZRcu9l5L._AC_UF1000,1000_QL80_.jpg" },
        { title: "Toy Story 4", img: "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_.jpg" },
        { title: "The Lion King", img: "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg" },
        { title: 'Spirited away', img: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
        { title: 'Klaus', img: 'https://m.media-amazon.com/images/M/MV5BMWYwOThjM2ItZGYxNy00NTQwLWFlZWEtM2MzM2Q5MmY3NDU5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg' },
        { title: 'Spiderman', img: 'https://m.media-amazon.com/images/M/MV5BMmQ1NzBlYmItNmZkZi00OTZkLTg5YTEtNTI5YjczZjk3Yjc1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg' },
    ];
    renderGallery('cartoonGallery', 'cartoon-card', cartoons);
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

function renderGallery(containerId, cardClass, items, isCategory = false) {
    const container = document.getElementById(containerId) || document.querySelector(`.${containerId}`);
    if (container) {
        container.innerHTML = items.map(item => `
            <div class="${cardClass}" ${isCategory ? `data-title="${item.title}" style="background-image: url('${item.img}');"` : ''}>
                ${!isCategory ? `<img src="${item.img}" alt="${item.title}">` : ``}
                <div class="${cardClass}-info">${item.title}</div>
            </div>
        `).join('');
    }
}


// The end of Home Page Section //

