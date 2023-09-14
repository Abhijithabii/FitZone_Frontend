import React from 'react'
import UserNavbar from '../Components/Userside/UserNavbar'
import UserProfileBanner from '../Components/Userside/UserProfile/UserProfileBanner'
import DownsideBar from '../Components/Userside/UserProfile/DownsideBar'


function UserProfile() {
  return (
    <div>
      <div className='relative' >
        <UserNavbar/>
        <div className='absolute top-0 w-full' >
          <UserProfileBanner/>
          {/* <DownsideBar/> */}
          
          

        </div>
      </div>
    
    </div>
  )
}

export default UserProfile
