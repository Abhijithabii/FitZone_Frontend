import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Adminside/AdminSidebar'
import { FaUnlockAlt,FaLock } from 'react-icons/fa';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import AdminTrainerAddModal from '../../Components/Adminside/AdminTrainerAddModal';
import { Avatar, Button, Card, IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function AdminTrainerManagement() {

  const TABLE_HEAD = ["ID", "Trainer Image", "Trainer Name", "Email", "Course", "Action"];


  const [trainers, setTrainers] = useState([]);

  const handleTrainerAdded = () =>{
    fetchTrainers();
  }


  useEffect(()=>{
    fetchTrainers();
  },[]);




  const fetchTrainers = async () => {
    try{
      const response = await axios.get(`${BACKEND_BASE_URL}/adminside/trainers/`)
      
      setTrainers(response.data)
    }
    catch (error) {
      console.error("error on fetching", error)
    }
  }


  const trainerBlockUnblock = (userId) => {
    try {
      axios.put(`${BACKEND_BASE_URL}/adminside/edit-user/${userId}/`)
        .then(response => {
          console.log(response.data);
          fetchTrainers() // This will log the response data from the backend
          // Handle the response data as needed
        })
        // .catch(error => {
        //   console.error("Error on working", error);
        //   // Handle errors here if any
        // });
    } catch (error) {
      console.error("Error on working", error);
      // Handle errors here if any
    }
  };


  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

    // Calculate total number of pages
  const totalPages = Math.ceil(trainers.length / ITEMS_PER_PAGE);

    // Get current page's data
  const currentTrainers = trainers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Generate pagination buttons and their click handlers
    const getPageItemProps = (pageNumber) => ({
      onClick: () => setCurrentPage(pageNumber),
      className: pageNumber === currentPage ? "bg-blue-500 text-white" : "text-black bg-white",
    });



  return (
    <div>
      <div className='flex' >
        <AdminSidebar/>
          <div className="relative flex flex-col justify-around w-full items-center mt-20">
            <h1 className=' text-3xl text-black font-bold py-5'>Trainers List</h1>
            <div className="overflow-x-auto lg:w-3/4 w-full">
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
                            className="font-normal leading-none opacity-70">
                            {head}
                          </Typography>
                        </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentTrainers.map((trainer, index) => (
                      <tr key={trainer.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {index+1}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                          <Avatar src={`${BACKEND_BASE_URL}${trainer.trainer_photo}`} alt="avatar" variant="rounded" />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {trainer.user.username}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {trainer.user.email}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {trainer.course.course_name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            { !trainer.user.is_blocked ?  (
                                <FaUnlockAlt onClick={()=>trainerBlockUnblock(trainer.user.id)} className='text-xl cursor-pointer'/>
                              ) : (
                                <FaLock onClick={()=>trainerBlockUnblock(trainer.user.id)} className='text-xl cursor-pointer'/>
                              ) }
                          </Typography>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>   
              </div>
            </div>
            <div className='absolute top-10 left-10 z-10'>
                <AdminTrainerAddModal onTrainerAdded={handleTrainerAdded}  />
            </div>
          </div>
          <div className="mb-32 flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
              <IconButton key={index} {...getPageItemProps(index + 1)}>
                {index + 1}
              </IconButton>
                ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTrainerManagement




{/* <table className="min-w-full text-left text-sm font-light border-gray-600 border-2">
<thead className="border-b font-medium dark:border-neutral-500">
  <tr className=' text-white bg-slate-500'>
    <th scope="col" className="px-6 py-4">ID</th>
    <th scope="col" className="px-6 py-4">Image</th>
    <th scope="col" className="px-6 py-4">Trainer Name</th>
    <th scope="col" className="px-6 py-4">Email ID</th>
    <th scope="col" className="px-6 py-4">Course</th>
    <th scope="col" className="px-6 py-4">Actions</th>
  </tr>
</thead>
<tbody>



  { trainers.map((trainer, index) =>( 
  <tr key={trainer.id}  className="border-b dark:border-neutral-500">
    <td className="whitespace-nowrap px-6 py-4 font-medium"> { index+1 } </td>
    <td className="whitespace-nowrap px-6 py-4">
    <img src={`${BACKEND_BASE_URL}/${trainer.trainer_photo}`} alt={`Image for ${trainer.user.email}`} className="w-16 h-16 rounded-xl" />
    </td>
    <td className="whitespace-nowrap px-6 py-4"> { trainer.user.username } </td>
    <td className="whitespace-nowrap px-6 py-4"> { trainer.user.email } </td>
    <td className="whitespace-nowrap px-6 py-4"> { trainer.course.course_name} </td>
    <td className="whitespace-nowrap px-6 py-4 flex justify-evenly">
      { !trainer.user.is_blocked ?  (
      <FaUnlockAlt onClick={()=>trainerBlockUnblock(trainer.user.id)} className='text-xl mt-5 cursor-pointer'/>
      ) : (
      <FaLock onClick={()=>trainerBlockUnblock(trainer.user.id)} className='text-xl mt-5 cursor-pointer'/>
      ) }
    </td>
  </tr>
))}

</tbody>
</table> */}