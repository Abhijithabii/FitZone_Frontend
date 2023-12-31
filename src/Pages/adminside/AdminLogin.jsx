import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function AdminLogin() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <div
        className="flex justify-center md:flex-row h-screen bg-cover bg-center bg-opacity-70"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/hd/fitness-muscular-man-rear-shot-o7hjg0p7g1afqd8t.jpg')",
        }}
      >
        <div className="flex justify-center items-center w-full md:w-1/2">
          <form
            onSubmit={loginUser}
            className="w-3/4 shadow-md rounded-3xl px-8 mb-4 md:mt-28 h-3/4 "
          >
            <h1 className="text-center text-white text-3xl pb-10 font-black">
              Log In
            </h1>
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
                name="email"
                placeholder="Enter Your Email Address"
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
                id="password"
                type="password"
                name="password"
                placeholder="*********"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
