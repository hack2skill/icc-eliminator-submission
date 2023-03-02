import React from 'react'
import Cards from './Cards';
import { data } from '../constants/data'
const Fixtures = () => {
  return (
    <>
      <h1 className='text-white text-center  text-2xl my-10'>Fixtures</h1>
      <div className='grid grid-cols-4'>
      {data.map((item) => (
            <Cards data={item} />
      ))}
      </div>
    </>
  )
}

export default Fixtures