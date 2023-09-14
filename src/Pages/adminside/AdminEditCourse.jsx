
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../../Components/Adminside/AdminSidebar'
import axios from 'axios'
import { BACKEND_BASE_URL } from '../../common/CommonUrl'
import { toast } from 'react-hot-toast'

const AdminEditCourse = () => { 
    //course id coming from the allcoursedetailes page
    const {courseId} = useParams()

    const navigate = useNavigate()
     
    //states to manage the course fields
    const [courseName, setCourseName] = useState('')
    const [courseFee, setCourseFee] = useState('')      
    const [description, setDescription] = useState('')
    const [courseImage, setCourseImage] = useState('')

    const [selectedImage, setSelectedImage] = useState(null);

    // console.log(courseName);
    // console.log(courseFee);
    // console.log(description);
 



    // State to hold the selected image preview URL
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    // Function to handle image selection
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile);
    
      // Create a preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
    };





    //calls fetch details to render whenever this page mounting
    useEffect(()=>{
        fetchCourseDetail();
    },[courseId])


    //fetching the correspondant course details
    const fetchCourseDetail = async () => {
        try{
            const response = await axios.get(`${BACKEND_BASE_URL}/adminside/coursemanage/${courseId}/`);
            const AllDetails = response.data
           
            //assigning each values to the correspondant states
            setCourseName(AllDetails.course_name)
            setCourseFee(AllDetails.course_fee)
            setDescription(AllDetails.description)
            setCourseImage(AllDetails.course_image)
            
        }
        catch(error)  {
            console.error("error on fetching data",error)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!courseName || !courseFee || !description) {
          toast.error("oopps..You Missed to update some fields")
          return
          
        }

        const formData = new FormData();
        formData.append('course_name', courseName);
        formData.append('description', description);
        formData.append('course_fee', courseFee);
        if (selectedImage) {
          formData.append('course_image', selectedImage);
        }
        
        
        try {
            
            const response = await axios.put(`${BACKEND_BASE_URL}/adminside/coursemanage/${courseId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct Content-Type for FormData
                  },
            })
            if (response.status === 200) {
              toast.success("Course Updated SuccessFully")
              navigate('/admincourses')
            }
            

        }catch (error) {
          if (error.response && error.response.data) {
    
              toast.error( error.response.data);
        
          } else {
              toast.error('Error on Updating the course', error);
          }
      }

    }


  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-1/2 border-2 flex justify-center pt-5 shadow-2xl rounded-xl h-3/4 '>
                <form className="grid grid-cols-4 gap-4 w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="col-span-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-name">
                      Course Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-course-name"
                      type="text"
                      placeholder=""
                      value={courseName}
                      onChange={(e)=>setCourseName(e.target.value)}
                      
                     
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-fee">
                      Course Fee
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-course-fee"
                      type="text"
                      placeholder=""
                      value={courseFee}
                      onChange={(e) => {
                        const inputText = e.target.value;
                        // Validate the input using a regular expression for positive integers
                        const isValid = /^\d+$/.test(inputText);
                    
                        // Only update the state if the input is valid or empty (allowing empty input)
                        if (isValid || inputText === '') {
                          setCourseFee(inputText);
                        }
                      }}
               
                 
                    />
                  </div>

                  <div className="col-span-2 row-span-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
                      Description
                    </label>
                    <textarea
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 pb-52 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                      
       
                    ></textarea>
                  </div>
            
                  <div className="col-span-2">
                    {/* Add an element to show the current image here */}
                    {/* For example: */}
                    {/* <img src={currentImageSrc} alt="Current Course Image" /> */}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-fee">
                      IMAGE
                    </label>
                    {imagePreviewUrl ? (
                  
                        <div className='py-3 px-4 pb-28 object-contain bg-gray-500' style={{ backgroundImage: `url(${imagePreviewUrl})`, backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                        ):(
                    <div className='py-3 px-4 pb-28 bg-gray-500' style={{ backgroundImage: `url(${BACKEND_BASE_URL}${courseImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                     
                    </div>
                        )}
                  </div>

                  <div className="col-span-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-image">
                      Update Image
                    </label>
                    <input
                      type="file"
                      id="grid-course-image"
                      accept="image/*"
                      onChange={handleImageChange}
   
                    />
                  </div>

                  <div className="col-span-1">
                    <Link
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                      to='/admincourses'
                 
                    >
                      Close
                    </Link>
                  </div>
                  <div className="col-span-1">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
   
                    >
                      Update
                    </button>
                    
                  </div>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default AdminEditCourse