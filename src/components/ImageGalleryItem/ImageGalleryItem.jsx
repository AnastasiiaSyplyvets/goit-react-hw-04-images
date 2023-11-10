import React from 'react';
import '../styles.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, smallImg, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        key={id}
        onClick={onClick}
        className="ImageGalleryItem-image"
        src={smallImg}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  smallImg: PropTypes.string,
  onClick: PropTypes.func,
};
