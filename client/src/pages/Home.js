// TODO: CHAD! Is this page still necessary?


import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import videoBG from "../assets/video-2.mp4"
// import { Button } from '../components/Button';
import "./Home.css"

function Home() {
  return (
    <>
      <Navbar />
      <div className='hero-container'>
        <video src={videoBG} autoPlay loop muted />
        <h1>Share your Adventures!!</h1>
        {/* <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            Log In
          </Button> */}
        {/* </div> */}
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Home;