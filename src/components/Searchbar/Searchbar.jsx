import React from 'react';
import '../styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInputValue = e => {
    setValue(e.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.info('Put the image name!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        width: 300,
      });

      return;
    }
    onSubmit(value);
  };

  return (
    <>
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
    </>
  );
};
