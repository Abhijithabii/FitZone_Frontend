import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../common/CommonUrl";

function ProfileMenu() {
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  let { user, userProfile, logoutUser } = useContext(AuthContext);

  // const userProfile = user.userprofile_set.first();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleMenuItemClick = (label) => {
    if (label === "My Profile") {
      navigate("/profile");
    } else if (label === "Sign Out") {
      logoutUser();
    }
    closeMenu(); // Close the menu after clicking any item
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src={
              userProfile && userProfile.image
                ? `${BACKEND_BASE_URL}${userProfile.image}`
                : "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map((profilemenu, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={profilemenu.label}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
              onClick={() => handleMenuItemClick(profilemenu.label)} // Add onClick handler
            >
              {React.createElement(profilemenu.icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}

              <Typography
                as="span"
                variant="small"
                className="font-normal w-full "
                color={isLastItem ? "red" : "inherit"}
              >
                {profilemenu.label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: UserCircleIcon,
    path: "/",
  },

  // {
  //   label: "Classes",
  //   icon: CubeTransparentIcon,
  //   path: "/classes"
  // },
  // {
  //   label: "Schedules",
  //   icon: CodeBracketSquareIcon,
  //   path: "/schedules"
  // },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, path }, key) => (
        <Typography
          key={label}
          as={Link}
          to={path}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

//Navbar Component

function UserNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="sticky top-0 bg-white backdrop-blur-sm mx-auto z-50 p-4">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 text-3xl text-black cursor-pointer py-1.5 font-medium"
        >
          FitZone
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default UserNavbar;
