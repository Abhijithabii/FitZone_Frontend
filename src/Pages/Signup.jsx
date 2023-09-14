import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../common/CommonUrl";
import { toast } from "react-hot-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //checking both passwords are same
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match.");
      return;
    }

    // Make a POST request to back-end API for user registration
    try {
      setShowSpinner(true);
      const response = await axios.post(`${BACKEND_BASE_URL}/api/register/`, {
        username,
        email,
        password,
      });
      // Registration successful, redirect to the login page
      if (response.data.status === 200) {
        setShowSpinner(false);
        navigate(`/verify-otp?email=${response.data.data.email}`);
      } else {
        // Handle registration failure
        setShowSpinner(false);
        toast.error("Registration failed.");
      }
    } catch (error) {
      setShowSpinner(false);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      {showSpinner && (
        <div className=" fixed top-0 left-0 z-50 w-screen h-screen flex flex-col justify-center items-center  bg-white">
          <h1 className="text-4xl font-serif font-black py-10">
            You Are On The Way
          </h1>
          <img
            className="w-60 h-60 object-cover"
            src="/img/registration_loading.gif"
            alt=""
          />
        </div>
      )}
      <div
        className="flex flex-col md:flex-row h-screen bg-cover bg-center bg-opacity-70"
        style={{ backgroundImage: "url('/img/fitzonebg.jpg')" }}
      >
        <div className="flex justify-center md:w-1/2 ">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-md w-3/4 shadow-md rounded-3xl px-8 mb-4 md:mt-28 h-3/4 "
          >
            <h1 className="text-center text-white text-3xl pb-10 font-black">
              Sign UP
            </h1>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white "
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white"
                id="email"
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white"
                id="password1"
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block  text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white"
                id="password2"
                type="password"
                placeholder="*********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        {/* </div> */}

        {/* <div className='bg-green-300 sm:w-1/2 text-center'>Already have an account</div> */}
        <div className="flex flex-col justify-center md:w-1/2  text-white">
          {/* Content here */}
          <h1 className="text-center font-black text-3xl">
            Already have an account
          </h1>
          <p className="font-black text-3xl py-6 text-center">
            To keep connected with us please log in with your personal info
          </p>
          <Link
            className="p-2 text-center text-xlp-2 text-blue-600 rounded-lg border-2 border-blue-600 w-24 mx-auto my-5 mb-10 hover:bg-blue-700 hover:text-white"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
