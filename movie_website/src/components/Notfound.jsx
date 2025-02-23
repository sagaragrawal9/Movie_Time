import React from 'react'
import notfound from "/404error.gif";

export const Notfound = () => {
  return ( 

    <div className='bg-black w-screen h-screen flex justify-center items-center'>
        
        <img className='object-cover'
        src={notfound} alt="" />
    
    </div>
    
  )
}

export default Notfound