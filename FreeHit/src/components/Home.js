import React, { useState } from 'react'
import Cards from './Cards'
import Carousel from "react-elastic-carousel";
import { data } from '../constants/data'
import News from './News';

const Home = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 }
  ];

  const [items, setItems] = useState(data);


  return (
    <>
    
      <h1 className='text-white text-center  text-2xl my-10'>Matches</h1>
      <div className="carousel-wrapper mb-10 max-w-7xl mx-auto">
        <Carousel breakPoints={breakPoints} showEmptySlots={true}>
          {items.map((item) => (
            <div key={item.MatchNumber} className='mx-2'> <Cards data={item} /> </div>
          ))}
        </Carousel>
      </div>
      <News />
    </>
  )
}

export default Home