import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ListingPage1 from './Pages/ListingPage1'
import ListingPage2 from './Pages/ListingPage2'
import {Toaster} from 'react-hot-toast'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/listingpage1' element={<ListingPage1/>}/>
        <Route path='/listingpage2' element={<ListingPage2/>}/>
      </Routes>

      <Toaster/>
    </>
  )

}

export default App
