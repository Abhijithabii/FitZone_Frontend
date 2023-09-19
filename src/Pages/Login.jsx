import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import loginbgimage from '../../img/fitzonebg.jpg'


function Login() {
  
  let { loginUser } = useContext(AuthContext)
   
  const [showpassword, setShowpassword] = useState(false)

  const handleChange = (option) =>{
      setSelectedOption(option);
  }

   

return (
  <div>
    <div className='flex flex-col md:flex-row h-screen bg-blend-darken bg-cover bg-center'  style={{ backgroundImage: `url(${loginbgimage})`, backgroundSize: "cover" }}>
      <div className="flex flex-col justify-center md:w-1/2 pt-5  text-white">
          {/* Content here */}
        <h1 className='text-center font-black text-3xl '>Don't have an account</h1>
        <p className='font-black text-3xl py-6 text-center'>Enter Your Personal Details To Join with Us</p>
        <Link className="p-2 text-center text-xlp-2 text-blue-600 rounded-lg border-2 border-blue-600 w-24 mx-auto my-5 mb-10  hover:bg-blue-700 hover:text-white" to="/signup">
            Signup
        </Link>
      </div>
     
      <div className='w-full md:w-1/2 mx-auto'>
        <div className="w-full md:full lg:full xl:w-2/3 md:pt-32">
          <div className="card shadow-2xl rounded-lg bg-blend-darken backdrop-blur-md w-full">
            <div className="card-body p-5 text-center">
              <h3 className="text-center text-white text-3xl pt-5 pb-10 font-black">Log In</h3>
                <div className='pt-10'>
                <form onSubmit={ loginUser }>
                  <div className="mb-4">
                    <input
                      type="email"
                      name='email'
                      id="typeEmailX-2"
                      className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white"
                      placeholder="Email Address of User"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <input
                      type= { showpassword ? "text" : "password"}
                      name='password'
                      id="typePasswordX-2"
                      className="form-input w-full rounded-lg p-3 bg-transparent border-2 border-white text-white"
                      placeholder="Password"
                    />
                    { showpassword ? ( 
                    <BsFillEyeFill onClick={()=> setShowpassword(!showpassword)} className='absolute top-3 right-5 text-white w-7 h-7 cursor-pointer'   />
                    ) : (
                    <BsFillEyeSlashFill onClick={()=> setShowpassword(!showpassword)} className='absolute top-3 right-5 text-white w-7 h-7 cursor-pointer'   />
                    ) }
                  </div>
                  <div className='text-white'>
                    
                  </div>

                  {/* <div className="flex justify-end text-white">
                    <a href="#">Forgot Password</a>
                  </div> */}
                  <button className="bg-green-800 px-5 py-2 rounded-lg text-white my-3" type="submit">
                    Log IN
                  </button>

                </form>
                </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)
}
export default Login
