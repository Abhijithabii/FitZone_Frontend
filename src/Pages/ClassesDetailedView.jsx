import React, { useContext, useEffect, useState } from "react";
import UserNavbar from "../Components/Userside/UserNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../common/CommonUrl";
import { toast } from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import AuthContext from "../context/AuthContext";
import classbg from '../../img/classbg.jpg'

function ClassesDetailedView() {
  const [selectedTime, setSelectedTime] = useState("");

  const [courseStatus, setCourseStatus] = useState(false);

  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({});
  let { user } = useContext(AuthContext);

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const fetchCourseDetails = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/coursemanage/${courseId}/`)
      .then((res) => {
        setCourseData(res.data);
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };

  const fetchCorrespondantTrainer = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/related-trainers/${courseId}/`)
      .then((res) => {
        setTrainers(res.data);
      })
      .catch((error) => {
        toast.error("Something wrong in fetching trainers", error);
      });
  };

  const fetchCourseStatus = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/check-status/${courseId}/`, {
        params: {
          userId: user.user_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCourseStatus(true);
        }
      });
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchCorrespondantTrainer();
    fetchCourseStatus();
  }, []);

  const handleTrainerChange = (trainer) => {
    setSelectedTrainer(trainer);
  };

  return (
    <div>
      <div className="relative">
        <UserNavbar />
        <div className="absolute top-0 w-full">
          <div className="h-96 w-full">
            <img className="w-full h-full" src={classbg} alt="" />
          </div>
          <div className="absolute top-80 left-1/2 transform -translate-x-1/2  bg-white border rounded-3xl w-5/6">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="py-20 px-5 flex justify-center">
                <div className="w-72 h-72 rounded-3xl overflow-hidden bg-blue-gray-500">
                  <img
                    className="w-full h-full "
                    src={`${BACKEND_BASE_URL}${courseData?.course_image}`}
                    alt="course_image"
                  />
                </div>
              </div>
              <div className="py-20 px-5">
                <h1 className=" text-center text-4xl font-black">

                  <u>{courseData?.course_name} </u>
                </h1>
                <p className="text-center pt-16 text-xl">

                  {courseData?.description}
                </p>

                <p className="pt-16">
                  Price / Month : {courseData?.course_fee} /-{" "}
                </p>
              </div>
            </div>
            <hr />

            {!courseStatus ? (
              <div>
                {trainers.length > 0 ? (
                  <div className="w-full h-full px-10 mt-10">
                    <h1 className="text-center text-2xl font-medium">
                      Select A Trainer for Your Course
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer lg:grid-cols-4 gap-4">
                      {trainers
                        .filter(
                          (trainer) =>
                            trainer.available_morning ||
                            trainer.available_evening
                        )
                        .map((trainer, index) => (
                          <div
                            key={index}
                            className={`relative my-16 rounded-xl ${
                              trainer === selectedTrainer
                                ? "shadow-2xl shadow-green-600 transform transition-transform scale-105"
                                : "transform transition-transform scale-75"
                            }`}
                            onClick={() => handleTrainerChange(trainer)}
                          >
                            <div
                              className="w-72 h-80 rounded-xl  overflow-hidden  flex items-end group"
                              style={{
                                backgroundImage: `url(${BACKEND_BASE_URL}${trainer.trainer_photo})`,
                                backgroundSize: "cover",
                              }}
                            >
                              <div className="w-full h-24 bg-blue-gray-400 backdrop-blur-lg opacity-0 group-hover:opacity-100 duration-700 text-center">
                                <h1 className="text-white text-lg pb-5 pt-2">
                                  {trainer.user.username}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="my-8 text-center text-lg text-red-500 font-bold">
                    No trainers are available for this course.
                  </div>
                )}

                {(selectedTrainer.available_morning ||
                  selectedTrainer.available_evening) && (
                  <div className="flex mb-4 mt-8">
                    <h1 className=" text-lg p-5 font-bold">Select A Timing For Your Session</h1>
                    <div className=" w-40 lg:mr-16">
                      <label
                        htmlFor="Select Trainer"
                        className="block font-black text-gray-700 dark:text-black"
                      >
                        Select Time
                      </label>
                      <select
                        className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        {selectedTrainer.available_morning && (
                          <option value="morning">Morning</option>
                        )}
                        {selectedTrainer.available_evening && (
                          <option value="evening">Evening</option>
                        )}
                      </select>
                    </div>
                  </div>
                )}

                {(selectedTrainer.available_morning ||
                  selectedTrainer.available_evening) && (
                  <form
                    action={`${BACKEND_BASE_URL}/adminside/create-checkout-session/${courseData.id}/`}
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="selectedTrainerId"
                      value={selectedTrainer.id}
                    />
                    <input
                      type="hidden"
                      name="currentUserId"
                      value={user.user_id}
                    />
                    <input
                      type="hidden"
                      name="selectedTime"
                      value={selectedTime}
                    />
                    <Button type="submit" className="uppercase ml-20  my-10">
                      Buy Now
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <h1 className="my-16 text-center text-lg text-red-500 font-bold">
                You Already Purchased This Course And Its Valid
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassesDetailedView;

{
  /* { trainers.length>0 && (
                <div className="mb-4 mt-8 w-40">
                <label htmlFor="Select Trainer" className="block font-black text-gray-700 dark:text-black">Select Trainer</label>
                <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)} className="mt-1 block p-2 w-full rounded-md bg-gray-100 border-2 border-gray-500 focus:bg-white ring-0">
                <option value="">Select a Trainer</option>
                    {trainers?.map((trainer, index) => (
                        <option key={trainer.id} value={trainer.id}>{trainer.user.username}</option>
                    ))}
                </select>
                </div>


        )} */
}
