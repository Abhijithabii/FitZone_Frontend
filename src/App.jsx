
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Otp from './Pages/Otp';
import Home from './Pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
// import AuthenticatedUserRoute from './utils/AuthenticatedUserRoute';
import AdminLogin from './Pages/adminside/AdminLogin';
import AdminDashboard from './Pages/adminside/AdminDashboard';
import AdminUserManagement from './Pages/adminside/AdminUserManagement';
import AdminTrainerManagement from './Pages/adminside/AdminTrainerManagement';
import AdminCourseManagement from './Pages/adminside/AdminCourseManagement';
import AdminCourseSchedule from './Pages/adminside/AdminCourseSchedule';
import AdminAnnouncements from './Pages/adminside/AdminAnnouncements';
import AdminPayments from './Pages/adminside/AdminPayments';
import AdminEditUser from './Pages/adminside/AdminEditUser';
import AdminEditCourse from './Pages/adminside/AdminEditCourse';
import PageNotFound from './Pages/PageNotFound';
import ClassesDetailedView from './Pages/ClassesDetailedView';
import UserProfile from './Pages/UserProfile';
import TrainerHome from './Pages/Trainer/TrainerHome';
import Message from './Components/Userside/Message';
import Checkout from './Components/Userside/Checkout';
import StudentsListingPage from './Pages/Trainer/StudentsListingPage';
import TrainerProfile from './Pages/Trainer/TrainerProfile';
import Chat from './Components/Chat/Chat';
import TrainerChat from './Components/Chat/TrainerChat';






function App() {
  return (
 
    <div className="App">

      <Router>
        <AuthProvider>
        <Routes>
          
         
          {/* <Route exact path="/signup" element={<AuthenticatedUserRoute><Signup/></AuthenticatedUserRoute>} />
          <Route exact path="/login" element={<AuthenticatedUserRoute> <Login/> </AuthenticatedUserRoute> } /> */}

          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/verify-otp" element={<Otp/>} />

          <Route exact path="/" element={<Home/>} />
          <Route path='/classesdetails/:courseId' element={<PrivateRoute><ClassesDetailedView/></PrivateRoute>} />
          <Route exact path="/checkout/:course_id" element={<Checkout/>}/> 
          <Route exact path='/success' element={<Message/>}/> 

          <Route path='/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />
      


          <Route path='/trainer' element={<PrivateRoute><TrainerHome/></PrivateRoute>} />
          <Route path='/trainer/students/' element={<PrivateRoute><StudentsListingPage/></PrivateRoute>} />
          <Route path='/trainer/profile/' element={<PrivateRoute><TrainerProfile/></PrivateRoute>} />
          <Route path='/trainer/inbox' element={<PrivateRoute><TrainerChat/></PrivateRoute>} />


          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/admindashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />

          <Route path='/adminusers' element={<PrivateRoute><AdminUserManagement/></PrivateRoute>} />
          <Route path='/admin-editusers/:userId' element={<PrivateRoute><AdminEditUser/></PrivateRoute>} />

          <Route path='/admintrainers' element={<PrivateRoute><AdminTrainerManagement/></PrivateRoute>} />

          <Route path='/admincourses' element={<PrivateRoute><AdminCourseManagement/></PrivateRoute>} />
          <Route path='/admineditcourse/:courseId' element={<PrivateRoute><AdminEditCourse/></PrivateRoute>} />

          <Route path='/adminschedule' element={<PrivateRoute><AdminCourseSchedule/></PrivateRoute>} />
          <Route path='/adminannouncement' element={<PrivateRoute><AdminAnnouncements/></PrivateRoute>} />
          <Route path='/adminpayment' element={<PrivateRoute><AdminPayments/></PrivateRoute>} />
          <Route path='/*' element={<PageNotFound/>} />

          <Route path='/chat' element={<Chat/>} />


        </Routes>
        </AuthProvider>
      </Router>
 

    </div>

  );
}

export default App;
