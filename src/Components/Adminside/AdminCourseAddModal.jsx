import axios from 'axios';
import React, {useRef, useState} from 'react'
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import { toast } from 'react-hot-toast';
import { Button } from "@material-tailwind/react";

function AdminCourseAddModal({ onCourseAdded }) {

  // Createted a ref to access the file input element
  const fileInputRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);


  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !description || !courseFee || !selectedImage) {
      toast.error("OOppss....You Missed To Fill Some Fields",{ duration: 3000,});
      return 
    }
  
    const formData = new FormData();
    formData.append('course_name', courseName);
    formData.append('description', description);
    formData.append('course_fee', courseFee);
    formData.append('course_image', selectedImage);
  
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/adminside/courses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct Content-Type for FormData
        },
      });
      if (response.status === 201) {
        toast.success('course added successfully')


        // Clear the file input after successful submission
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

        setCourseName('')
        setCourseFee('')
        setDescription('')
        setSelectedImage(null)
        setImagePreviewUrl(null)


        setModalOpen(false)
         // Call the onCourseAdded function to notify the parent component (AdminCourseManagement) that a new course is added.
         onCourseAdded();
      }
      

    } catch (error) {
      if (error.response && error.response.data) {

          toast.error( error.response.data);
    
      } else {
          toast.error('Error on creating the course', error);
      }
  }
  };
  

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




  return (
    <div >
   <Button
        type="button"
        
        onClick={() => setModalOpen(!isModalOpen)}
      >
        {isModalOpen ? 'X' : 'Add New Course'}
      </Button>

<div className={`modal z-50 backdrop-blur-sm border-2 p-5 rounded-2xl ${isModalOpen ? 'flex justify-center items-center fixed top-1/2 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 h-[calc(100%-1rem)] max-h-full' : 'hidden'}`}>
      <div className="modal-overlay z-50" ></div>
      <div className="modal-container">
        <div className="modal-content p-20 border-green-500 rounded-3xl border-2">
          <h3 className="text-3xl text-center font-black text-gray-900 dark:text-black mb-4">Add New Course</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8">
              <label htmlFor="courseName" className="block  font-black  text-gray-700 dark:text-black">Course Name</label>
              <input
                type="text"
                id="courseName"
                className="mt-1 block p-3 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                value={courseName}
                onChange={(e)=>setCourseName(e.target.value)}
       
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="  font-black block text-gray-700 dark:text-black">Description</label>
              <textarea
                id="description"
                className="mt-1 block p-3 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
 
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="courseFee" className="block  font-black text-gray-700 dark:text-black">Course Fee</label>
              <input
                type="text"
                id="courseFee"
                className="mt-1 block p-3 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
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
            <div className="mb-4">
              <label htmlFor="courseImage" className="block  font-black text-gray-700 dark:text-white">Course Image</label>
              <input
                type="file"
                id="courseImage"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                
              />
                {imagePreviewUrl && (
                  <img src={imagePreviewUrl} alt="Course preview" className="mt-2 h-20 rounded-md" />
                  )}
              
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={()=>setModalOpen(false)}
               
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminCourseAddModal
