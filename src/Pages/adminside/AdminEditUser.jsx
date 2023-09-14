import React, { useEffect,useState } from 'react'
import AdminSidebar from '../../Components/Adminside/AdminSidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';

const AdminEditUser = () => {

    const {userId} = useParams();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
      const fetchUserDetails = async () => {
        try{
          const response = await axios.get(`${BACKEND_BASE_URL}/adminside/edit-user/${userId}`);
          setUserDetails(response.data);
        }catch (error) {
          console.error(error);
        }
        
      }
      fetchUserDetails();
    }, [userId])
  

  return (
    <div className='flex'>
        <AdminSidebar/>
        {userDetails ? (
        <div>
          <h1>User Edit Page - {userId}</h1>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Render other user details here */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default AdminEditUser
