# Проект "Место"

### Обзор

Проект "Место" показывает красивые и интересные места нашей страны, которые можно посетить в туристических целях. Для этого не нужны загранпаспорт и большое количество денег. Можно даже обойтись без авиаперелетов, ведь много прекрасных мест есть недалеко от вас. Также вы можете вписать своё имя в данные профиля и создавать свои карточки с местами, которые вам нравятся больше всего или которые планируете посетить в будущем. Ставьте лайки любимым местам или удаляйте старые карточки по своему желанию. А встроенная проверка полей редактирования профиля и добавления карточки поможет вам ввести корректные данные.
<br/>
<br/>
Публичный адрес сервера: [62.84.118.164](https://62.84.118.164)
<br/>
Адрес сайта: [https://mesto422.nomoredomains.work](https://mesto422.nomoredomains.work)
<br/>
Адрес бэкенда: [http://api.mesto422.nomoredomains.icu](http://api.mesto422.nomoredomains.icu)
<br/>
<br/>
**Возможности**

- при первичной загрузке страницы на сайт автоматически добавляются карточки с сервера;
- реализован просмотр изображения любой карточки крупным планом по клику на картинку;
- попапы редактирования профиля, смены аватара, добавления новой карточки и просмотра изображения плавно появляются на странице при открытии и также плавно исчезают при закрытии;
- всплывающие окна редактирования профиля, добавления новой карточки и просмотра изображения карточки можно закрыть, кликнув мимо них;
- реализованы авторизация и регистрация пользователей.

**Техническое описание**
<br/>
<br/>
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.
<br/>
<br/>
При разработке проекта были использованы:

- Проект реализован на фреймворке ReactJS при помощи пакета create-react-app;
- flexbox и grid для построения сетки;
- реализован отзывчивый интерфейс для удобного просмотра страницы на различных устройствах, начиная от смартфонов, заканчивая настольными компьютерами;
- БЭМ для организации файловой структуры и возможности повторного использования блоков;
- также было реализовано открытие формы для редактирования профиля, добавления новой карточки, удаления карточки, открытие полного изображения карточки при клике на него;
- классы ES6 синтаксиса;
- присутствует две сборки: build (финальная сборка проекта) и start (запуск проекта на локальном сервере для разработки);
- присутствует минификация и транспиляция JS. Все файлы .js собираются в один файл, тег script автоматически добавляется в HTML со ссылкой на финальный js-файл;
- присутствует обработка CSS: в HTML нет тега link со ссылкой на CSS-файл, обработка и подключение CSS выполняются автоматически;
- присутствует минификация CSS и автоматическое добавление вендорных префиксов;
- присутствует обработка изображений и шрифтов: используемые изображения и шрифты автоматически добавляются в папку с финальной сборкой проекта;

  
  
