import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';

import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';

import api from '../utils/Api';
import { ESC_KEYCODE } from '../utils/constants';

import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  // стейты пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  // стейты логина
  const [loggedIn, setLoggedIn] = useState(false);

  // стейты открытия попапов и отправок форм
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isDeleteCardPopupLoading, setDeleteCardPopupIsLoading] = useState(false);

  const [currentRoute, setCurrentRoute] = useState('');
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  // стейт выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  function handleSignOut(evt) {
    evt.preventDefault();
    auth.logout().then((message) => {
      console.log(message);
      // удаление данных при выходе
      setCurrentUser({});
      setCurrentCards([]);
      setLoggedIn(false);
      history.push('/signin');
    })
      .catch(console.error);
  }

  function handleAuthorize({ loginData, setLoginData }) {
    auth.authorize(loginData)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        setLoginData({
          email: '',
          password: '',
        });

        history.push('/');
      })
      .catch(console.error);
  }

  function handleRegister({ registerData, setRegisterData }) {
    auth.register(registerData)
      .then((data) => {
        setIsAuthPopupOpen(true);
        setSuccessRegister(true);

        setRegisterData({
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        setSuccessRegister(false);
        setIsAuthPopupOpen(true);

        console.error(err);
      });
  }

  // функция открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // функция открытия попапа смены аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // функция открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // функция открытия попапа удаления карточка
  function handleDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard({ ...card });
  }

  // функция открытия попапа просмотра полного изображения карточки
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({ ...card });
  }

  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);

    setIsImagePopupOpen(false);
    setSelectedCard(null);

    setIsAuthPopupOpen(false);
  }

  // функция закрытия закрытия попапа по клику на оверлей или кнопку закрытия
  function handleClosePopup(evt) {
    if (
      evt.target.classList.contains('popup')
      || evt.target.classList.contains('popup__close')
    ) {
      closeAllPopups();
    }
  }

  // функция обработки изменения иформации о пользователе
  function handleUpdateUser(userInfo) {
    api
      .patchUserInfoToServer(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsEditProfilePopupLoading(false);
      });
  }

  // функция обработки изменения аватара
  function handleUpdateAvatar(avatar) {
    api
      .patchUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsEditAvatarPopupLoading(false);
      });
  }

  // функция обработки добавления новой карточки
  function handleAddPlaceSubmit(card) {
    api
      .postNewCardToServer(card)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsAddPlacePopupLoading(false);
      });
  }

  // функция обновления лайков в массиве карточек
  function updateLikes(cards, newCard) {
    return cards.map(
      (cardsItem) => (cardsItem._id === newCard._id
        ? newCard
        : cardsItem),
    );
  }

  // функция обработки добавления и удаления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    // eslint-disable-next-line no-unused-expressions
    isLiked
      ? api
        .deleteLikeCards(card._id)
        .then((newCard) => {
          setCurrentCards(
            (cards) => updateLikes(cards, newCard),
          );
        })
        .catch(console.error)
      : api
        .putLikeCards(card._id)
        .then((newCard) => {
          setCurrentCards(
            (cards) => updateLikes(cards, newCard),
          );
        })
        .catch(console.error);
  }

  // функция обработки удаления карточки
  function handleDeleteCard(card) {
    api
      .deleteCardOnServer(card._id)
      .then(() => {
        setCurrentCards(currentCards.filter((el) => el._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setDeleteCardPopupIsLoading(false);
      });
  }

  // эффект запроса и установки данных пользователя
  useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  // эффект запроса и установки данных пользователя и всех карточек
  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCardsFromServer()
        .then((cards) => {
          setCurrentCards(cards.reverse());
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  // эффект закрытия попапа по нажатию ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === ESC_KEYCODE) closeAllPopups();
    }
    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header
              loggedIn={loggedIn}
              email={currentUser.email}
              onSignOut={handleSignOut}
              currentRoute={currentRoute}
            />
            <Switch>
              <Route path="/sign-in">
                <Login
                  onLogin={handleAuthorize}
                  loggedIn={loggedIn}
                  setSuccessRegister={setSuccessRegister}
                  setCurrentRoute={setCurrentRoute}
                  history={history}
                />
              </Route>

              <Route path="/sign-up">
                <Register
                  isAuthPopupOpen={isAuthPopupOpen}
                  setIsAuthPopupOpen={setIsAuthPopupOpen}
                  successRegister={successRegister}
                  onRegister={handleRegister}
                  setCurrentRoute={setCurrentRoute}
                  history={history}
                />
              </Route>

              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                cards={currentCards}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />

            </Switch>

            {loggedIn && <Footer />}

            <InfoToolTip
              name="info-tool-tip"
              isOpen={isAuthPopupOpen}
              onClose={handleClosePopup}
              onSuccessRegister={successRegister}
            />

            <AddPlacePopup
              isLoading={isAddPlacePopupLoading}
              onSetIsLoading={setIsAddPlacePopupLoading}
              isOpen={isAddPlacePopupOpen}
              onClose={handleClosePopup}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isLoading={isEditAvatarPopupLoading}
              onSetIsLoading={setIsEditAvatarPopupLoading}
              isOpen={isEditAvatarPopupOpen}
              onClose={handleClosePopup}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <DeleteCardPopup
              isLoading={isDeleteCardPopupLoading}
              onSetIsLoading={setDeleteCardPopupIsLoading}
              isOpen={isDeleteCardPopupOpen}
              onClose={handleClosePopup}
              onDeleteCard={handleDeleteCard}
              card={selectedCard}
            />

            <EditProfilePopup
              isLoading={isEditProfilePopupLoading}
              onSetIsLoading={setIsEditProfilePopupLoading}
              isOpen={isEditProfilePopupOpen}
              onClose={handleClosePopup}
              onUpdateUser={handleUpdateUser}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
