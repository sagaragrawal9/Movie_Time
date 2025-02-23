import React from 'react'
import loadingv from "/loader.gif";

export const Loading = () => {
  return ( 

    <div className='bg-black w-screen h-screen'>
        <div className='flex justify-center items-center h-screen '>
        <img className='w-96 h-96 object-cover'
        src={loadingv} alt="" />
    </div>
    </div>
    
  )
}

export default Loading