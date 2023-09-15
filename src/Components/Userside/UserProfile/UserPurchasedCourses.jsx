import { Avatar, Button, Tooltip } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../common/CommonUrl";

function UserPurchasedCourses() {
  let { user } = useContext(AuthContext);

  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const fetchPurchasedCourses = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/purchasedcourses/${user.user_id}/`)
      .then((res) => {
        setPurchasedCourses(res.data);
      });
  };

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  return (
    <div>
      <h1 className="uppercase text-center text-2xl font-black py-8">
    
        <span className="tracking-tighter text-blue-500">
      
          ------------
        </span>
        Purchased Courses
        <span className="tracking-tighter text-blue-500 "> ------------</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-4 my-6">
        {purchasedCourses.map((course, index) => (
          <div
            key={course.id}
            className={`w-96 h-48 rounded-2xl hover:shadow-2xl ${
              course.selected_course.is_deleted
                ? "hover:shadow-red-500"
                : "hover:shadow-green-500"
            }  bg-blue-gray-100   `}
          >
            <div className="grid grid-cols-2 w-full h-full">
              <div className="flex items-center justify-center">
                <Avatar
                  variant="rounded"
                  className="w-32 h-32"
                  src={`${BACKEND_BASE_URL}${course.selected_course.course_image}`}
                  alt="avatar"
                  size="xxl"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-xl pt-5 ">
              
                  Course: {course.selected_course.course_name}{" "}
                </h1>
                <h1 className="pt-3">
                  Trainer: {course.selected_trainer.user.username}{" "}
                </h1>
                <p className="text-red-500 pt-6">
                  Expires In{" "}
                  {new Date(course.valid_up_to).toLocaleDateString("en-GB")}
                </p>
                {/* <p></p> */}
                {course.selected_course.is_deleted && (
                  <Tooltip content="This Course is removed you can continue upto the validity">
                    <Button color="red">Removed</Button>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPurchasedCourses;
