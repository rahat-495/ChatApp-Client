
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import {Input} from '@material-tailwind/react'

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const Register = () => {

  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{

    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(apiUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    setUploadPhoto(file) ;

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : data?.data?.display_url
      }
    })
  }

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault() ;
    e.stopPropagation() ;

    const URL = `http://localhost:5555/api/register`

    try {
        const response = await axios.post(URL,data)
        if(response.data.success){
          setData({
            name : "",
            email : "",
            password : "",
            profile_pic : ""
          }) ;
          toast.success('Registration Done !') ;
          navigate('/email') ;
        }
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className='mt-32'>
        <div className='bg-white w-full max-w-md text-black gro rounded overflow-hidden p-4 mx-auto'>
          <h3>Welcome to Chat app!</h3>

          <form className='grid gap-4 mt-5 text-black gro' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1'>
                <Input
                  color='blue'
                  label='Name'
                  type='text' 
                  name='name'
                  placeholder='enter your name' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <Input
                  color='blue'
                  label='Email'
                  type='email'
                  name='email'
                  placeholder='enter your email' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <Input
                  color='blue'
                  label='Password'
                  type='password'
                  name='password'
                  placeholder='enter your password' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>

                  <div className='h-14 bg-slate-200 flex justify-center items-center border border-[#9e9e9e] rounded hover:border-blue-600 cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


              <button
               className='btn btn-outline text-black hover:border-black'
              >
                Register
              </button>

          </form>

          <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register ;
