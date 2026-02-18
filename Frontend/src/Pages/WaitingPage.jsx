import React from 'react'
import waitimg from '/waitingImg.png'
import { IoLocationOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";


const WaitingPage = () => {

  return (

    <div className='w-full min-h-screen flex justify-center items-center p-4'>

        <div className='w-full max-w-[500px] min-h-[650px] flex items-center justify-center flex-col  overflow-hidden '>
            <div className='w-[60%] h-[150px] md:h-[200px] flex items-center justify-center mt-4'>
                <img src={waitimg} alt="Waiting" className='w-full h-full object-cover'/>
            </div>

            <div className='w-full min-h-20 md:h-[100px] flex items-center justify-center px-4'>
                <h1 className='text-2xl md:text-[36px] font-bold text-center font-sans leading-tight'> 
                    Your booking request has been sent to the host 
                </h1>
            </div>

            <div className='w-full min-h-[60px] flex justify-center items-center px-6 py-2'>
                <p className='text-sm md:text-[18px] text-gray-800 text-center font-medium'>
                    Please wait for approval. You will recieve an email once your booking is confirmed.
                </p>
            </div>

            <div className='w-full py-1 flex justify-center items-center'>
                <div className='w-[94%] p-2 flex gap-3 items-center justify-between flex-row rounded-lg shadow-lg'>
                    <div className='h-20 w-20 md:h-[110px] md:w-[110px] shrink-0 flex items-center justify-center'>
                        <img src={waitimg} alt="" className='w-full h-full object-cover rounded-lg'/>
                    </div>

                    <div className='flex flex-col grow m-0 p-0 text-left overflow-hidden'>
                        <p className='font-bold text-sm md:text-[18px] truncate '> 
                            title: luxury stay near hill 
                        </p>
                        <div className='text-xs md:text-[16px] text-black flex flex-row items-center gap-1'>
                            <IoLocationOutline /> New york city
                        </div>
                        <p className='text-xs md:text-[14px] text-black mt-1'>
                            Check-in: 12-03-2026 <br />
                            Check-out: 16-03-2026
                        </p>
                        
                        
                        <div className='flex w-full justify-between items-center mt-0'>
                            <p className='text-[10px] md:text-[14px] font-semibold'>
                                Price per night: $250
                            </p>
                            <p className='text-[12px] md:text-[16px] text-red-600 font-bold'>
                                To pay: 40000
                            </p>
                        </div>

                    </div>  
                </div>
            </div>

            <div className='w-full py-2 px-4'>
                <p className='text-sm font-bold border-b border-gray-600 mb-1'> Host information: </p>
                <div className='flex flex-row items-center gap-2 text-xs md:text-sm'> <CiUser /> Tanishk / tanishknamde981@gmail.com  </div>
                <div className='flex flex-row items-center gap-2 text-xs md:text-sm mt-1'> <CiPhone /> 9347364654 </div>
            </div>

            <div className='w-full h-[70px] p-2'>
                <button className='bg-red-500 rounded-xl text-lg font-bold cursor-pointer transition-all hover:bg-red-600 text-white w-full h-full shadow-md active:scale-95'>
                    Back to home 
                </button>
            </div>
        </div>

    </div>

  )
}

export default WaitingPage
