import React from 'react';
import { useLocation } from 'react-router-dom';

function Postcard() {
  // const { selectedImage } = props;
  let {state}= useLocation();
  console.log(state)

  // if (!selectedImage) {
  //   // Handle the case when no image is selected
  //   return <div>No image selected.</div>;
  // }

  return (
    <div>
      {/* Render the postcard using the selectedImage */}
      <h2>Postcard</h2>
      {<img src={state.selectedImage.urls.small} alt={state.selectedImage.alt_description} /> }
    </div>
  );
}

export default Postcard;



