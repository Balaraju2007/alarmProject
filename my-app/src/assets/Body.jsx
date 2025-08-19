import React from 'react'

const Body = () => {
    const hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12];
  return (
    <div
     className='text-center bg-color-red-500 border border-red-500 w-[50%] m-auto 
     h-[23rem] mt-4 p-4 rounded-2xl overflow-auto scrollbar-hide'>
        bodyy---------
       <div className='text-2xl font-bold text-blue-600'>  {hour.map((h, index) => (
           
               <p  key={index} >{h} : </p> 
       
        ))}
             </div>
    </div>
  )
}

export default Body