import React, { useState , useContext } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {

  // Consume the value 
  const {serverUrl} = useContext(authDataContext) ; 

  const navigate = useNavigate() ; 

  const [show , setShow] = useState(false) ; 
  const [name , setName] = useState('') ; 
  const [email , setEmail] = useState('') ; 
  const [password , setPassword] = useState('') ; 
  const [loading , setLoading] = useState(false) ; 

  const SignupHandler = async (e) => {
    try {
      e.preventDefault() ; 
      setLoading(true) ; 
      const res = await axios.post( serverUrl + "/auth/signup" , 
        {name , email , password} , {withCredentials : true}
      ); 
      toast.success(res.data.message) ; 
      setName("") ; 
      setEmail("") ;
      setPassword("")
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (

    <div className='w-screen h-screen flex items-center justify-center relative'>
        
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[10%] left-5 absolute'>
          <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
        </div>

        <form action="" onSubmit={SignupHandler}
        className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-2.5'>
          
          <h1 className='text-[30px] font-bold font-serif'>Welcome To xxxxx</h1>
          
            <div className='w-[90%] flex items-start justify-start flex-col gap-2.5 mt-2.5'>
              <label htmlFor="name" className='text-[20px]'>Name</label>
              <input type="text" placeholder='name' id='name' required value={name} onChange={(e) => setName(e.target.value)} className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
            </div>
            
            <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
              <label htmlFor="email" className='text-[20px]'>Email</label>
              <input type="text" placeholder='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-2.5 relative' >
              <label htmlFor="password" className='text-[20px]'>Password</label>
              <input type={ show ? 'text' : 'password' } placeholder='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4 ' />
                  {
                    !show ? 
                     <IoMdEye onClick={() => setShow(true)} className='w-[22px] h-[22px] absolute right-[12%] bottom-2.5 cursor-pointer'/> 
                     : 
                      <IoMdEyeOff onClick={() => setShow(false)} className='w-[22px] h-[22px] absolute right-[12%] bottom-2.5 cursor-pointer'/>
                  }
            </div>

            <button className='py-2.5 bg-[red] text-[white] text-[18px] md: px-[100px] rounded-lg cursor-pointer mt-4' > { loading ? 'loading' : 'Signup' } </button>
            
            <p className='text-[18px]'>Already have an account? <span className='text-[19px] text-[red] cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>

        </form>

    </div>
    

  )
}

export default Signup
