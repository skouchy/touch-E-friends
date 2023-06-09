import React from 'react';
import videoBG from "../assets/video-2.mp4"
import { Button } from '../components/Button';
import "./Home.css"

function Home() {
  return (
    <>
      <div className='hero-container'>
        <video src={videoBG} autoPlay loop muted />
        <h1>Share your Adventures!!</h1>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            Log In
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;