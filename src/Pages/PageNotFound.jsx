import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='bg-gray-200'>
      <div className='flex justify-center items-center w-screen h-screen' >
        <div className='w-1/2 h-96 rounded-3xl shadow-2xl bg-white'>
          <h1 className='text-center text-6xl font-bold pt-10'>404</h1>
          <p className=' text-center text-lg pt-5'>The Page you are accessing currently unavailable or removed by the admin</p>
          <div className='flex justify-center pt-16'>
            <p className=' text-lg p-2'> Go Back to </p> 
            <Link to='/'>
            <Button variant="outlined">HOME</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
