import React from 'react';
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import toastr from 'toastr';

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

    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${searchQuiry}&image_type=photo&orientation=horizontal&per_page=12&page=${page}&editors_choice=id,webformatURL,largeImageURL,tags`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.total === 0) {
            setShowButton(false);
            toastr.error('No results found!');
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
    }, 2000);
  };
  useEffect(() => {
    console.log('searchQuiry', searchQuiry);
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuiry, page]);

  const toggleModal = image => {
    setSelectedImage(image);
  };

  const handleLoadMoreRequest = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   fetchRequest(page);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);

  const handleRequest = value => {
    setLoading(true);
    setSearchQuiry(value);
    setImages([]);
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
    </>
  );
};

// export class App extends Component {
// state = {
//   images: [],
//   loading: false,
//   showModal: false,
//   selectedImage: null,
//   searchQuiry: '',
//   showButton: false,
// };

// page = 1;

// componentDidUpdate(prevProps, prevState) {
//   console.log('componentDidUpdate befor');
//   console.log(prevState);
//   if (prevState.searchQuiry !== this.state.searchQuiry) {
//     this.fetchRequest();
//   }
// }

// toggleModal = image => {
//   this.setState(prevState => ({ selectedImage: image }));
// };

// fetchRequest = () => {
//   this.setState({ loading: true });

//   setTimeout(() => {
//     fetch(
//       `https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b&q=${this.state.searchQuiry}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}&editors_choice=id,webformatURL,largeImageURL,tags`
//     )
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         if (data.total === 0) {
//           alert('No results found!');
//           return;
//         }
//         const pureData = data.hits.map(image => ({
//           id: image.id,
//           webformatURL: image.webformatURL,
//           largeImageURL: image.largeImageURL,
//           tags: image.tags,
//         }));
//         // if (data.total <= 12) {
//         //   const btn = document.querySelector('#load-more');
//         //   btn.addAttribute('disabled');

//         //   console.log('data <12');
//         // }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...pureData],
//           loading: false,
//         }));

//         const pagesCount = Math.ceil(data.totalHits / 12);

//         // console.log(this.page);

//         if (pagesCount === this.page) {
//           this.setState({ showButton: false });
//         } else {
//           this.setState({ showButton: true });
//         }
//       })
//       .catch(err => console.log(err))
//       .finally(() => {
//         this.setState({ loading: false });
//       });
//   }, 2000);
// };

// handleLoadMoreRequest = () => {
//   this.page += 1;

//   this.fetchRequest();
// };

// handleRequest = value => {
//   this.page = 1;

//   this.setState({ searchQuiry: value, images: [] });
// };

//   render() {
//     const { loading, images, selectedImage } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleRequest} />
//         {selectedImage && (
//           <Modal
//             onClose={this.toggleModal}
//             largeImageURL={selectedImage.largeImageURL}
//           >
//             <img src={selectedImage.largeImageURL} alt={selectedImage.name} />
//           </Modal>
//         )}
//         {loading && <Loader />}
//         {images.length > 0 && (
//           <ImageGallery>
//             {images.map(image => {
//               return (
//                 <>
//                   <ImageGalleryItem
//                     onClick={() => this.toggleModal(image)}
//                     key={image.id}
//                     smallImg={image.webformatURL}
//                   />
//                 </>
//               );
//             })}
//           </ImageGallery>
//         )}

//         {this.state.showButton && (
//           <LoadMoreBtn onClick={this.handleLoadMoreRequest} />
//         )}
//       </>
//     );
//   }
// }
