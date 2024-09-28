
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import { Input } from '@material-tailwind/react';

const CheckEmail = () => {
  const [data,setData] = useState({
    email : "",
  })
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

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `http://localhost:5555/api/checkEmail`

    try {
        const response = await axios.post(URL,data) ;
        toast.success(response.data.message) ;

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message) ;
    }
  }


  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-sm text-black gro rounded overflow-hidden p-4 mx-auto'>

            <div className='w-fit mx-auto mb-2'>
                <PiUserCircle
                  size={80}
                />
            </div>

            <h3 className='text-center text-2xl font-semibold'>Welcome to Chat app !</h3>

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

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

              <button
               className='btn btn-outline text-black hover:border-gray-600 hover:bg-primary hover:text-white'
              >
                Let{"'"}s Go
              </button>

          </form>

          <p className='my-3 text-center'>New here go to ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
        </div>
    </div>
  )
}

export default CheckEmail ;