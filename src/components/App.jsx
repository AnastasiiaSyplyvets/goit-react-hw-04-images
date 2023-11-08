import React from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import api from '../API/image-fetch';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuiry, setSearchQuiry] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);

  const fetchRequest = () => {
    if (searchQuiry === '') {
      return;
    }

    setShowButton(false);

    api
      .FetchImageApi(searchQuiry, page)
      .then(data => {
        setLoading(true);
        if (data.total === 0) {
          setShowButton(false);
          toast.error('No results found!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          return;
        }
        const pureData = data.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        }));

        setImages(prevImages => [...prevImages, ...pureData]);

        setLoading(false);

        const pagesCount = Math.ceil(data.totalHits / 12);

        if (pagesCount === page) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequest();
  }, [searchQuiry, page]);

  const toggleModal = image => {
    setSelectedImage(image);
  };

  const handleLoadMoreRequest = () => {
    setPage(page + 1);
  };

  const handleRequest = value => {
    // setLoading(true);
    setSearchQuiry(value);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleRequest} />
      {selectedImage && (
        <Modal
          onClose={toggleModal}
          largeImageURL={selectedImage.largeImageURL}
        >
          <img src={selectedImage.largeImageURL} alt={selectedImage.name} />
        </Modal>
      )}
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                onClick={() => toggleModal(image)}
                key={image.id}
                smallImg={image.webformatURL}
              />
            );
          })}
        </ImageGallery>
      )}

      {showButton && <LoadMoreBtn onClick={handleLoadMoreRequest} />}
      <ToastContainer autoClose={3000} />
    </>
  );
};
