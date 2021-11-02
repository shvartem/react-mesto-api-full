import React from 'react';

function PopupWithForm(props) {
  const {
    name,
    title,
    ariaLabel,
    buttonText,
    buttonIsLoadingText,
    isLoading,
    isOpen,
    onClose,
    onSubmit,
    children,
  } = props;

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        />
        <form
          action="#"
          method="POST"
          name={name}
          className="form"
          onSubmit={onSubmit}
        >
          <h3 className="form__title">{title}</h3>
          <fieldset className="form__input-container">{children}</fieldset>
          <button type="submit" className="form__submit" aria-label={ariaLabel}>
            {isLoading ? buttonIsLoadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
