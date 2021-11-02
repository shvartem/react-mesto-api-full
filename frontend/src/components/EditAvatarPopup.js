import { createRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const profileAvatarRef = createRef();

  const { isOpen, isLoading, onClose } = props;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onUpdateAvatar({
      avatar: profileAvatarRef.current.value,
    });
  }

  useEffect(() => {
    profileAvatarRef.current.value = '';
  }, [profileAvatarRef, isOpen]);

  return (
    <PopupWithForm
      name="change-user-avatar"
      title="Обновить аватар"
      ariaLabel="Сохранить новый аватар"
      buttonText="Сохранить"
      buttonIsLoadingText="Сохранение"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        ref={profileAvatarRef}
        id="profile-avatar"
        name="profile_avatar"
        className="form__item form__item_name_change-avatar"
        placeholder="Ссылка на новый аватар"
        required
      />
      <span className="profile-avatar-error form__item-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
