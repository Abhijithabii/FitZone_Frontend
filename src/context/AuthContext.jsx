import { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { BACKEND_BASE_URL } from '../common/CommonUrl';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)

    const [userProfile, setUserProfile] = useState(() => (localStorage.getItem('userprofileupdated') ? JSON.parse(localStorage.getItem('userprofileupdated') ) : null));
    



    const fetchUserDatas = async(user_id) => {
        await axios.get(`${BACKEND_BASE_URL}/api/updateprofile/${user_id}`).then(res=>{
            setUserProfile(res.data)
            localStorage.setItem('userprofileupdated', JSON.stringify(res.data) );
    
            
            
        })
        
    }
    


    const updateUserProfile = async (newUserProfile) => {
         await axios
                    .put(`${BACKEND_BASE_URL}/api/updateprofile/${user.user_id}/`,newUserProfile, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                      })
                    .then((res)=>{
                        console.log(res.data);
                        setUserProfile(res.data)
                        localStorage.setItem('userprofileupdated', JSON.stringify(res.data) );
                    })
        
      };
    

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch(`${BACKEND_BASE_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: e.target.email.value, password: e.target.password.value })
        });
       

        let data = await response.json();

        console.log(data,'------dataaaaa');
        

        if(data.access){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            let userdata = jwtDecode(data.access)


            fetchUserDatas(userdata.user_id)
            
            if (userdata.is_superuser === true)  {
                navigate('/admindashboard')
                toast.success("Login Successfull")
            }
            else if (userdata.is_staff === true) {
                navigate('/trainer')
                toast.success("Login Successfull")
            }
             else {
            navigate('/')
            toast.success("Login Successfull")
            }
        } else {
            toast.error('Something went wrong while logging in the user!')
        }
    }

    let logoutUser = (e) => {
        localStorage.removeItem('authTokens')
        localStorage.removeItem('userprofileupdated')
        setAuthTokens(null)
        setUser(null)
        setUserProfile(null)
        navigate('/login')
    }

    // const updateToken = async () => {
    //     const response = await fetch(`${BACKEND_BASE_URL}/api/token/refresh/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({refresh:authTokens?.refresh})
    //     })
       
    //     const data = await response.json()
    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwtDecode(data.access))
    //         localStorage.setItem('authTokens',JSON.stringify(data))
    //     } else {
    //         logoutUser()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }

    let contextData = {
        user:user,
        authTokens:authTokens,
        userProfile:userProfile,
        loginUser:loginUser,
        logoutUser:logoutUser,
        updateUserProfile: updateUserProfile,
 
    }

    // useEffect(()=>{
    //     if (loading) {
    //         updateToken()
    //     }
    //     const REFRESH_INTERVAL = 1000 * 60 * 10 // 10 minutes
    //     let interval = setInterval(()=>{
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, REFRESH_INTERVAL)
    //     return () => clearInterval(interval)

    // },[authTokens,loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}