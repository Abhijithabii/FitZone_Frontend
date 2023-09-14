import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/adminside/courses/`);
    setCourses(response.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 bg-white">
      <div className="w-full ">
        <div className="w-full h-full lg:h-screen sticky top-0 ">
          <img className=" relative" src="/img/course_background.avif" alt="" />
          {/* <h1 className=" absolute top-0 left-36 text-center pt-80 pl-16  font-serif text-6xl font-black " >
          Courses
        </h1> */}
        </div>
      </div>
      <div className=" w-full sm:w-1/2  ">
        <div className=" md:py-20 w-full grid grid-cols-1 gap-2">
          {courses
            .filter((course) => !course.is_deleted)
            .map((course, index) => (
              <Link
                to={`/classesdetails/${course.id}`}
                className="flex justify-center transform transition-transform hover:scale-105"
              >
                <Card className=" mt-6 mb-10  md:w-72  shadow-2xl">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src={`${BACKEND_BASE_URL}${course.course_image}`}
                      alt="card-image"
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-center"
                    >
                      {course.course_name}
                    </Typography>
                    <Typography className="text-center max-h-14 overflow-hidden">
                      {course.description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0 text-center">
                    {/* <Link to={`/classesdetails/${course.id}`} >
                    <Button >Read More</Button>
                  </Link> */}
                  </CardFooter>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
