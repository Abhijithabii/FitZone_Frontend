import React from 'react'

function Footer() {
    
  return (
    <div>
      <div className='w-full h-full md:h-80 bg-gray-800 font-serif px-10 md:px-20'>
        <h1 className='text-white text-3xl pt-10'>FitZone</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-16  text-white'>
            <div>
                <h1>CONTACT</h1>
                <p>Tel : +91 9961712741</p>
                <p>Email : fitzone@gmail.com</p>
            </div>
            <div>
                <h1>HOURS</h1>
                <h3>All Days</h3>
                <p>Morning : 5 am - 8 am</p>
                <p>Evening : 7 pm - 10 pm</p>
            </div>
            <div>
                <h1>LOCATION</h1>
                <p>Fitness Studio</p>
                <p>Kannur Road</p>
                <p>Kozhikkode</p>
            </div>

        </div>

      </div>
    </div>
  )
}

export default Footer
