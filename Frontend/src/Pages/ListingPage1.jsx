import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

const ListingPage1 = () => {

    const navigate = useNavigate(); 

    // Destructuring the values
    const {
      title,setTitle , 
      description,setDescription , 
      rent,setRent , 
      city,setCity , 
      landmark,setLandmark , 
      setFrontEndImage1 , 
      setFrontEndImage2 , 
      setFrontEndImage3 , 
      setBackEndImage1 , 
      setBackEndImage2 , 
      setBackEndImage3 ,
    } = useContext(listingDataContext); 

    // Image Set Functions 
    const HandleImage1 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage1(file) ; 
      setFrontEndImage1(URL.createObjectURL(file));
    }

    const HandleImage2 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage2(file) ; 
      setFrontEndImage2(URL.createObjectURL(file));
    }

    const HandleImage3 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage3(file) ; 
      setFrontEndImage3(URL.createObjectURL(file));
    }

    // Submit Handler 
    const SubmitHandler = (e) => {
      e.preventDefault() ; 
      navigate('/listingpage2')
    }



    return (
      
      <div className='w-full h-screen bg-white flex items-center justify-center relative overflow-auto'>

          <form action="" onSubmit={SubmitHandler}
          className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-start gap-2.5 overflow-auto mt-[50px]'>

              <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
                <button className='cursor-pointer' onClick={() => navigate('/')}><FaArrowLeftLong /></button>
              </div>

              <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
                  SetUp Your Home
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="title" className='text-[20px]'>Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}  placeholder='title' id='title' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="description" className='text-[20px]'>Description</label>
                <textarea placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} id='description' required className='w-[90%] h-20 border-2 border-[#555656] rounded-lg text-[18px] px-4 pt-1' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img1" className='text-[20px]'>Image1</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage1} id='img1' required className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img2" className='text-[20px]'>Image2</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage2} id='img2' required className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img3" className='text-[20px]'>Image3</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage3} id='img3' required className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="rent" className='text-[20px]'>Rent</label>
                <input type="number" onChange={(e) => setRent(e.target.value)} value={rent} placeholder='rent' id='rent' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="city" className='text-[20px]'>City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='city' id='city' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
                <input type="text" onChange={(e) => setLandmark(e.target.value)} value={landmark} placeholder='landmark' id='landmark' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              
              <button className='py-2.5 bg-[red] text-[white] text-[18px] md: px-[100px] rounded-lg cursor-pointer mt-2' > Next </button>


          </form>

      </div>

    )
  }

export default ListingPage1
