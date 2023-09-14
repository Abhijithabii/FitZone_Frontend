import { Avatar } from "@material-tailwind/react";
import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import UserProfileUpdate from "./UserProfileUpdate";
import { BACKEND_BASE_URL } from "../../../common/CommonUrl";
import UserPurchasedCourses from "./UserPurchasedCourses";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function UserProfileBanner() {
  let { user, userProfile } = useContext(AuthContext);

  return (
    <div>
      <div>
        <figure className="relative h-80 w-full">
          <img
            className="h-full w-full bg-gray-800 object-cover object-center"
            src="/img/profilebg.jpg"
            alt="nature image"
          />
          <div className="lg:px-14 mt-3">
            <div className="flex flex-col items-center border-2 bg-gray-100">
              <Avatar
                className="absolute border-4 top-64 w-32 h-32"
                src={
                  userProfile && userProfile.image
                    ? `${BACKEND_BASE_URL}${userProfile.image}`
                    : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                alt="avatar"
                size="xxl"
              />

              <h1 className="pt-16 text-xl h-fit w-fit">{user.username}</h1>
              <h1> {user.email} </h1>
              <div className="w-72 flex justify-between ml-auto mr-10">
                <UserProfileUpdate />
                <Link to={"/chat"}>
                  <BsChatDots className=" w-28 h-11  cursor-pointer" />
                </Link>
              </div>

              <div className="h-44 pt-10">
                <h1>Full Name : {userProfile && userProfile.full_name} </h1>
                <h1>Age : {userProfile && userProfile.age}</h1>
                <h1>Phone Number : {userProfile && userProfile.mobile} </h1>
                <h1>Blood Group : {userProfile && userProfile.blood_group} </h1>
              </div>
              <div className="flex lg:px-20">
                <UserPurchasedCourses />
              </div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}

export default UserProfileBanner;
