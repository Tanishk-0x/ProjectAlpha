import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import {toast} from 'react-hot-toast'

const ViewCard = () => {

  const navigate = useNavigate(); 

  const { serverUrl } = useContext(authDataContext);
  const { cardDetails , updating , setUpdating } = useContext(listingDataContext);
  const { userData } = useContext(userDataContext);
  const [showUpdatePopUp , setShowUpdatePopUp] = useState(false);
  
  const [title , setTitle] = useState(cardDetails.title); 
  const [description , setDescription] = useState(cardDetails.description); 
  const [rent , setRent] = useState(cardDetails.rent); 
  const [city , setCity] = useState(cardDetails.city); 
  const [landmark , setLandmark] = useState(cardDetails.landmark); 
  const [backEndImage1 , setBackEndImage1] = useState(null);
  const [backEndImage2 , setBackEndImage2] = useState(null); 
  const [backEndImage3 , setBackEndImage3] = useState(null); 
  
  const HandleUpdateListing = async () => {
        setUpdating(true);
        try { 
            // Formdata
            let formData = new FormData(); 
 
            formData.append("title" , title); 
            formData.append("description" , description);
            formData.append("rent" , rent );  
            formData.append("city" , city);
            formData.append("landmark" , landmark);
            if(backEndImage1){
              formData.append("image1" , backEndImage1);
            }
            if(backEndImage2){
              formData.append("image2" , backEndImage2);
            }
            if(backEndImage3){
              formData.append("image3" , backEndImage3);
            }
            // Calling
            const res = await axios.post(serverUrl + `/listing/update/${cardDetails._id}` , 
                formData , {withCredentials : true}
            ); 
            setTitle(""); 
            setDescription(""); 
            setRent(""); 
            setCity(""); 
            setLandmark(""); 

            toast.success(res.data.message); 
            setUpdating(false); 
            navigate('/'); 
        }

        catch (error) {
            toast.error('Error While Updating');
            setUpdating(false); 
        }
  }

  // Image Handlers 
  const handleImage1 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage1(file);
  }

  const handleImage2 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage2(file);
  }

  const handleImage3 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage3(file);
  }

  return (

    <div className='w-full h-screen bg-white flex items-center justify-center gap-2.5 flex-col overflow-auto relative'>
          
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer' onClick={() => navigate('/')}><FaArrowLeftLong /></button>
        </div>
    
        <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-2.5'>
            <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-0'>
                {`In ${cardDetails.landmark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}
            </h1>
        </div>
    
        <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
    
            <div className='w-full h-[65%] md:w-[70%] md:h-full overflow-hidden flex items-center justify-center border-2 border-[white]'>
                <img src={cardDetails.image1} alt="" className='w-full' />
            </div>
    
            <div className='w-full h-[30%] flex items-center justify-center md:w-[30%] md:h-full md:flex-col'>
                <div className='w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={cardDetails.image2} alt="" className='w-full'/>
                </div>
    
                <div className='w-full h-full overflow-hidden flex items-center justify-center border-2 border-[white] '>
                    <img src={cardDetails.image3} alt="" className='w-full'/>
                </div>
            </div>
    
        </div>
    
        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} , ${cardDetails.landmark.toUpperCase()}`}
        </div>
        <div className='text-gray-800 w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`${cardDetails.description.toUpperCase()}`}
        </div>
        <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] '>
            {`Rs.${cardDetails.rent}/day`}
        </div>
    
        <div className='w-[95%] h-[50px] flex items-center justify-center px-[100px] gap-2.5 md:justify-start'>
            {
              cardDetails.host == userData._id 
              ?
              <button onClick={() => setShowUpdatePopUp(true)} className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer text-nowrap'>
                Edit Listing
              </button>
              :
              <button className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer'>
                Reserve
              </button>
            }

        </div>

        {/* Update Listing PopUp */}
        
        {
          showUpdatePopUp && 
          
          <div className='w-full h-full flex items-center justify-center bg-[#000000a9] absolute top-0 z-100 backdrop-blur-sm'>
            
            <div onClick={() => setShowUpdatePopUp(false)} className='h-8 w-8 bg-[red] rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold'>
              <RxCross2/>
            </div>

            <form action="" onSubmit={(e) => {e.preventDefault()}}
            className='text-[white] bg-[#272727] p-5 rounded-lg max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col gap-2.5 overflow-auto mt-[50px]'>

                <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
                    Update Your Home
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="title" className='text-[20px]'>Title</label>
                  <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' id='title' value={title} required className=' bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="description" className='text-[20px]'>Description</label>
                  <textarea onChange={(e) => setDescription(e.target.value)} placeholder='description' id='description' value={description} required className='bg-[white] text-[black] w-[90%] h-20 border-2 border-[#555656] rounded-lg text-[18px] px-4 pt-1' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img1" className='text-[20px]'>Image1</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage1} type="file" id='img1' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
                
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img2" className='text-[20px]'>Image2</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage2} type="file" id='img2' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img3" className='text-[20px]'>Image3</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage3} type="file" id='img3' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="rent" className='text-[20px]'>Rent</label>
                  <input onChange={(e) => setRent(e.target.value)} type="number" placeholder='rent' id='rent' value={rent} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="city" className='text-[20px]'>City</label>
                  <input onChange={(e) => setCity(e.target.value)} type="text" placeholder='city' id='city' value={city} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
                  <input onChange={(e) => setLandmark(e.target.value)} type="text" placeholder='landmark' id='landmark' value={landmark} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <button disabled={updating} onClick={HandleUpdateListing} className='py-2.5 bg-[red] text-[white] text-[18px] md: px-[100px] rounded-lg cursor-pointer mt-2' >
                  { updating ? 'Updating' : 'Update Listing' }
                </button>
  
            </form>          



          </div>
        }
        
    
    </div>
    
  )
}

export default ViewCard
