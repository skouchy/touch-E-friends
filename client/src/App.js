import Navbar from "./components/Navbar"
import Search from "./pages/SearchImages"
import Images from "./components/Images"
import useAxios from "./hooks/axios"
import { createContext, useState } from "react"

export const ImageContext=createContext();

function App() {
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
    <div className="App">
      <ImageContext.Provider value={value}>
        <Navbar>
          <Search></Search>
        </Navbar>
        <Images />
      </ImageContext.Provider>
    </div>
  );
}

export default App;
