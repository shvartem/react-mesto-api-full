/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  const {
    cards,
    onAddPlace,
    onEditAvatar,
    onEditProfile,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  return (
    <main className="main">
      <section className="profile page__profile">
        <button
          type="button"
          className="profile__change-avatar"
          aria-label="Сменить аватар"
          onClick={onEditAvatar}
        >
          <img
            src={avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__job">{about}</p>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="content page__content">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              currentUser={currentUser}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
