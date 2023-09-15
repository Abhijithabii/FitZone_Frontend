import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import trainerbg from '../../../img/course_background.avif'

function AllTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/adminside/trainers/`
      );

      setTrainers(response.data);
    } catch (error) {
      console.error("error on fetching", error);
    }
  };

  return (
    <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 bg-white">
      <div className="w-full ">
        <div
          className="w-full h-screen sticky top-0 "
          style={{
            backgroundImage: {trainerbg},
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-center pt-80 pl-16  font-serif text-6xl font-black ">
            Trainers
          </h1>
        </div>
      </div>
      <div className=" w-1/2 ">
        <div className=" py-20 mx-auto grid grid-cols-1 gap-2">
          {trainers.map((trainer, index) => (
            <div className="relative my-16 ">
              <div
                className="w-72 h-80 rounded-xl shadow-2xl overflow-hidden bg-green-600 flex items-end group"
                style={{
                  backgroundImage: `url(${BACKEND_BASE_URL}${trainer.trainer_photo})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="w-full h-24 bg-blue-gray-400 backdrop-blur-lg opacity-0 group-hover:opacity-100 duration-700 text-center">
                  <h1 className="text-white text-lg pb-5 pt-2">
                    {trainer.user.username}
                  </h1>
                  <h1 className="text-white">{trainer.course.course_name}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTrainers;
