import React from 'react'
import notfound from "/404error.gif";

export const Notfound = () => {
  return ( 
    <div className='bg-black w-screen h-screen flex justify-center items-center p-4'>
      <img 
        className='w-full max-w-md sm:max-w-lg lg:max-w-xl object-contain'
        src={notfound} 
        alt="404 Not Found" 
      />
    </div>
  )
}

export default Notfound