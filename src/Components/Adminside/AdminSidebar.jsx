import React, { useState, useEffect } from "react";
import { BsArrowLeft, BsSearch, BsChevronDown } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { SiTrainerroad } from "react-icons/si";
import { GiWhiteBook, GiTakeMyMoney } from "react-icons/gi";
import { MdSchedule, MdLogout } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { BiSolidDashboard } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import fitzonelogo from '../../../img/logo.png'

function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Define the medium breakpoint in pixels (you can adjust this value as needed)
  const mediumBreakpoint = 768;

  // Function to update the "open" state based on the window size
  const updateOpenState = () => {
    if (window.innerWidth < mediumBreakpoint) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // useEffect hook to add and remove event listener for window resize
  useEffect(() => {
    // Call the updateOpenState function initially to set the initial "open" state based on the window size
    updateOpenState();

    // Add event listener for window resize
    window.addEventListener("resize", updateOpenState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateOpenState);
    };
  }, []);

  const Menus = [
    { title: "DashBoard", icon: <BiSolidDashboard />, path: "/admindashboard" },
    { title: "Users", icon: <HiUsers />, path: "/adminusers" },
    { title: "Trainers", icon: <SiTrainerroad />, path: "/admintrainers" },
    {
      title: "Courses",
      spacing: true,
      icon: <GiWhiteBook />,
      path: "/admincourses",
    },
    // { title: "Scheduled Slots", icon: <MdSchedule/>, path: "/adminschedule" },
    // { title: "Announcements", icon: <TfiAnnouncement/>, path: "/adminannouncement" },
    { title: "Payments", icon: <GiTakeMyMoney />, path: "/adminpayment" },
    { title: "Logout", icon: <MdLogout />, path: "/adminlogin" },
    // {
    //     title: "Projects",
    //     icon: <GiWhiteBook/>,
    //     submenu: true,
    //     submenuItems: [
    //         { title: "SubMenu 1" },
    //         { title: "SubMenu 2" },
    //         { title: "SubMenu 3" },
    //     ],
    // },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple h-screen z-auto p-6 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative `}
      >
        <AiOutlineMenuFold
          className={` bg-white text-3xl text-dark-purple 
             absolute -right-3 top-9 border-2 border-black cursor-pointer ${
               !open && "rotate-180"
             } `}
          onClick={() => setOpen(!open)}
        />

        <div className=" inline-flex">
          <img
            src={fitzonelogo} // Replace 'path/to/your/image.png' with the actual image URL or path
            alt="FitZone Logo"
            className={`bg-amber-300 rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
            style={{ width: "40px", height: "40px" }} // You can adjust the width and height as needed
          />
          <h1
            className={` text-white origin-left pl-5 font-medium text-2xl duration-300 ${
              !open && "scale-0"
            } `}
          >
            FitZone
          </h1>
        </div>

        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={` text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            } `}
          />
          <input
            type="search"
            placeholder="search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            } `}
          />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className=" text-sm text-gray-300 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 "
                onClick={() => {
                  if (menu.path) {
                    navigate(menu.path);
                    // Navigate to the specified path if it exists
                  }
                }}
              >
                <span className=" text-2xl block float-left ">
           
                  {menu.icon}
                </span>
                <span
                  className={` text-base font-medium flex-1 duration-300 ${
                    !open && "hidden"
                  } `}
                >
         
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={` ${submenuOpen && "rotate-180"} `}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={index}
                      className=" text-sm text-gray-300 flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md mt-2 "
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
