import axios from "axios"



export const imageUpload=async(img)=>{
    const formData=new FormData()
    formData.append('image',img)
  
 

    const {data}=await axios.post('https://api.imgbb.com/1/upload?key=d9108deeff02f30e1eb25f71aeade265',formData)
    return (data.data.display_url)
}