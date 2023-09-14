
import React, { useEffect, useState } from 'react'

import { Card, Typography, Avatar, Button, IconButton  } from "@material-tailwind/react";
import AdminSidebar from '../../Components/Adminside/AdminSidebar';
import AdminCourseAddModal from '../../Components/Adminside/AdminCourseAddModal';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
 

 

function AdminCourseManagement() {

  const TABLE_HEAD = ["ID", "Course Image", "Course Name", "Description", "Course Fee", "Edit", "Delete"];


  const [courses, setCourses] = useState([])

  useEffect(() =>{

      fetchCourses();

  },[])


  const deleteCourses = async(courseId) => {
    try{
      const response = await axios.delete(`${BACKEND_BASE_URL}/adminside/coursemanage/${courseId}`);
      if (response.status === 204 ) {
        fetchCourses();
        toast.success()
      }
      

    }
    catch(error) {
      console.error('Error on deleting',error)
    }

  }



  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/adminside/courses/`);
      setCourses(response.data)
    }
    catch (error) {
      console.error('Error on fetching courses', error);
    }
  };


  const handleCourseAdded = () => {
    // This function will be called when a new course is added in AdminCourseAddModal
    fetchCourses(); // Refetch the courses after adding a new course
  };

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

    // Calculate total number of pages
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

    // Get current page's data
  const currentCourses = courses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Generate pagination buttons and their click handlers
    const getPageItemProps = (pageNumber) => ({
      onClick: () => setCurrentPage(pageNumber),
      className: pageNumber === currentPage ? "bg-blue-500 text-white" : "text-black bg-white",
    });

  


   return (
    <div>
      <div className='flex' >
        <AdminSidebar/>    
        <div className='relative flex flex-col w-full justify-between items-center '>
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

                      {currentCourses?.filter(course => !course.is_deleted)
                                      .map((course, index) => (
                      <tr key={course.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {index+1}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                          <Avatar src={`${BACKEND_BASE_URL}${course.course_image}`} alt="avatar" variant="rounded" />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {course.course_name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium  overflow-hidden whitespace-nowrap max-w-[200px]">
                            {course.description}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {course.course_fee}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                          <Link to={`/admineditcourse/${course.id}`} className='text-xl cursor-pointer'>
                             <FiEdit/></Link>
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                             <RiDeleteBin6Line className='text-xl cursor-pointer' onClick={()=> deleteCourses(course.id)}/> 
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
                <AdminCourseAddModal onCourseAdded={handleCourseAdded}  />
            </div>
          </div>
          
          <div className="mb-48 flex items-center gap-4">
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

export default AdminCourseManagement

