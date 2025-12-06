import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { listingDataContext } from './ListingContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// 1.Create Context
export const bookingDataContext = createContext(); 

const BookingContext = ({children}) => {

    const navigate = useNavigate(); 

    const { serverUrl } = useContext(authDataContext);
    const { getUserDetails } = useContext(userDataContext);
    const { getListings } = useContext(listingDataContext);

    const [checkIn , setCheckIn] = useState("");
    const [checkOut , setCheckOut] = useState("");
    const [total , setTotal] = useState(0);
    const [night , setNight] = useState(0);
    const [bookingData , setBookingData] = useState([]); 

    // Handle Booking 
    const HandleBooking = async (id) => {
        try {
            const res = await axios.post(serverUrl + `/booking/create/${id}` , 
                {checkIn , checkOut , totalRent:total} ,
                {withCredentials : true}
            );
            await getUserDetails() ; 
            await getListings() ; 
            setBookingData(res.data.booking);
            toast.success(res.data.message);
            console.log(res.data); 
        }
        
        catch (error) {
            console.log(error);  
            setBookingData(null);
            toast.error("Error While Booking"); 
        }
    }


    const value = {
        checkIn , setCheckIn ,
        checkOut , setCheckOut , 
        total , setTotal , 
        night , setNight , 
        bookingData , setBookingData , 
        HandleBooking , 
    };


    return (
        <div>
        {/* // 2.Providing the context / passing the value */}
        <bookingDataContext.Provider value={value}>
            {children}
        </bookingDataContext.Provider>
        </div>
    )

}

export default BookingContext
