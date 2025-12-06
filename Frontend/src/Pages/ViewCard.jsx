import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import {toast} from 'react-hot-toast'
import { IoStar } from "react-icons/io5";
import { bookingDataContext } from '../Context/bookingContext';

const ViewCard = () => {

  const navigate = useNavigate(); 

  const { serverUrl } = useContext(authDataContext);
  const { cardDetails , updating , setUpdating , deleting , setDeleting } = useContext(listingDataContext);
  const { userData } = useContext(userDataContext);

  const [showUpdatePopUp , setShowUpdatePopUp] = useState(false);
  const [showBookingPopUp , setShowBookingPopUp] = useState(false); 
  
  const [title , setTitle] = useState(cardDetails.title); 
  const [description , setDescription] = useState(cardDetails.description); 
  const [rent , setRent] = useState(cardDetails.rent); 
  const [city , setCity] = useState(cardDetails.city); 
  const [landmark , setLandmark] = useState(cardDetails.landmark); 
  const [backEndImage1 , setBackEndImage1] = useState(null);
  const [backEndImage2 , setBackEndImage2] = useState(null); 
  const [backEndImage3 , setBackEndImage3] = useState(null); 

  const [minDate , setMinDate] = useState(null);
  const {
    checkIn , setCheckIn ,
    checkOut , setCheckOut , 
    total , setTotal , 
    night , setNight , 
  } = useContext(bookingDataContext) ; 

  // Handle Minimum Date To Choose 
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] ; 
    setMinDate(today); // min={minDate}
  },[]);


  // Handle TotalRent 
  useEffect(() => {

    if(checkIn && checkOut){
      const InDate = new Date(checkIn);
      const OutDate = new Date(checkOut);
      const n = (OutDate - InDate) / 24*60*60*1000 ; 
      setNight(n); 

      // Platform Charges (7%)
      const platfromCharges = (cardDetails.rent * (7/100));
      // Tax (8%)
      const tax = (cardDetails.rent * (8/100));
      
      if(n > 0){
        setTotal((cardDetails.rent * n) + platfromCharges + tax); 
      }
      else{
        setTotal(0);
      }
    }

  },[checkIn , checkOut , cardDetails.rent , total]);
  

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

  // Delete Listing
  const HandleDeleteListing = async () => {
    setDeleting(true); 
    try {
      const res = await axios.delete(serverUrl + `/listing/deletelistingbyid/${cardDetails._id}` , 
        {withCredentials : true}
      ); 
      console.log(res.data); 
      toast.success(res.data.message); 
      setDeleting(false); 
      navigate('/'); 
    }
    
    catch (error) {
      console.log(error);  
      toast.error('Error While Deleting'); 
      setDeleting(false); 
    }
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
              <button onClick={() => setShowBookingPopUp(true)} className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer'>
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
  
                <div className='w-full flex items-center justify-center gap-5 '>
                  <button disabled={updating} onClick={HandleUpdateListing} className='px-5 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer mt-2 md:text-[18px] text-nowrap' >
                    { updating ? 'Updating' : 'Update Listing' }
                  </button>
                  
                  {/* Delete */}
                  <button onClick={HandleDeleteListing} className='px-5 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer mt-2 md:text-[18px] text-nowrap' >
                    { deleting ? 'Deleting' : 'Delete Listing' }
                  </button>
                </div>
  
            </form>          

          </div>
        }


        {/* Booking PopUp */}

       { showBookingPopUp &&

          <div className='w-full h-full flex items-center justify-center bg-[#000000a9] absolute top-0 z-100 p-5  backdrop-blur-sm md:flex-row md:gap-[100px]'>

            <div onClick={() => setShowBookingPopUp(false)} className='h-8 w-8 bg-[red] rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold'>
              <RxCross2/>
            </div>

            <form className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-5 rounded-lg flex items-center justify-center flex-col gap-2.5 border border-[#dedddd]'>
              
              <h1 className='w-full flex items-center justify-center py-2.5 text-[25px] border-b border-[#a3a3a3] '>
                Confirm & Book
              </h1>

              <div className='w-full h-[80%] bg-[#79797933] mt-2.5 rounded-lg p-2.5 md:h-[70%]'>
                <h3 className='text-[19px] font-semibold'>
                  Your Trip - 
                </h3>

                <div className='w-[90%] flex items-center justify-start flex-col gap-2.5 md:gap-6 md:justify-center md:flex-row md:items-start mt-2.5 md:mt-5  ' >
                  <label htmlFor="checkIn" className='text-[18px] md:text-[20px]'>CheckIn</label>
                  <input type="date" onChange={(e) => setCheckIn(e.target.value)} id='checkIn' min={minDate} required className='border-[#555656] border-2 w-[200px] h-10 rounded-[10px] bg-transparent px-2.5 text-[15px] md:text-[18px] ' />
                </div>

                <div className='w-[90%] flex items-center justify-start flex-col gap-2.5 md:justify-center md:flex-row md:items-start mt-5 md:mt-10 ' >
                  <label htmlFor="checkOut" className='text-[18px] md:text-[20px]'>CheckOut</label>
                  <input type="date" onChange={(e) => setCheckOut(e.target.value)} id='checkOut' min={minDate} required className='border-[#555656] border-2 w-[200px] h-10 rounded-[10px] bg-transparent px-2.5 text-[15px] md:text-[18px] ' />
                </div>

                <div className='w-full flex items-center justify-center'>
                  <button className='px-20 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer text-nowrap mt-[30px]' >
                    Book Now
                  </button>
                </div>

              </div>

            </form>

            <div className='max-w-[450px] w-[90%] h-[450px] bg-[#f7fbfcfe] p-5 rounded-lg flex items-center justify-center flex-col gap-2.5 border border-[#e2e1e1] '>
              
              <div className='w-[95%] h-[30%] border border-[#abaaaa] rounded-lg flex justify-center items-center gap-2 p-5 overflow-hidden'>

                <div className='w-[70px] h-[90px] flex items-center justify-center shrink-0 rounded-lg md:w-[100px] md:h-[100px]  '>
                  <img className='w-full h-full  rounded-lg' src={cardDetails.image1} alt="" />
                </div>

                <div className='w-[80%] h-[100px] gap-[5px]'>
                    <h1 className='w-[90%] truncate'>
                      { `IN ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}` }
                    </h1>
                    <h1> {cardDetails.title.toUpperCase()} </h1>
                    <h1> {cardDetails.category.toUpperCase()} </h1>
                    <h1 className='flex items-center justify-start gap-[5px]'>
                      <IoStar className='text-[#eb6262]'/>{cardDetails.ratings}
                    </h1>
                </div>

              </div>

              <div className='w-[95%] h-[60%] border border-[#abaaaa] rounded-lg flex justify-start items-start p-5 gap-[15px] flex-col'>

              </div>

            </div>

          </div>
       }
        
    
    </div>
    
  )
}

export default ViewCard
