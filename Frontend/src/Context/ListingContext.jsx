import React, { createContext, useContext, useEffect, useState } from 'react'
import {authDataContext} from '../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'; 
import {data, useNavigate} from 'react-router-dom'; 

// Creating Context
export const listingDataContext = createContext() ; 

const ListingContext = ({children}) => {

    const navigate = useNavigate(); 

    const {serverUrl} = useContext(authDataContext); 

    const [title , setTitle] = useState("Beautiful Furnished Villa "); 
    const [description , setDescription] = useState("Experience the best of Dehradun in this beautifully furnished villa, located near Mall Road with easy access to the airport and railway station, starting at 4000 rent"); 
    const [rent , setRent] = useState("4000"); 
    const [city , setCity] = useState("Dehradun"); 
    const [landmark , setLandmark] = useState("45,MallRoad"); 
    const [category , setCategory] = useState("");

    const [frontEndImage1 , setFrontEndImage1] = useState('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
    const [frontEndImage2 , setFrontEndImage2] = useState('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
    const [frontEndImage3 , setFrontEndImage3] = useState('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 

    const [backEndImage1 , setBackEndImage1] = useState(null);
    const [backEndImage2 , setBackEndImage2] = useState(null); 
    const [backEndImage3 , setBackEndImage3] = useState(null);
    
    const [amenities , setAmenities] = useState(['wifi' , 'pool' , 'ac' , 'geyser' , 'evcharger' , 'balcony' , 'parking' , 'lift' , 'cctv']); 

    const [listingData , setListingData] = useState([]); 
    const [newListingData , setNewListingData] = useState([]);
    const [cardDetails , setCardDetails] = useState(null); 

    // Search 
    const [searchData , setSearchData] = useState([]); 

    const [adding , setAdding] = useState(false); 
    const[loading , setLoading] = useState(false);
    const [updating , setUpdating] = useState(false); 
    const [deleting , setDeleting] = useState(false); 

    const HandleAddListing = async () => {
        try {
            // Formdata
            setAdding(true); 
            let formData = new FormData(); 

            formData.append("title" , title); 
            formData.append("description" , description);
            formData.append("rent" , rent );  
            formData.append("city" , city);
            formData.append("landmark" , landmark);
            formData.append("category" , category);
            formData.append("image1" , backEndImage1);
            formData.append("image2" , backEndImage2);
            formData.append("image3" , backEndImage3);

            amenities.forEach((item) => {
                formData.append("amenities[]" , item);
            });

            // Calling
            const res = await axios.post(serverUrl + "/listing/add" , 
                formData , {withCredentials : true}
            ); 
            console.log(res); 

            setTitle(""); 
            setDescription(""); 
            setFrontEndImage1(null);
            setFrontEndImage2(null);
            setFrontEndImage3(null);
            setBackEndImage1(null); 
            setBackEndImage2(null); 
            setBackEndImage3(null); 
            setRent(""); 
            setCity(""); 
            setLandmark(""); 
            setCategory("");  
            setAmenities(""); 

            toast.success(res.data.message); 
            navigate('/'); 
            setAdding(false); 
        }

        catch (error) {
            console.log(error);
            setAdding(false);      
        }
    }

    const getListings = async () => {
        try {
            setLoading(true); 
            const res = await axios.get(serverUrl + "/listing/get" , 
                {withCredentials:true}
            );     
            setListingData(res.data.listing);
            setNewListingData(res.data.listing); 
            setLoading(false); 
            console.log(res.data);  
        }

        catch (error) {
            console.log(error);  
            setLoading(false);    
        }
    }

    const HandleViewCard = async (id) => {
        try {
            const res = await axios.get(
                serverUrl + `/listing/findlistingbyid/${id}` , 
                {withCredentials:true}
            );
            console.log(res.data); 
            setCardDetails(res.data.listing);
            navigate('/viewcard');
        }
        
        catch (error) {
            console.log(error);     
        }
    }

    // Handle Search 
    const HandleSearch = async (data) => {
        try {
            const res = await axios.get(serverUrl + 
                `/listing/search?query=${data}`
            ); 
            setSearchData(res.data.listing);  
        }
        
        catch (error) {
            console.log(error);     
            setSearchData(null); 
        }
    }

    useEffect(() => {
        getListings(); 
    },[adding , updating , deleting]);

    const value = {
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
        amenities , setAmenities ,
        
        loading , setLoading ,
        adding ,
        updating , setUpdating , 
        deleting , setDeleting ,

        listingData , setListingData ,
        newListingData , setNewListingData ,
        cardDetails , setCardDetails ,
        searchData , setSearchData ,

        getListings , 
        HandleAddListing , 
        HandleViewCard ,
        HandleSearch , 
         
    }; 

    return (
        <div>
            {/* // Providing the context */}
            <listingDataContext.Provider value={value} >
                {children}
            </listingDataContext.Provider>
        </div>
    )
}


export default ListingContext
