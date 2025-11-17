import React, { useState , useContext } from 'react'
import logo from '/Airbnb-Logo.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsShop } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { authDataContext } from '../Context/AuthContext';


const Navbar = () => {

    const navigate = useNavigate() ; 
    const {serverUrl} = useContext(authDataContext); 

    const [showPopUp , setShowPopUp] = useState(false) ; 
    const [loading , setLoading] = useState(false) ; 

    const LogoutHandler = async () => {
        try {
            setLoading(true); 
            const res = await axios.post(  serverUrl + "/auth/logout" , 
             {} , {withCredentials : true}); 
            toast.success(res.data.message);
        }
        catch (error) {
            console.log(error) ;
        }
        finally{
            setLoading(false); 
        }
    }


    return (
        
        <div>

            <div className='w-screen min-h-20 border-b border-[#dcdcdc] px-5 flex items-center justify-between md:px-10'>
                
                <div>
                    <img src={logo} className='w-[130px] '/>
                </div>

                <div className='w-[35%] relative hidden md:block '>
                    <input type="text" placeholder='Any Where  |  Any Location  |  Any City' 
                    className='w-full px-[30px] py-2.5 border-2 border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]' />
                    <button className='absolute p-2.5 rounded-[50px] bg-[red] right-[2%] top-[5px]'> <FiSearch className='w-5 h-5 text-[white]' /> </button>
                </div>

                <div className='relative flex items-center justify-center gap-2.5 '>
                    <span className='text[20px] cursor-pointer px-2 py-[5px] hover:bg-[#ded9d9] hover: rounded-2xl hidden md:block'> List your home </span>
                    <button className='px-5 py-2.5 flex items-center justify-center gap-[5px] border border-[#8d8c8c] rounded-[50px] hover:shadow-lg'>
                        <span>
                            <GiHamburgerMenu onClick={() => setShowPopUp(prev => !prev)} className='w-5 h-5 cursor-pointer'/>
                        </span> 
                        <span>
                            <FaRegUserCircle className='w-[23px] h-[23px] cursor-pointer'/>
                        </span> 
                    </button>

                    { showPopUp && 
                    <div className='w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[5%] border border-[#aaa9a9] z-10 rounded-lg md:right-[10%]'>
                        <ul className='w-full h-full text-[17px] items-start flex justify-around flex-col'>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer' onClick={() => navigate('/login')}>Login</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer' onClick={LogoutHandler}> {loading ? 'loading' : 'Logout'} </li>
                            <div className='w-full h-px bg-[#c1c0c0]'></div>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer'>List your home</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer'>My Listing</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer'>Check Booking</li>
                        </ul>
                    </div>
                    } 

                </div>

            </div>
            
            <div className='w-full flex items-center justify-center mt-2 md:hidden'>
                <div className='w-[80%] relative'>
                    <input type="text" placeholder='Any Where  |  Any Location  |  Any City' 
                        className='w-full px-[30px] py-2.5 border-2 border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]' />
                    <button className='absolute p-2.5 rounded-[50px] bg-[red] right-[2%] top-[5px]'> <FiSearch className='w-5 h-5 text-[white]' /> </button>
                </div>
            </div>

            <div className='w-screen h-[85px] flex items-center justify-start gap-10 overflow-auto md:justify-center px-[15px]'>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <MdWhatshot className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Trending</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <GiFamilyHouse className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Villa</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] text-nowrap'>
                    <FaTreeCity className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Farm House</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] text-nowrap'>
                    <MdOutlinePool className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Pool House</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <MdBedroomParent className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Room</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <MdOutlineMapsHomeWork className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Flat</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <IoBedOutline className='w-[30px] h-[30px] text-[black] ' />
                    <h3>PG</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <GiWoodCabin className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Cabin</h3>
                </div>
                <div className='flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px]'>
                    <BsShop className='w-[30px] h-[30px] text-[black] ' />
                    <h3>Shops</h3>
                </div>
            </div>

        </div>
    )
}

export default Navbar
