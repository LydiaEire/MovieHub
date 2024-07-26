# MovieHub

MovieHub - это сайт для просмотра и поиска новинок фильмов, сериалов и мультфильмов. Сайт также предоставляет информацию о фильмах и телешоу, включая трейлеры, описание, рейтинг, год выпуска и многое другое.

## Технологии

- **HTML5**: Обеспечивает структуру веб-страниц.
- **CSS**: Стилизация элементов и макетов сайта. Используются препроцессоры для скриптовой обработки стилей.
- **JavaScript**: Логика и функциональность веб-приложения.
- **Firebase**: Аутентификация и хранение данных.
- **Vite**: Инструмент для сборки и разработки фронтенд-приложений.
- **AJAX**: Выполнение асинхронных запросов к API.

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

## Использование
Запуск локального сервера с Vite: 
```sh
npm run dev
```
После этого откройте в браузере страницу http://localhost:3000.


## API
Для загрузки данных используется внешний API

## Примеры использования API
Загрузка популярных фильмов:

```plaintext
GET https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1
```
Загрузка новинок сериалов:
```plaintext
GET https://kinopoiskapiunofficial.tech/api/v2.2/films?yearFrom=2023&yearTo=2024&order=RATING&type=TV_SERIES&page=1
```
### Пример использования API:

```javascript
async function fetchAPI(url) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'ваш_api_ключ',
        },
    });
    const data = await response.json();
    return data;
}
```

## Авторы
Проект создан командой IT Girls:
- https://github.com/LydiaEire
- https://github.com/YuliaKov
- https://github.com/ozimko93
- https://github.com/LenaLesik

## Лицензия
Этот проект лицензирован под лицензией MIT. 


