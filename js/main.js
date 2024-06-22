document.addEventListener('DOMContentLoaded', () => {
    loadPopularMovies();
    loadPopularCategories();

    const searchButton = document.getElementById('searchButton');
    const closeButton = document.getElementById('closeButton');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        searchContainer.classList.add('active');
        searchInput.focus();
    });

    closeButton.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    });
});

function loadPopularMovies() {
    const movies = [
        { title: "Avengers: Endgame", img: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
        { title: "The Lion King", img: "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg" },
        { title: "Joker", img: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
        { title: "Frozen II", img: "https://m.media-amazon.com/images/I/81gZRcu9l5L._AC_UF1000,1000_QL80_.jpg" },
        { title: "Toy Story 4", img: "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_.jpg" },
    ];

    const galleryContainer = document.getElementById('movieGallery');
    galleryContainer.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.img}" alt="${movie.title}">
            <div class="movie-info">${movie.title}</div>
        </div>
    `).join('');
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
