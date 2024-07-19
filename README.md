# MovieHub

MovieHub - это сайт для просмотра и поиска новинок фильмов, сериалов и мультфильмов. Сайт также предоставляет информацию о фильмах и телешоу, включая трейлеры, описание, рейтинг, год выпуска и многое другое.

## Установка

1. **Клонирование репозитория:**

```sh
git clone https://github.com/LydiaEire/MovieHub.git
cd MovieHub
```

2. **Установка зависимостей:**
   
Убедитесь, что у вас установлены `node` и `npm`. Если нет, установите их, используя [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm). Затем установите Vite:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
npm install -D vite
```

## Структура проекта

```plaintext
MovieHub/
├── assets/
│   ├── main.css              # Основной файл стилей
├── js/
│   ├── main.js               # Основной файл JavaScript
├── index.html                # Главная страница
├── _header.html               # Файл хедера
├── _footer.html               # Файл футера
├── media.json                # JSON файл с данными о медиа
├── README.md                 # Документация проекта
└── vite.config.js            # Vite конфигурационный файл
```

## Использование
Запуск локального сервера с Vite: Vite предоставляет быстрый и лёгкий способ для разработки приложения:
```sh
npm run dev
```
После этого откройте в браузере страницу http://localhost:3000.


## API
Для загрузки данных используется внешний API, например Kinopoisk API:

```plaintext
API Key: Используется для аутентификации запросов.
URL API: Примеры URL API для загрузки фильмов и сериалов.
```

## Примеры использования API
Загрузка популярных фильмов:

```plaintext
GET https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1
```
Загрузка новинок сериалов:
```plaintext
GET https://kinopoiskapiunofficial.tech/api/v2.2/films?yearFrom=2023&yearTo=2024&order=RATING&type=TV_SERIES&page=1
```
## Авторы
Проект создан командой IT Girls:

https://github.com/YuliaKov
https://github.com/ozimko93
https://github.com/LenaLesik

## Лицензия
Этот проект лицензирован под лицензией MIT. 


