import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {authDataContext} from './AuthContext'; 
import axios from 'axios';

export const userDataContext = createContext() ;

const UserContext = ({children}) => {

    const {serverUrl} = useContext(authDataContext)

    const [userData , setUserData] = useState(null) ; 

    const getUserDetails = async () => {
        try {
            const res = await axios.get(serverUrl + "/user/getuser" 
                , {withCredentials:true});
            setUserData(res.data.user);
            console.log(res.data.user);
        }

        catch (error) {
           setUserData(null); 
           console.log(error); 
        }
    }

    useEffect(() => {
        getUserDetails() ; 
    },[]);


    const value = {
        userData , 
        setUserData
    };

  return (

    <div>
      <userDataContext.Provider value={value} >
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default UserContext
