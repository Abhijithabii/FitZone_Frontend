import React from 'react'
import UserNavbar from '../Components/Userside/UserNavbar'
import UserProfileBanner from '../Components/Userside/UserProfile/UserProfileBanner'



function UserProfile() {
  return (
    <div>
      <div className='relative' >
        <UserNavbar/>
        <div className='absolute top-0 w-full' >
          <UserProfileBanner/>
        </div>
      </div>
    
    </div>
  )
}

export default UserProfile
