import React from 'react'
import './Banner.css'

const Banner =({children})=>{
    return(
        <div className="banner-ctn">
            <div className='banner-content'>
                <h1 className='banner-title'>Find Images</h1>
                {children}
            </div>
        </div>

    )
}

export default Banner