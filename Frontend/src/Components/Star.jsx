import React, { useState } from 'react'
import { IoStar } from "react-icons/io5";


const Star = ({ starValue = 5 , onRate }) => {

    const [rating , setRating] = useState(0); 
    const [hover , setHover] = useState(0); 

    return (

        <div className='flex gap-1 '>
            {
                [...Array(starValue)].map((_,index) => {
                    const starValue = index+1 ; 
                    const isFilled = starValue <= ( hover || rating) ;

                    return(
                        <span key={starValue}
                            onClick={() => {
                                setRating(starValue); 
                                onRate && onRate(starValue)
                            }}
                            onMouseEnter={() => {
                                setHover(starValue)
                            }}
                        >  
                            <IoStar className={`cursor-pointer text-2xl ${isFilled ? "text-[#eb6262]" : "text-gray-400"}`} />

                        </span>
                    )
                })
            }
        </div>

    )
}

export default Star
