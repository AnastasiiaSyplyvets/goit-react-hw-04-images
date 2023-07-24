import React from 'react';
import '../styles.css';
// import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputValue = e => {
    setValue(e.target.value);

    console.log(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (value.trim() === '') {
      alert('Put the image name!');
      return;
    }
    onSubmit(value);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmitForm} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleInputValue}
          value={value}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
// state = {
//   value: '',
// };

// handleInputValue = e => {
//   this.setState({ value: e.target.value });
//   console.log(this.state.value);
// };

// handleSubmitForm = e => {
//   e.preventDefault();
//   const { value } = this.state;
//   if (this.state.value.trim() === '') {
//     alert('Put the image name!');
//     return;
//   }
//   this.props.onSubmit(value);
// };

// ({ onSubmit, onChange }) => {
//   render() {
//     return (
//       <header className="Searchbar">
//         <form onSubmit={this.handleSubmitForm} className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             onChange={this.handleInputValue}
//             value={this.state.value}
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
// export default Searchbar;
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func,
//   onChange: PropTypes.func,
// };
