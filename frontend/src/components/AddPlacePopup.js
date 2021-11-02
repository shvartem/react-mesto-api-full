import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, isLoading, onClose } = props;

  const [newPlace, setNewPlace] = useState({
    title: '',
    image: '',
  });

  function handleChangeNewPlace(evt) {
    setNewPlace({
      ...newPlace,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onAddPlace({
      name: newPlace.title,
      link: newPlace.image,
    });
  }

  useEffect(() => {
    setNewPlace({
      title: '',
      image: '',
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      ariaLabel="Создать карточку"
      buttonText="Создать"
      buttonIsLoadingText="Создание"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="card-title"
        name="title"
        className="form__item form__item_name_card-title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={newPlace.title}
        onChange={handleChangeNewPlace}
        required
      />
      <span className="card-title-error form__item-error" />
      <input
        type="url"
        id="card-image"
        name="image"
        className="form__item form__item_name_card-image"
        placeholder="Ссылка на картинку"
        value={newPlace.image}
        onChange={handleChangeNewPlace}
        required
      />
      <span className="card-image-error form__item-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
