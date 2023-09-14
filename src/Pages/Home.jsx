import React, { useContext } from "react";
import Banner from "../Components/Userside/Banner";
import AuthContext from "../context/AuthContext";
import UserNavbar from "../Components/Userside/UserNavbar";
import AllCourses from "../Components/Userside/AllCourses";
import AllTrainers from "../Components/Userside/AllTrainers";
import Footer from "../Components/Userside/Footer";

function Home() {
  // const {user} = useContext(AuthContext)
  return (
    <div className="relative">
      <UserNavbar />
      <div className="absolute top-0 w-full">
        <Banner />
        <div className=" pt-5">
          <AllCourses />
          <br />
          <hr className="border-2" />
          <AllTrainers />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
