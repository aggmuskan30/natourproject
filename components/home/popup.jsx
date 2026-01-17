import React from 'react';

const Popup = () => {
  return (
    <div className="popup" id="popup">
      <div className="popup__content">
        <div className="popup__left">
          <img src="/img/nat-8.jpg" alt="tour photo" className="popup__img" />
          <img src="/img/nat-9.jpg" alt="tour photo" className="popup__img" />
        </div>
        <div className="popup__right">
          <a href="#section-tours" className="popup__close">&times;</a>
          <h2 className="heading-secondary u-margin-bottom-small">Start booking now</h2>
          <h3 className="heading-tertiary u-margin-bottom-small">Important &ndash; Please read these terms before booking</h3>
          <p className="popup__text">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Ex sapien vitae pellentesque sem placerat in
            id. Pretium tellus duis convallis tempus leo eu aenean. Urna tempor pulvinar vivamus fringilla lacus
            nec metus.
          </p>
          <a href="#" className="btn btn--green">Book now</a>
        </div>
      </div>
    </div>
  );
};

export default Popup;