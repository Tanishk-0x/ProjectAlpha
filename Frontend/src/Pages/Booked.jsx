import React, { useContext } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { IoStar } from "react-icons/io5";

const Booked = () => {

    const { bookingData } = useContext(bookingDataContext); 

    return (

        <div className='w-screen min-h-screen flex items-center justify-center gap-5 bg-slate-200 flex-col'>
            
            <div className='w-[95%] max-w-[500px] h-[400px] bg-[white] flex items-center justify-center border border-[#b5b5b5] flex-col gap-5 p-5 md:w-[80%] rounded-lg'>
                <div className='w-full h-[50%] text-[20px] flex items-center justify-center flex-col gap-5 font-semibold'>
                    <GiConfirmed className='w-[100px] h-[100px] text-[green]'/>
                    Booking Confirmed
                </div>

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Booking Id : </span>
                    <span> {bookingData._id} </span>
                </div>

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Owner Detail: </span>
                    <span> {bookingData.host?.email} </span>
                </div> 

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Total Rent : </span>
                    <span> {bookingData.totalRent} </span>
                </div>

            </div>

            

        </div>
        
    )
}

export default Booked
