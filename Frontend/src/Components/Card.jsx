import React, { useContext } from 'react'

const Card = ({title, landmark, city, image1, image2, image3, rent, id,}) => {

  return (

    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg curson-pointer'>
      
      <div className='w-full h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
        <img src={image1} alt="" className='w-full shrink-0' />
        <img src={image2} alt="" className='w-full shrink-0' />
        <img src={image3} alt="" className='w-full shrink-0' />
      </div>

      <div className='w-full h-[33%] py-5 flex flex-col gap-0.5'>
        <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()},{city.toUpperCase()} </span>
        <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'> {title.toUpperCase()} </span>
        <span className='text-[16px] font-semibold text-[#986b6b]'> ₹{rent}/day</span>
      </div>

    </div>

  )
}

export default Card
