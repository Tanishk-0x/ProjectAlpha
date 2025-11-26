import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import { listingDataContext } from '../Context/ListingContext'

const Home = () => {

  const {listingData , setListingData} = useContext(listingDataContext); 

  return (
    <div>
      <Navbar/>

      <div className='w-screen h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]'>
        {
          listingData.map((list) => (
            <Card 
              title={list.title} 
              landmark={list.landmark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
            />
          ))
        }
      </div>

    </div>
  )
}

export default Home
