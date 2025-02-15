/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,

} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Button from '../Shared/Button/Button'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from '../Form/CheckOutForm'
const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_KEY)

const PurchaseModal = ({ closeModal, isOpen,plant,refetch }) => {
  const axiosSecure=useAxiosSecure()
  const navigate=useNavigate()
  const {category,name,price,quantity,_id,seller}=plant || {}
  const {user}=useAuth()
  const[totalQuantity,setTotalQuantity]=useState(1)
  const [totalPrice,setTotalPrice]=useState(price)
  const [purchaseInfo,setPurchaseInfo]=useState({
    customerInfo:{
      name:user?.displayName,
      email:user?.email,
      image:user?.photoURL
    },
  
    price:totalPrice,
    quantity:totalQuantity,
    PlantId:_id,
    seller:seller?.email,
    address:'',
    status:'Pending'
  })
//  quantity updata
const handleQuantity=value=>{

  if(parseInt(value)>parseInt(quantity)){
    setTotalQuantity(value)

    return toast.error('Quantity exceeds available Stock')
  }
  if(value<0){
    setTotalQuantity(1)
    return toast.error('Quantity cannot by less than 1')
  }

  setTotalQuantity(value)
  setTotalPrice(parseInt(price) * value)
  setPurchaseInfo(prev=>{
    return {...prev ,quantity:value,price:parseInt(price) * value}
  })
}
// purchase plant

const handlePurchase=async()=>{
 try{
  await axiosSecure.post('/order',purchaseInfo)
  // decrease quantity
  await axiosSecure.patch(`/plant/quantity/${_id}`,{quantityUpdate:totalQuantity,status:'decrease'})
  toast.success('order success')
  navigate('/dashboard/my-orders')
  refetch()
 }catch (err){
console.log(err)
 }finally{
  closeModal()
 }


}

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category:{category} </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName} </p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: ${price} </p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity:{quantity} </p>
                </div>
                {/* quantity */}
                <div className='space-x-1 mt-3 text-sm'>
                <label htmlFor='quantity' className='text-gray-600'>
                  Quantity:
                </label>
                <input
                value={totalQuantity}
                onChange={(e)=>handleQuantity(parseInt(e.target.value))}
                  className=' px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>
              {/* address */}

              <div className='space-x-1 mt-3 text-sm'>
                <label htmlFor='quantity' className='text-gray-600'>
                 Address:
                </label>
                <input
                onChange={(e)=>setPurchaseInfo(prev=>{
                  return {...prev,address:e.target.value}
                })}
                  className=' px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='address'
                  id='address'
                  type='text'
                  placeholder='Shipping Address'
                  required
                />
              </div>
              <div className='mt-3'>
              {/* check out form */}
              <Elements stripe={stripePromise}>

                {/* checkOutForm */}
                <CheckOutForm
                totalQuantity={totalQuantity}
                purchaseInfo={purchaseInfo}
                refetch={refetch}
                closeModal={closeModal}
                ></CheckOutForm>

              </Elements>
              
              </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
