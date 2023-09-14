import React, { useContext, useEffect, useState } from 'react'
import TrainerSidebar from '../../Components/TrainerSide/TrainerSidebar'
import TrainerChangePassword from '../../Components/TrainerSide/TrainerChangePassword'
import UserProfileUpdate from '../../Components/Userside/UserProfile/UserProfileUpdate'
import AuthContext from '../../context/AuthContext'
import { BACKEND_BASE_URL } from '../../common/CommonUrl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TrainerTimeChange from '../../Components/TrainerSide/TrainerTimeChange'

function TrainerProfile() {
  let {user, userProfile} = useContext(AuthContext)
  const [trainerTimings, setTrainerTimings] = useState([])
  const navigate = useNavigate()

  const fetchTimings = async() => {
    axios
        .get(`${BACKEND_BASE_URL}/adminside/timechange/${user.user_id}/`)
        .then((res)=>{
            setTrainerTimings(res.data)
            navigate('/trainer/profile')
        })
        .catch((error)=>{
            console.log(error);
        })

  }

  useEffect(()=>{
    fetchTimings()
  },[])


  const handleTrainerTimingsChange = (newTimings) => {
    setTrainerTimings(newTimings);
  };

  

  return (
    <div>
      <div className='flex'>
        <TrainerSidebar/>
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full'>
          <div className='w-full h-full'>
            <div>
            <div className="px-10 flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className=" w-full  bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-56 ml-10 rounded-lg mt-5 h-56 object-cover" src={userProfile && userProfile.image ? `${BACKEND_BASE_URL}${userProfile.image}` : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Trainer" />
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-800"></h2>
                      <p className="mt-2 text-gray-600"><span className='font-bold'> Full Name:</span> {userProfile && userProfile.full_name  } </p>
                      <p className="mt-2 text-gray-600"><span className='font-bold'>Age:</span> {userProfile && userProfile.age  }</p>
                      <p className="mt-2 text-gray-600"><span className='font-bold'>Blood Group: </span>{userProfile && userProfile.blood_group  }</p>
                      <p className="mt-2 text-gray-600"><span className='font-bold'>Mobile: </span>{userProfile && userProfile.mobile  } </p>
                  </div>
                  <div className='flex justify-end mr-10 items-end mb-10'>
                    <UserProfileUpdate/>
                  </div>
                </div>
                <hr />
                <div className='px-5 pt-3'>
                  <h1 className='font-bold text-lg'>Your Availability Timings</h1>
                  <div className='flex'>
                    { trainerTimings.available_morning && 
                    <div className='my-5 mr-5 rounded-lg w-28 h-10 bg-green-600 uppercase'>
                      <h1 className='text-white flex justify-center mt-2'>morning</h1>
                    </div>
                    }
                    {trainerTimings.available_evening && 
                    <div className='my-5 rounded-lg w-28 h-10 bg-green-600 uppercase'>
                      <h1 className='text-white flex justify-center mt-2'>evening</h1>
                    </div>
                    }
                    <div className='ml-auto mr-5 mt-5 mb-10'>
                      <TrainerTimeChange onTimingsChange={handleTrainerTimingsChange}/>
                    </div>
                  </div>
                </div>
            </div>
        </div>
            </div>
          </div>
          <div className='flex justify-center items-center bg-gray-100'>
            <TrainerChangePassword/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TrainerProfile
