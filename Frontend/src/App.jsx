import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ListingPage1 from './Pages/ListingPage1'
import ListingPage2 from './Pages/ListingPage2'
import {Toaster} from 'react-hot-toast'
import { userDataContext } from './Context/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const App = () => {

  const {userData} = useContext(userDataContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/listingpage1' element={ userData != null ? <ListingPage1/> : <Navigate to={'/login'}/>}/>
        <Route path='/listingpage2' element={ userData != null ? <ListingPage2/> : <Navigate to={'/login'}/>}/>
      </Routes>

      <Toaster/>
    </>
  )

}

export default App
