import { Button, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BACKEND_BASE_URL } from '../../common/CommonUrl'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-hot-toast'


function TrainerTimeChange({onTimingsChange}) {

    let {user} = useContext(AuthContext)
    const [timings, setTimings] = useState([])


    const [open, setOpen] = useState(false);
 
    const handleOpen = () => {setOpen(!open);
      fetchTimings();
    }


    const fetchTimings = async() => {
            axios
                .get(`${BACKEND_BASE_URL}/adminside/timechange/${user.user_id}/`)
                .then((res)=>{
                    setTimings(res.data)
                })
                .catch((error)=>{
                    console.log(error);
                })
        
    }

    useEffect(()=>{
        fetchTimings()
    },[])


    const handleCheckboxChange = (e) => {
        setTimings(prevTimings => ({
            ...prevTimings,
            [e.target.name]: !prevTimings[e.target.name]
        }));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios
                    .patch(`${BACKEND_BASE_URL}/adminside/timechange/${user.user_id}/`,timings)
                    .then((res)=>{
                        toast.success("Time Changed successfully")
                        setTimings(res.data);
                        onTimingsChange(res.data); 
                      
                    })
                    .catch(error=>{
                        toast.error("Updation failed")
                    })
    }

    


  return (
    <div>
        <Button onClick={handleOpen} variant="gradient">
        Update Timing
        </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Your Timings</DialogHeader>
        <form onSubmit={handleSubmit}>
        <DialogBody divider>
    
        <div>
            <div className='flex  flex-col px-5 pt-5'>
                <Checkbox name='available_morning' checked={timings.available_morning} label="Morning"
                    onChange={handleCheckboxChange}
                />
                <Checkbox name='available_evening' checked={timings.available_evening} label="Evening"
                    onChange={handleCheckboxChange}
                />
            </div>
            
        </div>
      
  
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type='submit' variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>

     
    </div>
  )
}

export default TrainerTimeChange
