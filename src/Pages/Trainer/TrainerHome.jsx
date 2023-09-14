import React, { useContext, useEffect, useState } from 'react'

import TrainerSidebar from '../../Components/TrainerSide/TrainerSidebar';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import AuthContext from '../../context/AuthContext';
function TrainerHome() {
  const [students, setStudents] = useState([])
  const [morningStudents, setMorningStudents] = useState([]);
  const [eveningStudents, setEveningStudents] = useState([]);

  let {user} = useContext(AuthContext)
  const fetchRelatedStudents = async() =>{
    await axios
              .get(`${BACKEND_BASE_URL}/adminside/trainer-students/${user.user_id}/`)
              .then((res)=>{
      
                setStudents(res.data)

              })
  }

  useEffect(()=>{
    fetchRelatedStudents()
  },[])

  useEffect(() => {
    // Filter students based on time slot
    const morning = students.filter(student => student.time_slot === 'morning');
    const evening = students.filter(student => student.time_slot === 'evening');
    
    setMorningStudents(morning);
    setEveningStudents(evening);
  }, [students]);
  

  return (
    <div className='flex'>
      <TrainerSidebar/>
      <div className='w-full h-full '>
        <div className='px-10 mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className='w-44 h-44 bg-light-green-600 my-5 shadow-2xl rounded-2xl'>
              <h1 className='text-lg text-center text-white font-bold mt-5'>Total Students</h1>
              <p className='text-3xl text-center mt-10 font-black text-white'>{students.length}</p>

            </div>
            <div className='w-44 h-44 bg-teal-400 my-5 shadow-2xl rounded-2xl'>
            <h1 className='text-lg text-center text-white font-bold mt-5'>Morning Batch</h1>
            <p className='text-3xl text-center mt-10 font-black text-white'> {morningStudents.length} </p>
            </div>
            <div className='w-44 h-44 bg-deep-purple-500 my-5 shadow-2xl  rounded-2xl '>
            <h1 className='text-lg text-center text-white font-bold mt-5'>Evening Batch</h1>
            <p className='text-3xl text-center mt-10 font-black text-white'>{eveningStudents.length}</p>
            </div>

          </div>
        </div>
      </div>

      
    </div>
  )
}

export default TrainerHome
