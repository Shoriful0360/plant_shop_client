

import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheckOutForm.css'
import Button from '../Shared/Button/Button';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({refetch,purchaseInfo,closeModal,totalQuantity}) => {
  const{customerInfo,PlantId,quantity,price}=purchaseInfo || {}
    const navigate=useNavigate()
    const [processing,setProcessing]=useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const[clientSecret,setClientSecret]=useState()

    const axiosSecure=useAxiosSecure()


    useEffect(()=>{
   axiosSecure.post('/create-payment-intent',{
        quantity:quantity,
        PlantId:PlantId
    })
    .then(res=>{
      setClientSecret(res.data.client_secret)
    })
   
  }),[]



    const handleSubmit = async (event) => {
      setProcessing(true)
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
      setProcessing(false)
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setProcessing(false)
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }

      // confirm payment

      const {paymentIntent}=await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name:customerInfo?.name ,
            email:customerInfo?.email,
          
          },
        },
      })
    
      if(paymentIntent.status ==='succeeded'){
        try{
         await axiosSecure.post('/order',{...purchaseInfo,transactionId:paymentIntent?.id})
       
          // decrease quantity
   await axiosSecure.patch(`/plant/quantity/${PlantId}`,{quantityUpdate:totalQuantity,status:'decrease'})
          toast.success('order success')
          navigate('/dashboard/my-orders')
          refetch()
      
         }catch (err){
     toast.error(err.response.data)
         }finally{
          setProcessing(false)
          closeModal()
         }
      }

    };



    return (
        <div>
           <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
       <div className='flex gap-2'>
       <Button type="submit"  disabled={!stripe || !clientSecret || processing} label={`Payload $${price}`}></Button>
       <Button onClick={closeModal} outline={true} label={'Cancel'} />
       </div>
   
    </form>
        </div>
    );
};

export default CheckOutForm;