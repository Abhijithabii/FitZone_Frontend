import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

function AdminTrainerAddModal({ onTrainerAdded }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Add a new state variable for controlling spinner visibility
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/adminside/courses/`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("error on fetching courses", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("course_id", selectedCourse);
    formData.append("image", selectedImage);

    try {
      setShowSpinner(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}/adminside/create-trainer/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct Content-Type for FormData
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setModalOpen(false);
        onTrainerAdded();
        setShowSpinner(false);
        toast.success("Trainer Added");
      }
    } catch (error) {
      setShowSpinner(false);
      toast.error("error on adding trainer");
    }
  };

  return (
    <div>
      {showSpinner && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-opacity-70 bg-white">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </div>
      )}
      <Button onClick={() => setModalOpen(!isModalOpen)}>
        {isModalOpen ? "X" : "Add New Trainer"}
      </Button>

      <div
        className={`modal z-20 backdrop-blur-sm border-2 p-5  ${
          isModalOpen
            ? "flex justify-center items-center fixed top-1/2 left-0 right-0 z-20 w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 h-[calc(100%-1rem)] max-h-full"
            : "hidden"
        }`}
      >
        <div className="modal-overlay z-50"></div>
        <div className="modal-container">
          <div className="modal-content p-20 border-green-500 rounded-3xl border-2">
            <h3 className="text-center font-black text-3xl text-gray-900 dark:text-black mb-4">
              Add New Trainer
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-8">
                <label
                  htmlFor="courseName"
                  className="block font-black text-gray-700 dark:text-black"
                >
                  Trainer Name
                </label>
                <input
                  type="text"
                  id="TrainerName"
                  className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-black text-gray-700 dark:text-black"
                >
                  Email ID
                </label>
                <input
                  type="email"
                  id="TrainerEmail"
                  className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseFee"
                  className="block font-black text-gray-700 dark:text-black"
                >
                  Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="courseImage"
                  className="block font-black text-gray-700 mb-2 dark:text-white"
                >
                  Trainer Image
                </label>
                <input
                  type="file"
                  id="courseImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Course preview"
                    className="mt-2 h-20 rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setModalOpen(false)}
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
  );
}

export default AdminTrainerAddModal;
