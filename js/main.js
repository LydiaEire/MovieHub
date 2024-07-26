import { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from './firebase.js';
import { fetchAPI, filterMovies, filterShows, renderTemplate, API_URL_NEW_MOVIES, API_URL_NEW_SERIES, API_URL_NEW_CARTOONS } from './api.js';


document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initPageContent();
        initModalFeature();
        initSearchFeature();
        initAutoScroll();
        initContactModalFeature();
        initBurgerMenu();
        initCurrentYear();
        initChatSupport();
    } catch (error) {
        alert('Произошла ошибка при инициализации страницы. Пожалуйста, попробуйте позже.');
    }
});

async function initPageContent() {
    try {
        await loadHTML('#header', 'header.html');
        await loadHTML('#footer', 'footer.html');
        await loadPopularMovies();
        await loadTrendingShows();
        await loadPopularCartoons();
        loadPopularCategories();
    } catch (error) {
        alert('Не удалось загрузить содержимое страницы.');
    }
}

function initSearchFeature(funcTest = undefined) {
    setTimeout(() => {
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
        }
    }, 500);
}

function initAutoScroll() {
    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => {
        const leftButton = gallery.querySelector('.navigation-button.left');
        const rightButton = gallery.querySelector('.navigation-button.right');
        if (leftButton && rightButton) {
            leftButton.addEventListener('click', () => {
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

        signupButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const name = signupNameInput.value;
            const email = signupEmailInput.value;
            const password = signupPasswordInput.value;

            if (!name || !email || !password) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name, photoURL: 'https://img.icons8.com/?size=100&id=cVvlNnxJxomp&format=png&color=000000' });
                registerModal.style.display = 'none';
                showUserProfile(userCredential.user);
            } catch (error) {
                alert(`Ошибка при регистрации: ${error.message}`);
            }
        });

        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            if (!email || !password) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                registerModal.style.display = 'none';
                showUserProfile(userCredential.user);
            } catch (error) {
                alert(`Ошибка при входе: ${error.message}`);
            }
        });
    }
}

function initContactModalFeature() {
    const contactLink = document.getElementById('contactLink');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close');

    if (contactLink && contactModal && closeModal) {
        contactLink.addEventListener('click', (event) => {
            event.preventDefault();
            contactModal.style.display = 'block';
        });

        closeModal.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }
}

function showUserProfile(user) {
    const userProfile = document.getElementById('userProfile');
    const registerButton = document.getElementById('registerButton');
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');

    userNameElement.textContent = user.displayName;
    userAvatarElement.src = user.photoURL || 'https://img.icons8.com/?size=100&id=cVvlNnxJxomp&format=png&color=000000';
    registerButton.style.display = 'none';
    userProfile.style.display = 'flex';
}

async function loadHTML(selector, url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;

        if (selector === '#header') {
            initSearchFeature();
            initModalFeature();
            initBurgerMenu();
        }
    } catch (error) {
        alert(`Не удалось загрузить содержимое для ${selector}.`);
    }
}

function initBurgerMenu() {
    const burgerMenuButton = document.querySelector('.burger-menu');
    const menu = document.querySelector('.navbar-menu');

    if (burgerMenuButton && menu) {
        burgerMenuButton.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
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
    }
}

async function loadPopularMovies() {
    try {
        const data = await fetchAPI(API_URL_NEW_MOVIES);
        const filteredMovies = filterMovies(data.films);
        const movieGallery = document.getElementById('movieGallery');
        movieGallery.innerHTML = filteredMovies.map((movie) => renderTemplate(movie)).join('');
        movieGallery.classList.add('gallery-content');
    } catch (error) {
        alert('Не удалось загрузить популярные фильмы.');
    }
}

async function loadTrendingShows() {
    try {
        const data = await fetchAPI(API_URL_NEW_SERIES);
        const filteredShows = filterShows(data.items);
        const tvShowGallery = document.getElementById('tvShowGallery');
        tvShowGallery.innerHTML = filteredShows.map((show) => renderTemplate(show)).join('');
        tvShowGallery.classList.add('gallery-content');
    } catch (error) {
        alert('Не удалось загрузить популярные сериалы.');
    }
}

async function loadPopularCartoons() {
    try {
        const data = await fetchAPI(API_URL_NEW_CARTOONS);
        const cartoonGallery = document.getElementById('cartoonGallery');
        cartoonGallery.innerHTML = data.items.map((cartoon) => renderTemplate(cartoon)).join('');
        cartoonGallery.classList.add('gallery-content');
    } catch (error) {
        alert('Не удалось загрузить популярные мультфильмы.');
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

function renderGallery(containerId, cardClass, items, isCategory = false) {
    const categoryUrls = {
        "Сериалы": "series.html",
        "Мультфильмы": "animations.html",
        "Документальное": "documentaries.html",
        "Фильмы": "movies.html"
    };

    const container = document.getElementById(containerId) || document.querySelector(`.${containerId}`);
    if (container) {
        container.innerHTML = items.map(item => `
            <a href="/${categoryUrls[item.title]}" class="${cardClass}" ${isCategory ? `data-title="${item.title}" style="background-image: url('${item.img}')"` : ''}>
                ${!isCategory ? `<img src="${item.img}" alt="${item.title}">` : ''}
                <div class="${cardClass}-info">${item.title}</div>
            </a>
        `).join('');
    }
}

function initCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

export { initSearchFeature, initModalFeature };


