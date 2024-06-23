// Home Page Section //
document.addEventListener('DOMContentLoaded', () => {
    loadPopularMovies();
    loadPopularCategories();
    loadTrendingShows();
    loadPopularCartoons();

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
    }

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
});

function loadPopularMovies() {
    const movies = [
        { title: "Avengers: Endgame", img: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
        { title: "Joker", img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
        { title: "Earth", img: "https://m.media-amazon.com/images/M/MV5BMTU0N2Y5OWUtMjk5Zi00ZTkyLWEwZWItNTk2ZDlhN2E0MjQyXkEyXkFqcGdeQXVyMTY4NDIxODQ0._V1_.jpg" },
        { title: "Pulp Fiction", img: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" },
        { title: "Fight Club", img: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg" },
        { title: "The Lord of the Rings", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwjvtARVQAFZvjgby4i1ev7I2h0OgHcG8YoQ&s" },
    ];
    const galleryContainer = document.getElementById('movieGallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = movies.map(movie => `
            <div class="movie-card">
                <img src="${movie.img}" alt="${movie.title}">
                <div class="movie-info">${movie.title}</div>
            </div>
        `).join('');
    }
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
    const galleryContainer = document.getElementById('tvShowGallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = tvShows.map(tvShow => `
            <div class="tvshow-card">
                <img src="${tvShow.img}" alt="${tvShow.title}">
                <div class="tvshow-info">${tvShow.title}</div>
            </div>
        `).join('');
    }
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
    const galleryContainer = document.getElementById('cartoonGallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = cartoons.map(cartoon => `
            <div class="cartoon-card">
                <img src="${cartoon.img}" alt="${cartoon.title}">
                <div class="cartoon-info">${cartoon.title}</div>
            </div>
        `).join('');
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

    const container = document.querySelector('.categories');
    container.innerHTML = categories.map(category => `
        <div class="category-card" data-title="${category.title}" style="background-image: url('${category.img}');"></div>
    `).join('');
}
// The end of Home Page Section //

