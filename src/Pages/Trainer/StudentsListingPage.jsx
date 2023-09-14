import React, { useContext, useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import TrainerSidebar from "../../Components/TrainerSide/TrainerSidebar";

function StudentsListingPage() {
  const [students, setStudents] = useState([]);

  let { user } = useContext(AuthContext);

  const TABLE_HEAD = ["Id", "User", "End Date", "time_slot"];

  const fetchRelatedStudents = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/trainer-students/${user.user_id}/`)
      .then((res) => {
        setStudents(res.data);
      });
  };

  useEffect(() => {
    fetchRelatedStudents();
  }, []);

  return (
    <div className="flex">
      <TrainerSidebar />
      <div className="flex flex-col w-full h-full items-center">
        <div className="mt-16 mb-10 text-2xl">
          <h1>Students List</h1>
        </div>

        {students.length > 0 ? (
          <div className="h-full w-full lg:w-2/3">
            <Card className="h-full w-full overflow-x-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student.user.username}
                        </Typography>
                      </td>
                      {/* <td className='p-4' >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal">
                          {new Date(student.date).toLocaleDateString()}
                          </Typography>
                        </td> */}
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(student.valid_up_to).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student.time_slot}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl text-center mt-16 font-bold text-red-600">
              Currently You Have No Students
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentsListingPage;
