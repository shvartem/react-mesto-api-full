import { useRef } from 'react';

function ImagePopup(props) {
  const { card, isOpen, onClose } = props;

  const imageFallbackContainer = useRef(null);

  return (
    <div
      className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={onClose}
    >
      <div className="popup__container popup__container_type_image">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть окно редактирования"
        />
        <figure className="figure" ref={imageFallbackContainer}>
          {card && (
            <img
              src={card ? card.link : ''}
              alt={card ? card.name : ''}
              className="figure__image"
              onLoad={(evt) => {
                imageFallbackContainer.current.style.width = `${evt.target.offsetWidth}px`;
                imageFallbackContainer.current.style.height = `${evt.target.offsetHeight}px`;
              }}
            />
          )}
          <figcaption className="figure__caption">
            {card ? card.name : ''}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
