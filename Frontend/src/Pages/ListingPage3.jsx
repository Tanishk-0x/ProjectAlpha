import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from '../Context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';

const ListingPage3 = () => {

    const navigate = useNavigate() ; 

    const { serverUrl } = useContext(authDataContext); 
    const { userData , getUserDetails } = useContext(userDataContext); 

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
        adding ,
        HandleAddListing ,
    } = useContext(listingDataContext);

    const [showPopUp , setShowPopUp] = useState(false);
    const [phone , setPhone] = useState(''); 
    const [validating , setValidating] = useState(false);  

    const addListing = () => {
        if( userData.phone ){
            HandleAddListing(); 
        }
        else{
            setShowPopUp(true); 
            toast.error("Phone number is not validated"); 
        }
    }

    
    const updatePhone = async () => {
        try {
            setValidating(true); 
            const phonestr = phone.toString(); 
            const res = await axios.post(serverUrl + '/user/addphone' , 
                {phone : phonestr} , {withCredentials : true}
            ); 
            toast.success("Phone Number Validated");
            setShowPopUp(false); 
            setValidating(false);
            getUserDetails(); 
        }
        
        catch (error) {
            console.log(`Error While Updating Phone no : ${error}`);
            toast.error("Error on updating phone no") ; 
            setValidating(false); 
        }
    }

  return (

    <div className='w-full h-screen bg-white flex items-center justify-center gap-2.5 flex-col overflow-auto relative'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer' onClick={() => navigate('/listingpage2')}><FaArrowLeftLong /></button>
        </div>

        <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-2.5'>
            <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-0'>
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
            <button disabled={adding} onClick={addListing} className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg right-[5%] bottom-[5%] cursor-pointer'>
                {adding ? 'Adding..' : 'Add Listing'}
            </button>
        </div>

        {/* ----- Phone PopUp ----- */}
        { showPopUp && 
            <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md'>
                <div className='bg-gray-200 h-[250px] w-[90%] md:w-[500px] border-2 border-gray-400 flex justify-center px-8 flex-col gap-4 rounded-2xl relative shadow-2xl'>
                    <button onClick={() => setShowPopUp(false)} className='absolute top-2 right-3 bg-[red] rounded-full p-1 cursor-pointer'>
                        <RxCross2 />
                    </button>

                    <p className='text-[24px] font-semibold'> Validate Your Phone no </p>
                    
                    <input onChange={(e) => setPhone(e.target.value)}
                     type="number" name="phone" value={phone} placeholder='Enter phone number'  
                        className='w-[90%] bg-white text-black px-2 h-12 outline-none border-2 border-gray-700 rounded-lg '
                    />

                    <button onClick={updatePhone} 
                     className='h-12 w-[120px] bg-red-500 text-white rounded-lg border-red-900 cursor-pointer'>
                        { validating ? 'Validating..' : 'Validate' }
                    </button>
                </div>
            </div>
        }

    </div>

  )
}

export default ListingPage3
