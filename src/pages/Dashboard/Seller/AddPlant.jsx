import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../utilities/imageUpload'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddPlant = () => {
  const[imgUpload,setImgUpload]=useState({image:{name:'Upload Image'}})
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
 
  const {user}=useAuth()
  const handleSubmitPlant=async(e)=>{
    e.preventDefault()
    setLoading(true)
    const form=e.target;
    const name=form.name.value;
    const category=form.category.value;
    const description=form.description.value;
    const price=parseInt(form.price.value);
    const quantity=parseInt(form.quantity.value);
    const image=form.image.files[0];
    const imgUrl=await imageUpload(image)

    const plantData={name,category,description,price,quantity,imgUrl,
      seller:{
        name:user?.displayName,
        email:user?.email,
        photo:user?.photoURL
    }}
    
try{
await axios.post(`${import.meta.env.VITE_API_URL}/plant`,plantData)
toast.success('Successful')
navigate('/')

form.reset()

}catch (err){
console.log(err)
}finally{
setLoading(false)
}

  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmitPlant={handleSubmitPlant} imgUpload={imgUpload} setImgUpload={setImgUpload} loading={loading}  />
    </div>
  )
}

export default AddPlant
