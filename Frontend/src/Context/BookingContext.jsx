import React, { createContext, useState } from 'react'

// 1.Create Context
export const bookingDataContext = createContext(); 

const BookingContext = ({children}) => {

    const [checkIn , setCheckIn] = useState("");
    const [checkOut , setCheckOut] = useState("");
    const [total , setTotal] = useState(0);
    const [night , setNight] = useState(0);


    const value = {
        checkIn , setCheckIn ,
        checkOut , setCheckOut , 
        total , setTotal , 
        night , setNight , 
    };


    return (
        <div>
        // 2.Providing the context / passing the value
        <bookingDataContext.Provider value={value}>
            {children}
        </bookingDataContext.Provider>
        </div>
    )

}

export default BookingContext
