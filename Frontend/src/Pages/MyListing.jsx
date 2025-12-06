import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Components/Card';

const MyListing = () => {

    const navigate  = useNavigate(); 

    const {userData} = useContext(userDataContext);

  return (
    
    <div className='w-screen min-h-screen flex items-center justify-start flex-col gap-[50px] relative'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[1%] left-5 absolute md:top-[3%]'>
            <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
        </div>

        <div className='w-[50%] h-[10%] border-2 border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-5 md:w-[600px]'>
            MY LISTING
        </div>

        <div className='w-full h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
            {
               userData.listing.map((list) => (
                <Card 
                    title={list.title} 
                    landmark={list.landmark}
                    city={list.city}
                    image1={list.image1}
                    image2={list.image2}
                    image3={list.image3}
                    rent={list.rent}
                    id={list._id}
                    isBooked={list.isBooked}
                    host={list.host}
                    ratings={list.ratings}
                />
               )) 
            }
        </div>

    </div>

  )
}

export default MyListing
