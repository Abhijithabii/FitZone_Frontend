import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Adminside/AdminSidebar'
import { Card, Typography } from '@material-tailwind/react'
import AdminCourseScheduleModal from '../../Components/Adminside/AdminCourseScheduleModal'
import { BACKEND_BASE_URL } from '../../common/CommonUrl'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function AdminCourseSchedule() {

  const TABLE_HEAD = ["ID", "Course", "Trainer", "Time Slot"];

  const [schedules, setSchedules] = useState([])


  const fetchSchedules = async() => {
    await axios
             .get(`${BACKEND_BASE_URL}/adminside/schedules`)
             .then((res)=>{
                 
                 setSchedules(res.data)
             })
             .catch((error)=>{
              toast.error("Something went wrong",error)
             })
 }


 useEffect(()=>{
     fetchSchedules();
 },[])



 



  return (
    <div>
      <div className='flex' >
        <AdminSidebar/>
        
        <div className='relative flex flex-col w-full items-center '>
          <div className="overflow-x-auto mt-24 lg:w-3/4 w-full">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
               <Card className="h-full w-full overflow-x-scroll">
                 <table className="w-full min-w-max table-auto text-left">
                   <thead>
                   <tr>
                  {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                  >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
                  
                  { schedules.map((schedule, index) => (
                  
          <tr key={schedule.id} className="even:bg-blue-gray-50/50">
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                    {index+1}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
              {schedule.course.course_name}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-medium">
              {schedule.trainer.user}
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-medium">
              {schedule.time_slot}
              </Typography>
            </td>
            {/* <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-medium">
              <Link to={`/admineditcourse/${course.id}`} className='text-xl cursor-pointer'>
                 <FiEdit/></Link>
              </Typography>
            </td>
            <td className="p-4">
              <Typography variant="small" color="blue-gray" className="font-medium">
                 <RiDeleteBin6Line className='text-xl cursor-pointer' onClick={()=> deleteCourses(course.id)}/> 
              </Typography>
            </td> */}
          </tr>
  )) }
      </tbody>
    </table>
  </Card>
              </div>
            </div>
            <div className='absolute top-10 left-10 z-10'>

                <AdminCourseScheduleModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCourseSchedule
