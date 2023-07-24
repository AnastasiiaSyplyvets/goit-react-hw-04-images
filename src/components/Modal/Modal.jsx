import React from 'react';
// import { Component } from 'react';
import '../styles.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      onClose();
    }
  };
  const handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      console.log(e.target);
      console.log(e.currentTarget);
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // const { largeImageURL } = this.props;
  return createPortal(
    <div className="Overlay" onClick={handleBackdropClose}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

// class Modal extends Component {
// componentDidMount() {
//   window.addEventListener('keydown', this.handleKeyDown);
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.handleKeyDown);
// }

// handleKeyDown = e => {
//   if (e.code === 'Escape') {
//     console.log(e.code);
//     this.props.onClose();
//   }
// };

// handleBackdropClose = e => {
//   if (e.target === e.currentTarget) {
//     console.log(e.target);
//     console.log(e.currentTarget);
//     this.props.onClose();
//   }
// };

//   render() {
//     // const { largeImageURL } = this.props;
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackdropClose}>
//         <div className="Modal">
//           <img src={largeImageURL} alt="" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;

// Modal.propTypes = {
//   largeImageURL: PropTypes.string,
// };
