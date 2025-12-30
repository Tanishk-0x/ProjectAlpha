import axios from 'axios';
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import {authDataContext} from './AuthContext'; 
import toast from 'react-hot-toast'; 

// creating context 
export const SearchDataContext = createContext(); 

const NaturalSearchContext = ({children}) => {

    const [searchListing , setSearchListings] = useState([]); 

    const {serverUrl} = useContext(authDataContext); 

    const HandleNaturalSearch = async (searchquery) => {
        try {
            const res = await axios.post(serverUrl + '/listing/naturalsearch' , 
                {searchquery : searchquery} , {withCredentials : true}
            ); 

            setSearchListings(res.data.listing); 
            toast.success("Listing Searched");
            console.log("SEARCHED LISTINGS -->" , res.data.listing); 
        }
        
        catch (error) {
            console.log(`Error In Natural Search : ${error}`); 
            toast.error("Error While Searching");
        }
    }

    const value = {
        HandleNaturalSearch , 
        searchListing
    };

    return (

        <div>
        {/* ----- providing the value ----- */}
        <SearchDataContext.Provider value={value}>
            {children}
        </SearchDataContext.Provider>
        </div>

    )
}

export default NaturalSearchContext
