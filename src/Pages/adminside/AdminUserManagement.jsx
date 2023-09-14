import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Components/Adminside/AdminSidebar';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { FaUnlockAlt, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import { toast } from 'react-hot-toast';
import { Button, Card, IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function AdminUserManagement() {

  const TABLE_HEAD = ["ID", "User Name", "Email", "Action"];



  const [users, setUsers] = useState([]);
  
  const [isModalOpen, setModalOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Add a new state variable for controlling spinner visibility
  const [showSpinner, setShowSpinner] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/adminside/users/`);
      const filteredData = response.data.filter((user) => !user.is_staff);
      setUsers(filteredData);
    } catch (error) {
      toast.error('Error fetching users', error);
    }
  };

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const AddUser = async (e) => {
    e.preventDefault();
    try {
      setModalOpen(false);
      // Show the spinner while waiting for the response
      setShowSpinner(true);
      const response = await axios.post(`${BACKEND_BASE_URL}/adminside/add-user/`, {
        username,
        email,
      });
      console.log(response);
      if (response.status === 201) {
        // After adding a new user successfully, fetch the updated users list
        toast.success("New User Added Succesfully")
        fetchUsers();
        navigate('/adminusers');
         // Clear the input fields
        setUsername('');
        setEmail('');
      }
    } catch (error) {
      console.error('Error adding user', error);
    }
     // Hide the spinner once the operation is complete
    setShowSpinner(false);
    
  };


  const userBlockUnblock = (userId) => {
    try {
      axios.put(`${BACKEND_BASE_URL}/adminside/edit-user/${userId}/`)
        .then(response => {
          toast.success(response.data)
          fetchUsers() 
        })
  
    } catch (error) {
      toast.error("Error on working", error);
      // Handle errors here if any
    }
  };


  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

    // Calculate total number of pages
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    // Get current page's data
  const currentUsers = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Generate pagination buttons and their click handlers
    const getPageItemProps = (pageNumber) => ({
      onClick: () => setCurrentPage(pageNumber),
      className: pageNumber === currentPage ? "bg-blue-500 text-white" : "text-black bg-white",
    });


  return (
      <div>
        <div className='flex' >
          <AdminSidebar/>
          <div className="flex flex-col w-full items-center mt-20">
            <Button
              className='self-start ml-10 lg:ml-32  text-white rounded-lg'
              type='button'
              onClick={handleModalToggle}>
              Add User
            </Button>


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








            {isModalOpen && (
            <div id="authentication-modal" className="flex justify-center items-center fixed top-1/2 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={handleModalToggle}>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className=" h-fit px-6 py-6 lg:px-8">
                    {/* Modal content goes here */}
                    <h3 class="mb-4 text-xl font-medium text-center pb-3 text-gray-900 dark:text-white">Add New User</h3>
                    <form class="space-y-6" action="#" onSubmit={AddUser}>
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                          <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter User Name" required
                             onChange={(e)=>setUsername(e.target.value)}
                             value={username}
                             />
                      </div>

                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email Address " required 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            />
                      </div>



                      {/* <div className=''>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                      </div> */}


                      <div className='flex justify-end'>
                        
                        <Button color="green" type="submit" class=" w-fit text-whitefont-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Submit</Button>
                      </div>
                              
                    </form>
                  </div>
                </div>
              </div>
            </div>
                )}

            <h1 className=' text-3xl text-black font-bold py-5'>User List</h1>
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
                      {currentUsers.map((user, index) => (
                      <tr key={user.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {index+1}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {user.username}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {user.email}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            { !user.is_blocked ?  (
                                <FaUnlockAlt onClick={()=>userBlockUnblock(user.id)} className='text-xl cursor-pointer'/>
                              ) : (
                                <FaLock onClick={()=>userBlockUnblock(user.id)} className='text-xl cursor-pointer'/>
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
            </div>


            <div className="pt-28 flex items-center gap-4">
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

export default AdminUserManagement





// <table className="min-w-full text-left text-sm font-light border-gray-600 border-2">
//                     <thead className="border-b font-medium dark:border-neutral-500">
//                       <tr className=' text-white bg-slate-500'>
//                         <th scope="col" className="px-6 py-4">ID</th>
//                         <th scope="col" className="px-6 py-4">Username</th>
//                         <th scope="col" className="px-6 py-4">Email ID</th>
//                         <th scope="col" className="px-6 py-4 text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       { users.map((user, index) => (

                      
//                       <tr key={user.id} className="border-b dark:border-neutral-500">
//                         <td className="whitespace-nowrap px-6 py-4 font-medium"> { index+1 } </td>
//                         <td className="whitespace-nowrap px-6 py-4"> { user.username } </td>
//                         <td className="whitespace-nowrap px-6 py-4"> { user.email } </td>
//                         <td className="whitespace-nowrap px-6 py-4 flex justify-evenly">
//                           {/* <Link to={`/admin-editusers/${user.id}`} className='text-xl cursor-pointer'>
//                           <FiEdit/></Link> */}
//                           { user.is_blocked ? ( 
//                           <FaLock onClick={()=>userBlockUnblock(user.id)} className='text-xl cursor-pointer'/>
//                           ) : (
//                           <FaUnlockAlt onClick={()=>userBlockUnblock(user.id)} className='text-xl cursor-pointer'/>
//                           )}
//                         </td>
//                       </tr>
                    
//                     )) } 
//                     </tbody>
//                   </table>
