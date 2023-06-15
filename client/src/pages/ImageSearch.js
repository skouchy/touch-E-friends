import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ImageSearch.css';

function ImageSearch() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    console.log('suppppp');
    console.log(process.env.REACT_APP_ACCESS_KEY);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="findimg-ctn">
        <h1 className="title">Search for Image!</h1>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="srchbtn" onClick={searchImages}>
          Search
        </button>
        <div className="grid-container">
          {images.map((image) => (
            <div className="grid-item" key={image.id}>
              <Link to="/postcard" state={{ selectedImage: image}} >
                <img src={image.urls.small} alt={image.alt_description} />
              </Link>
              
                
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageSearch;
