import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  const { isOpen, isLoading, onClose } = props;

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      ariaLabel="Удалить карточку"
      buttonText="Да"
      buttonIsLoadingText="Удаление"
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
