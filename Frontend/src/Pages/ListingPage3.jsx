import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from '../Context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { GiConfirmed } from "react-icons/gi";


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
        amenities , 
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

    <div className='w-full h-full min-h-screen md:h-auto flex items-center justify-start md:justify-center gap-1 flex-col overflow-y-auto relative'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer' onClick={() => navigate('/listingpage2')}><FaArrowLeftLong /></button>
        </div>

        <div className='mt-0 md:mt-8 w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-1'>
            <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-2 md:px-0 font-semibold'>
                {`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}
            </h1>
        </div>

        <div className='w-[95%] gap-1 h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>

            <div className='rounded-lg w-full h-[65%] md:w-[70%] md:h-full overflow-hidden flex items-center justify-center border-2 border-[white]'>
                <img src={frontEndImage1} alt="" className='w-full' />
            </div>

            <div className='w-full h-[30%] gap-1 flex items-center justify-center md:w-[30%] md:h-full md:flex-col'>
                <div className='rounded-lg w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={frontEndImage2} alt="" className='w-full'/>
                </div>

                <div className='rounded-lg w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={frontEndImage3} alt="" className='w-full'/>
                </div>
            </div>

        </div>

        <div className='w-[95%] py-1 border flex-row border-gray-300 bg-[##f5f5f5] border-t-0 px-2 rounded-lg flex items-center justify-between text-[18px] md:w-[80%] md:text-[25px] '>
            <div className='flex flex-col gap-0'>
              <span>{`${title.toUpperCase()}  .  ${category.toUpperCase()}`}</span>
              <span className='text-[12px] text-gray-600'>{landmark}</span>
            </div>
            <div className='px-2 '>
              {`₹ ${rent} /day`}
            </div>
        </div>

        <div className=' w-[95%] flex flex-col md:flex-row  items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
                  <div className=' w-full md:w-[50%] px-2'>
                    <p className='text-[24px]'> About This Property</p>
                    <p className='text-[18px] text-gray-700'> {description.toUpperCase()} </p>
                  </div>
                   
                  {/* ----- Amenities ---- */}
                  {
                  amenities && amenities.length > 0 && 
                      <div className='mt-2 md:mt-0 w-full md:w-[50%] flex flex-wrap gap-2 overflow-auto'>
                      {
                        amenities.map((item) => (
                          <div className='bg-gray-200 text-black rounded-lg text-[15px] p-2'>
                            <span className='flex flex-row  items-center justify-center gap-1'> {item} <span className='text-green-700'><GiConfirmed/></span> </span> 
                          </div>
                        ))
                      }
                    </div>
                  }
                </div>

        <div className='w-[95%] md:w-[80%] mt-2 mb-4 px-2'>
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
