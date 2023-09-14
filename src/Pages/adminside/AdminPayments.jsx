import React, { useEffect, useState, useRef } from "react";
import AdminSidebar from "../../Components/Adminside/AdminSidebar";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-hot-toast";
function AdminPayments() {
  const TABLE_HEAD = [
    "ID",
    "Date",
    "UserName",
    "Course Name",
    "Trainer Name",
    "Amount",
  ];
  const [payments, setPayments] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterdate, setFilterdate] = useState([]);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast.error("Please select the dates");
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      // Display a toast message (you can replace this with your own toast notification)
      toast.error("Start date must be before or equal to end date");
      return; // Quit the function if the dates are invalid
    }

    // Filter payments based on the selected date range
    let filteredPayments = payments.filter((payment) => {
      let paymentDate = new Date(payment.purchased_date);
      return paymentDate >= startDate - 1 && paymentDate <= endDate;
    });
    if (filteredPayments.length === 0) {
      toast.error("No details on this date");
    } else {
      setFilterdate(filteredPayments);
      toast.success("Succes");
    }
  };

  const fetchAllPayments = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/adminside/payments/`)
      .then((res) => {
        setPayments(res.data);
      })
      .catch((error) => {
        console.log("something wrong on fetching payments", error);
      });
  };

  useEffect(() => {
    fetchAllPayments();
  }, []);
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Payment Details",
    // onAfterPrint:()=>alert("Data saved in PDF")
  });

  return (
    <div>
      <div className="flex">
        <AdminSidebar />
        <div className="relative flex flex-col w-full justify-between items-center ">
          {/* Add filter dropdown */}

          <div className="overflow-x-auto mt-24 lg:w-3/4 w-full">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="flex justify-between py-5">
                <Button onClick={generatePDF}>DOWNLOAD</Button>
                <div className="w-full">
                  <div className="flex justify-center space-x-4">
                    <div>
                      <Input
                        type="date"
                        label="Start Date"
                        value={
                          startDate ? startDate.toISOString().split("T")[0] : ""
                        }
                        onChange={(e) =>
                          setStartDate(new Date(e.target.value)).setHours(
                            0,
                            0,
                            0,
                            0
                          )
                        }
                        // onChange={(e) => {
                        //   const selectedDate = new Date(e.target.value);
                        //   selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
                        //   setStartDate(selectedDate);
                        // }}
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        label="End Date"
                        value={
                          endDate ? endDate.toISOString().split("T")[0] : ""
                        }
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          selectedDate.setHours(23, 59, 59, 999); // Set time to 00:00:00
                          setEndDate(selectedDate);
                        }}
                      />
                    </div>
                    <div>
                      <Button onClick={handleSearch}>Search</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                <Card className="h-full w-full overflow-x-scroll">
                  <div ref={componentPDF} style={{ width: "100%" }}>
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
                        {(filterdate.length > 0 ? filterdate : payments).map(
                          (payment, index) => (
                            <tr
                              key={payment.id}
                              className="even:bg-blue-gray-50/50"
                            >
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
                                  {new Date(
                                    payment.purchased_date
                                  ).toLocaleDateString("en-GB")}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {payment.user.username}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium  overflow-hidden whitespace-nowrap max-w-[200px]"
                                >
                                  {payment.trainer.course.course_name}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {payment.trainer.user.username}
                                </Typography>
                              </td>
                              <td className="p-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  {payment.amount_paid}
                                </Typography>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* <div className="mb-48 flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
              <IconButton key={index} {...getPageItemProps(index + 1)}>
                {index + 1}
              </IconButton>
                ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminPayments;
