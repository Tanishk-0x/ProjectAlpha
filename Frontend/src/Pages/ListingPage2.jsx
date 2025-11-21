import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsShop } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";

const ListingPage2 = () => {

    const navigate = useNavigate() ; 

  return (

    <div className='w-full h-screen bg-white flex items-center justify-center relative overflow-auto'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer' onClick={() => navigate('/listingpage1')}><FaArrowLeftLong /></button>
        </div>
        <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
            SetUp Your Category
        </div>

        <div className='max-w-[900px] w-full h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-10 mt-[30px]'>
            <h1 className='text-[18px] px-2.5 text-[black] md:text-[30px]'>
                Which of these best describes your place?
            </h1>


            <div className='max-w-[900px] w-full h-full flex items-center justify-center flex-wrap  gap-[15px] md:w-[70%] '>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Villa</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <FaTreeCity className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Farm House</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <MdOutlinePool className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Pool House</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Rooms</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <MdOutlineMapsHomeWork className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Flat</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <IoBedOutline className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>PG</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <GiWoodCabin className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Cabin</h3>
                </div>

                <div className='w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg'>
                    <BsShop className='w-[30px] h-[30px] text-[black]'/> 
                    <h3>Shops</h3>
                </div>

            </div>

        </div>

        <button className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer absolute right-[5%] bottom-[5%]' > Next </button>


    </div>

  )
}

export default ListingPage2
