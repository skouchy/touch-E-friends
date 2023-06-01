import React from 'react'

const Navbar =({children})=>{
    return(
        <div className="bg-slate-600 flex items-center  py-10">
            <div className='max-w-md mx-auto w-full'>
                <h1 className='text-white text-center text-2xl font-bold'>Find Images</h1>
                {children}
            </div>
        </div>

    )
}

export default Navbar
