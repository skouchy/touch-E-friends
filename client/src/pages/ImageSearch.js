import React from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Banner from "./tools/Banner"
import Search from "./tools/Search"
import {createContext, useState} from "react"
import useAxios from "./tools/Axios"
import Images from './tools/Images';

export const ImageContext=createContext();


function ImageSearch() {
  const [searchImage, setSearchImage]=useState('');
  const{response,isLoading, error,fetchData}= useAxios(`search/photos?page=1&query=office&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
  console.log(response);

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage
  }

  return (
    <>
      <ImageContext.Provider value={value}>
        <Navbar />
        <Banner>
          <Search></Search>
        </Banner>
        <Images/>
        <Footer />
      </ImageContext.Provider>   
    </>
  );
}

export default ImageSearch;