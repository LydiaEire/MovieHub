// Home Page Section //
import { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from './firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');
    try {
        await initPageContent();
        initModalFeature();
        initSearchFeature();
        initAutoScroll();
        initContactModalFeature(); // Added for contact form modal
        initBurgerMenu();
        initCurrentYear();
        initChatSupport();
    } catch (error) {
        console.error('Error during DOMContentLoaded:', error);
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
        console.error('Failed to initialize page content:', error);
    }
}

function initSearchFeature(funcTest = undefined) {
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
                if(funcTest) funcTest();
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
        const leftButton = gallery.querySelector('.navigation-button.left');
        const rightButton = gallery.querySelector('.navigation-button.right');
        if (leftButton && rightButton) {
            leftButton.addEventListener('click', () => {
                console.log("popp",gallery.querySelector(".gallery-content"))
                gallery.querySelector(".gallery-content").scrollBy({ left: -200 });
            });
            rightButton.addEventListener('click', () => {
                gallery.querySelector(".gallery-content").scrollBy({ left: 200 });
            });
        }
        let scrollAmount = 0;

        function autoScroll() {
            const scrollContainer = gallery.querySelector(".gallery-content");

            if (scrollContainer.scrollLeft !== 0 && scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            } else {
                scrollContainer.scrollBy({ left: 1, behavior: 'smooth' });
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
    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');

    const signupNameInput = document.getElementById('signupName');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');

    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    if (registerButton && registerModal && closeModal) {
        registerButton.addEventListener('click', () => {
            console.log('Register button clicked');
            registerModal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            console.log('Close modal button clicked');
            registerModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === registerModal) {
                console.log('Clicked outside the modal, closing modal');
                registerModal.style.display = 'none';
            }
        });

        // Регистрация нового пользователя
        signupButton.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Signup button clicked');

            const name = signupNameInput.value;
            const email = signupEmailInput.value;
            const password = signupPasswordInput.value;

            console.log(`Signup form values: Name - ${name}, Email - ${email}, Password - [HIDDEN]`);

            if (!name || !email || !password) {
                console.warn('Please fill out all fields.');
                alert('Please fill out all fields.');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log('User registered:', userCredential.user);
                await updateProfile(userCredential.user, { displayName: name, photoURL: 'https://img.icons8.com/?size=100&id=cVvlNnxJxomp&format=png&color=000000' });
                console.log('User profile updated with display name and photo URL');
                registerModal.style.display = 'none';
                showUserProfile(userCredential.user);
            } catch (error) {
                console.error('Error during registration:', error);
                alert(`Error during registration: ${error.message}`);
            }
        });

        // Вход существующего пользователя
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Login button clicked');

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            console.log(`Login form values: Email - ${email}, Password - [HIDDEN]`);

            if (!email || !password) {
                console.warn('Please fill out all fields.');
                alert('Please fill out all fields.');
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('User logged in:', userCredential.user);
                registerModal.style.display = 'none';
                showUserProfile(userCredential.user);
            } catch (error) {
                console.error('Error during login:', error);
                alert(`Error during login: ${error.message}`);
            }
        });
    } else {
        console.error('Modal feature elements not found.');
    }
}

// Initialize Contact Modal
function initContactModalFeature() {
    console.log('Initializing contact modal feature...');

    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const sendContactButton = document.getElementById('sendContactButton');

    const contactNameInput = document.getElementById('contactName');
    const contactEmailInput = document.getElementById('contactEmail');
    const contactMessageInput = document.getElementById('contactMessage');

    if (contactButton && contactModal && closeContactModal && sendContactButton) {
        contactButton.addEventListener('click', () => {
            console.log('Contact button clicked');
            contactModal.style.display = 'block';
        });

        closeContactModal.addEventListener('click', () => {
            console.log('Close contact modal button clicked');
            contactModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                console.log('Clicked outside the contact modal, closing modal');
                contactModal.style.display = 'none';
            }
        });

        // Sending message from contact form
        sendContactButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Send contact button clicked');

            const name = contactNameInput.value;
            const email = contactEmailInput.value;
            const message = contactMessageInput.value;

            console.log(`Contact form values: Name - ${name}, Email - ${email}, Message - ${message}`);

            if (!name || !email || !message) {
                console.warn('Please fill out all fields.');
                alert('Please fill out all fields.');
                return;
            }

            // Logic for sending message to server or email
            alert(`Thank you, ${name}. Your message has been sent.`);
            contactModal.style.display = 'none';
        });
    } else {
        console.error('Contact modal feature elements not found.');
    }
}

// Функция для отображения профиля пользователя
function showUserProfile(user) {
    console.log('Showing user profile...');
    const userProfile = document.getElementById('userProfile');
    const registerButton = document.getElementById('registerButton');
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');

    console.log(`User info: DisplayName - ${user.displayName}, PhotoURL - ${user.photoURL}`);

    userNameElement.textContent = user.displayName;
    userAvatarElement.src = user.photoURL || 'https://img.icons8.com/?size=100&id=cVvlNnxJxomp&format=png&color=000000';
    
    registerButton.style.display = 'none';
    userProfile.style.display = 'flex';
    console.log('User profile displayed');
}

async function loadHTML(selector, url) {
    try {
        console.log(`Loading HTML for ${selector} from ${url}`);
        const response = await fetch(url);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;

        if (selector === '#header') {
            initSearchFeature();
            initModalFeature();
            initBurgerMenu();
        }
    } catch (error) {
        console.error(`Error loading HTML into ${selector}:`, error);
    }
}

function initBurgerMenu() {
    console.log('Initializing burger menu...');
    const burgerMenuButton = document.querySelector('.burger-menu');
    const menu = document.querySelector('.navbar-menu');

    if (burgerMenuButton && menu) {
        burgerMenuButton.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    } else {
        console.error('Burger menu elements not found.');
    }
}

function initChatSupport() {
    const supportLink = document.getElementById('supportLink');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');

    if (supportLink && chatContainer && closeChat) {
        supportLink.addEventListener('click', (event) => {
            event.preventDefault();
            chatContainer.style.display = 'flex';
        });

        closeChat.addEventListener('click', () => {
            chatContainer.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === chatContainer) {
                chatContainer.style.display = 'none';
            }
        });
    } else {
        console.error('Chat support elements not found.');
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
        const filteredMovies = filterMovies(data.films);
        const movieGallery = document.getElementById('movieGallery');
        movieGallery.innerHTML = filteredMovies.map((movie) => renderTemplate(movie)).join('');
        movieGallery.classList.add('gallery-content');
    } catch (error) {
        console.error('Error loading popular movies:', error);
    }
}

function filterMovies(movies) {
    return movies.filter(movie => {
        return !movie.genres.some(genre => genre.genre.toLowerCase().includes('мультфильм') || genre.genre.toLowerCase().includes('мультфильмы'));
    });
}

async function loadTrendingShows() {
    try {
        console.log('Loading trending shows...');
        const data = await fetchAPI(API_URL_NEW_SERIES);
        const filteredShows = filterShows(data.items);
        const tvShowGallery = document.getElementById('tvShowGallery');
        tvShowGallery.innerHTML = filteredShows.map((show) => renderTemplate(show)).join('');
        tvShowGallery.classList.add('gallery-content');
    } catch (error) {
        console.error('Error loading trending shows:', error);
    }
}

function filterShows(shows) {
    return shows.filter(show => {
        return !show.genres.some(genre => genre.genre.toLowerCase().includes('документальный') || genre.genre.toLowerCase().includes('документальные'));
    });
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
            title: "Сериалы",
            img: "https://avatars.dzeninfra.ru/get-zen_doc/3768331/pub_5fe5ce66de81402ba819b047_5fe5dd6adba1eb4af8a05bee/scale_1200"
        },
        {
            title: "Мультфильмы",
            img: "https://tlum.ru/uploads/19599c32a8f6ce98de6efc2140718e1ee1c0d6a3c0534db6345a2a1163513ea5.jpeg"
        },
        {
            title: "Другое",
            img: "https://static.tildacdn.com/tild3338-3464-4932-a365-376264326331/Denk_ich_an_Deutschl.jpg"
        },
        {
            title: "Фильмы",
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

function initCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    } else {
        console.error('Year element not found.');
    }
}
export { initSearchFeature, initModalFeature };

// The end of Home Page Section //

