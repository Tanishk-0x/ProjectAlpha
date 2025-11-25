import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

const ListingPage3 = () => {

    const navigate = useNavigate() ; 

    const {
        title,setTitle , 
        description,setDescription , 
        rent,setRent , 
        city,setCity , 
        landmark,setLandmark , 
        category,setCategory , 
        frontEndImage1,setFrontEndImage1 , 
        frontEndImage2,setFrontEndImage2 , 
        frontEndImage3,setFrontEndImage3 , 
        backEndImage1,setBackEndImage1 , 
        backEndImage2,setBackEndImage2 , 
        backEndImage3,setBackEndImage3 , 
        loading ,
        HandleAddListing ,
    } = useContext(listingDataContext);

  return (

    <div className='w-full h-screen bg-white flex items-center justify-center gap-2.5 flex-col overflow-auto relative'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer' onClick={() => navigate('/listingpage2')}><FaArrowLeftLong /></button>
        </div>

        <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-2.5'>
            <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden'>
                {`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}
            </h1>
        </div>

        <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>

            <div className='w-full h-[65%] md:w-[70%] md:h-full overflow-hidden flex items-center justify-center border-2 border-[white]'>
                <img src={frontEndImage1} alt="" className='w-full' />
            </div>

            <div className='w-full h-[30%] flex items-center justify-center md:w-[30%] md:h-full md:flex-col'>
                <div className='w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={frontEndImage2} alt="" className='w-full'/>
                </div>

                <div className='w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={frontEndImage3} alt="" className='w-full'/>
                </div>
            </div>

        </div>

        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`${title.toUpperCase()} ${category.toUpperCase()} , ${landmark.toUpperCase()}`}
        </div>
        <div className='text-gray-800 w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`${description.toUpperCase()}`}
        </div>
        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`Rs.${rent}/day`}
        </div>

        <div className='w-[95%] h-[50px] flex items-center justify-start px-[110px]'>
            <button disabled={loading} onClick={HandleAddListing} className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg right-[5%] bottom-[5%] cursor-pointer'>
                {loading ? 'Adding..' : 'Add Listing'}
            </button>
        </div>

    </div>

  )
}

export default ListingPage3
