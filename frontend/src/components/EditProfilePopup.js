import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const { isOpen, isLoading, onClose } = props;

  const [userInfo, setUserInfo] = useState({
    username: '',
    job: '',
  });

  function handleChangeUserInfo(evt) {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onUpdateUser({
      name: userInfo.username,
      about: userInfo.job,
    });
  }

  useEffect(() => {
    setUserInfo({
      username: currentUser.name,
      job: currentUser.about,
    });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редaктировать профиль"
      ariaLabel="Сохранить профиль"
      buttonText="Сохранить"
      buttonIsLoadingText="Сохранение"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="username-input"
        name="username"
        className="form__item form__item_name_username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={userInfo.username || ''}
        onChange={handleChangeUserInfo}
        required
      />
      <span className="username-input-error form__item-error" />
      <input
        type="text"
        id="job-input"
        name="job"
        className="form__item form__item_name_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={userInfo.job || ''}
        onChange={handleChangeUserInfo}
        required
      />
      <span className="job-input-error form__item-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
