# 🎬 Movie Catalog (Angular)

каталог фильмов с возможностью просмотра информации, поиска и открытия подробностей в модальном окне.  
Реализован на **Angular** с использованием **json-server** как фейкового API.

---

## 🚀 Функционал

- 📑 Список фильмов с постерами, жанрами и рейтингом.  
- 🔍 Поиск фильмов по названию.  
- 🎞 Просмотр подробной информации о фильме в модальном окне.  
- 🖼 Постеры хранятся в `assets/posters`, в JSON указывается только название файла.  

---

## 🛠 Технологии
- **Angular 17+**
- **TypeScript**
- **RxJS**
- **SCSS**
- **json-server** (локальный REST API)

---

## ⚡️ Установка и запуск

1. Клонировать проект:
   git clone https://github.com/MagIrina/movie-catalog.git => 
   cd movie-catalog

2. Установить зависимости:
  npm install

3. Запустить json-server на 3001 порту:
  npx json-server --watch src/movies.json --port 3001

4. Запустить Angular-приложение:
  ng serve

5. Открыть в браузере:
  http://localhost:4200

P.S: ответы на вопросы в файле - answers.txt
