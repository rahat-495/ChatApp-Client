
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { Input, Tooltip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const key = import.meta.env.VITE_IMAGE_HOISTING_API_KEY;
const apiUrl = `https://api.imgbb.com/1/upload?key=${key}`;

const Sidebar = () => {

  const user = useSelector((state) => state.user) ;
  const [data,setData] = useState({
    name : user?.name,
    profile_pic : user?.profile_pic ,
  })
  const [uploadPhoto,setUploadPhoto] = useState("") ;
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
    setData((preve) => {
      return {
        ...preve ,
        profile_pic : "" ,
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

  const handleSubmit = async(e)=>{
    e.preventDefault() ;
    e.stopPropagation() ;

    const URL = `http://localhost:5555/api/updateUser`

    try {
      console.log(data)
        const {data : resData} = await axios.post(URL,data , {withCredentials : true})
        if(resData.success){
          setData({
            name : "",
            email : "",
            password : "",
            profile_pic : ""
          }) ;
          toast.success('Profile Update Success Full !') ;
          document.getElementById("my_modal_1").close() ;
        }
      } catch (error) {
        console.log(error)
        toast.error('Some thing went wrong !') ;
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white gro text-black">
      <div className="bg-gray-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-gray-800 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded ${
                isActive && "bg-gray-400"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <div
            title="add friend"
            // onClick={()=>setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Tooltip
            content={"Update Profile"}
            placement="right-start"
            className="bg-gray-50 border font-semibold border-primary text-black gro"
            animate={{
              mount: { scale: 1, x: 0 },
              unmount: { scale: 0, x: -40 },
            }}
          >
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="mx-auto"
              // onClick={()=>setEditUserOpen(true)}
            >
              <Avatar
                width={30}
                height={40}
                name={user?.name}
                imageUrl={user?.profile_pic}
                userId={user?._id}
              />
            </button>
          </Tooltip>

          <button
            title="logout"
            // onClick={handleLogout}
            className="w-12 h-12 flex justify-center hover:bg-gray-400 items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-black gro">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {
            // allUser.length === 0 && (
            //     <div className='mt-12'>
            //         <div className='flex justify-center items-center my-4 text-slate-500'>
            //             <FiArrowUpLeft
            //                 size={50}
            //             />
            //         </div>
            //         <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
            //     </div>
            // )
          }

          {
            // allUser.map((conv,index)=>{
            //     return(
            //         <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
            //             <div>
            //                 <Avatar
            //                     imageUrl={conv?.userDetails?.profile_pic}
            //                     name={conv?.userDetails?.name}
            //                     width={40}
            //                     height={40}
            //                 />
            //             </div>
            //             <div>
            //                 <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
            //                 <div className='text-slate-500 text-xs flex items-center gap-1'>
            //                     <div className='flex items-center gap-1'>
            //                         {
            //                             conv?.lastMsg?.imageUrl && (
            //                                 <div className='flex items-center gap-1'>
            //                                     <span><FaImage/></span>
            //                                     {!conv?.lastMsg?.text && <span>Image</span>  }
            //                                 </div>
            //                             )
            //                         }
            //                         {
            //                             conv?.lastMsg?.videoUrl && (
            //                                 <div className='flex items-center gap-1'>
            //                                     <span><FaVideo/></span>
            //                                     {!conv?.lastMsg?.text && <span>Video</span>}
            //                                 </div>
            //                             )
            //                         }
            //                     </div>
            //                     <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
            //                 </div>
            //             </div>
            //             {
            //                 Boolean(conv?.unseenMsg) && (
            //                     <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
            //                 )
            //             }
            //         </NavLink>
            //     )
            // })
          }
        </div>
      </div>

      {
        // editUserOpen && (
        //     <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
        // )
      }

      {
        // openSearchUser && (
        //     <SearchUser onClose={()=>setOpenSearchUser(false)}/>
        // )
      }

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-gray-100 gro">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h3 className="font-bold text-lg">Update Your Profile</h3>
            <Input
              color="blue"
              label="Name"
              type="text"
              name="name"
              placeholder="enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              defaultValue={user?.name}
              onChange={(e) => setData((preve) => {
                return{
                  ...preve ,
                  name : e.target.value ,
                }
              })}
              required
            />
            
            <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>

                  <div className='h-12 bg-slate-20 gap-3 flex pl-3 items-center border border-[#9e9e9e] rounded hover:border-blue-600 cursor-pointer'>
                      <Avatar imageUrl={data?.profile_pic ? data?.profile_pic : user?.profile_pic} height={35} width={35}/>
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
               className='btn btn-outline text-black hover:border-gray-600 hover:bg-primary hover:text-white'
              >
                Update
              </button>
          </form>
        
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <button className="btn w-full">Close</button>
            </form>
          </div>

        </div>
      </dialog>

    </div>
  );
};

export default Sidebar;
