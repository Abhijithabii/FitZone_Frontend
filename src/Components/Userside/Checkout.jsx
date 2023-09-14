import React,{useState, useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { BACKEND_BASE_URL } from '../../common/CommonUrl';
import axios from 'axios';



const stripePromise = loadStripe("pk_test_51NcRgPSHZuNlr979HG20whbbumeFPW5zLS9wXXRM5Kd9nGrN7iU7z5ABhdNvCuILgWjKkulK2sTrCFXZ3O7OUA3e00y2gS8KOM");

const Checkout = () => {
   
    const [clientsecret, setClientSecret]=useState('')
    const {course_id}=useParams();
    console.log(course_id)

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_BASE_URL}/adminside/create-checkout-session/${ course_id }/`);
                
                console.log(response); // Log the response
                const data = response.data;
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Error fetching checkout session:', error);
                // Handle the error, e.g., show an error message to the user
            }
        };
    
        fetchCheckoutSession();
    }, [course_id]);
    
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret:clientsecret
      };

      

     
  return (
    <div className='container'>
        {clientsecret && (
        <Elements  stripe={stripePromise} options={options}>
             <PaymentForm/>
        </Elements>
      )}
    </div>
  )
}

export default Checkout