import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Adminside/AdminSidebar";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July',
    'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/adminside/users/`);
      const filteredData = response.data.filter((user) => !user.is_staff);
      setUsers(filteredData);
    } catch (error) {
      toast.error("Error fetching users", error);
    }
  };

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

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/adminside/courses/`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error on fetching courses", error);
    }
  };

  const monthlypayments = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/monthly-purchase/`)
      .then((response) => {
        const data = response.data;
        setMonthlyData(data)
        console.log(data);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  const monthLabels = monthlyData.map((item) => {
    const monthIndex = item.month - 1; // Adjust month number to match array index
    return `${monthNames[monthIndex]} ${item.year}`;
  });


  const totalAmount = monthlyData.reduce((total, item) => {
    const totalPaymentAsInt = parseInt(item.total_payment, 10); // Parse as base 10 (decimal) integer
    return total + totalPaymentAsInt;
  }, 0);



  const revenueData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyData.map(item => item.total_payment),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueOptions = {
    scales: {
      x: {
        id: 'x',
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  


  

  useEffect(() => {
    fetchUsers();
    fetchTrainers();
    fetchCourses();
    monthlypayments();
  }, []);

  return (
    <div>
      <div className="flex">
        <AdminSidebar />
        <div className="w-full h-full ">
          <div className="px-10 mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4">
              <div className="w-44 h-44 bg-light-green-600 my-5 shadow-2xl rounded-2xl">
                <h1 className="text-lg text-center text-white font-bold mt-5">
                  Total Students
                </h1>
                <p className="text-3xl text-center mt-10 font-black text-white">
                  
                  {users.length}
                </p>
              </div>
              <div className="w-44 h-44 bg-teal-400 my-5 shadow-2xl rounded-2xl">
                <h1 className="text-lg text-center text-white font-bold mt-5">
                  Total Trainers
                </h1>
                <p className="text-3xl text-center mt-10 font-black text-white">
                  
                  {trainers.length}
                </p>
              </div>
              <div className="w-44 h-44 bg-deep-purple-500 my-5 shadow-2xl  rounded-2xl ">
                <h1 className="text-lg text-center text-white font-bold mt-5">
                  Total Courses
                </h1>
                <p className="text-3xl text-center mt-10 font-black text-white">
                  
                  {courses.length}
                </p>
              </div>
              <div className="w-44 h-44 bg-pink-600 my-5 shadow-2xl rounded-2xl">
                <h1 className="text-lg text-center text-white font-bold mt-5">
                  Total Revenue
                </h1>
                <p className="text-3xl text-center mt-10 font-black text-white">
                  
                  {totalAmount}
                </p>
              </div>
            </div>

            <div className="w-full h-96 p-8 bg-gray-200 mt-16">
            <Bar data={revenueData} options={revenueOptions} />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
