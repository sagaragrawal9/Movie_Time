import React from 'react'
import loadingv from "/loader.gif";

export const Loading = () => {
  return ( 
    <div className='bg-black w-screen h-screen'>
      <div className='flex justify-center items-center h-screen'>
        <img 
          className='w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 object-contain'
          src={loadingv} 
          alt="Loading..." 
        />
      </div>
    </div>
  )
}

export default Loading