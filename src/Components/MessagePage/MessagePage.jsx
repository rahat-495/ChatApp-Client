
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import backgroundImage from '../../assets/wallapaper.jpeg'
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import moment from "moment";

const MessagePage = () => {
    
    const {userId} = useParams() ;
    const currentMessage = useRef(null) ;
    const [isOpen , setIsOpen] = useState(false) ;
    const [loading , setLoading] = useState(false) ;
    const [allMessage , setAllMessage] = useState([]) ;
    const [message , setMessage] = useState({
      text : "" ,
      imageUrl : "" ,
      videoUrl : "" ,
    })
    const [userData , setUserData] = useState({
        _id : "" ,
        name : "" ,
        email : "" ,
        online : false ,
        profile_pic : "" ,
    }) ;
    const user = useSelector(state => state?.user) ;
    const socketConnection = useSelector(state => state?.user?.socketConnection) ;

    useEffect(() => {
      if(currentMessage.current){
        currentMessage.current.scrollIntoView({behvior : "smooth" , block : "end"}) ;
      }
    } , [allMessage])

    useEffect(() => {
        if(socketConnection){
            
          socketConnection.emit('messagePage' , userId) ;
            
          socketConnection.on('messageUser' , (data) => {
            setUserData(data) ;
          })

          socketConnection.on("message" , (data) => {
            setAllMessage(data) ;
          })

        }
    } , [socketConnection , userId , user])

    const handleUploadImage = async (e) => {
      const file = e.target.files[0] ;
      const formData = new FormData() ;
      formData.append('file', file);
      formData.append('upload_preset', 'Chat-app-file');
      setLoading(true) ;
      const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL, formData);
      setMessage((preve) => {
        return {
          ...preve ,
          imageUrl : data?.url ,
        }
      })
      setLoading(false) ;
      setIsOpen(false) ;
    }
    
    const handleUploadVideo = async (e) => {
      const file = e.target.files[0] ;
      const formData = new FormData() ;
      formData.append('file', file);
      formData.append('upload_preset', 'Chat-app-file');
      setLoading(true) ;
      const {data} = await axios.post(import.meta.env.VITE_UPLOADING_ANYTHING_URL, formData);
      setMessage((preve) => {
        return {
          ...preve ,
          videoUrl : data?.url ,
        }
      })
      setLoading(false) ;
      setIsOpen(false) ;
    }

    const handleSendMessage = async (e) => {
      e.preventDefault() ;

      if(message?.text || message?.imageUrl || message?.videoUrl){
        if(socketConnection){
          socketConnection.emit('newMessage' , {
            sender : user?._id ,
            receiver : userId ,
            text : message?.text ,
            imageUrl : message?.imageUrl ,
            videoUrl : message?.videoUrl ,
            msgByUserId : user?._id ,
          })

          setMessage((preve) => {
            return{
              ...preve ,
              text : "" ,
              imageUrl : "" ,
              videoUrl : "" ,
            }
          })

        }
      }

    }

    return (
        <div style={{ backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
        <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
            <div className='flex items-center gap-4'>
                <Link to={"/"} className='lg:hidden'>
                    <FaAngleLeft size={25}/>
                </Link>
                <div>
                    <Avatar
                      width={40}
                      height={40}
                      imageUrl={userData?.profile_pic}
                      name={userData?.name}
                      userId={userData?._id}
                    />
                </div>
                <div>
                   <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{userData?.name}</h3>
                   <p className='-my-2 text-sm'>
                    {
                      userData.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>
                    }
                   </p>
                </div>
            </div>

            <div >
                  <button className='cursor-pointer hover:text-primary'>
                    <HiDotsVertical/>
                  </button>
            </div>
        </header>

        {/***show all message */}
        <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
                
              
                {/**all message show here */}
                <div className='flex flex-col gap-2 py-2 mx-2' 
                  ref={currentMessage}
                >
                  {
                    allMessage.map((msg,index)=>{
                      return(
                        <div key={index} className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-gray-700 text-white border border-black" : "bg-white border-black text-black border"}`}>
                          <div className='w-full relative'>
                            {
                              msg?.imageUrl && (
                                <img 
                                  src={msg?.imageUrl}
                                  className='w-full h-full object-scale-down'
                                />
                              )
                            }
                            {
                              msg?.videoUrl && (
                                <video
                                  src={msg.videoUrl}
                                  className='w-full h-full object-scale-down'
                                  controls
                                />
                              )
                            }
                          </div>
                          <p className='px-2'>{msg.text}</p>
                          <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                        </div>
                      )
                    })
                  }
                </div>


                {/**upload Image display */}
                {
                  message.imageUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-gray-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                      <div 
                        className='w-fit absolute top-0 right-0 cursor-pointer text-red-700 hover:text-red-900' 
                        onClick={() => setMessage((preve) => {
                          return {
                            ...preve ,
                            imageUrl : "" ,
                          }
                        })}>
                          <IoClose size={30}/>
                      </div>
                      <div className='bg-white rounded-lg'>
                          <img
                            src={message.imageUrl}
                            alt='uploadImage'
                            className='aspect-square w-full h-full max-w-sm  object-scale-down rounded-lg'
                          />
                      </div>
                    </div>
                  )
                }

                {/**upload video display */}
                {
                  message.videoUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-gray-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                      <div 
                        className='w-fit p-2 absolute top-0 right-0 cursor-pointer text-red-700 hover:text-red-600' 
                        onClick={() => setMessage((preve) => {
                          return {
                            ...preve ,
                            videoUrl : "" ,
                          }
                        })}
                      >
                          <IoClose size={30}/>
                      </div>
                      <div className='bg-white p-3'>
                          <video 
                            src={message.videoUrl} 
                            className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                            controls
                            muted
                            autoPlay
                          />
                      </div>
                    </div>
                  )
                }

                {
                  loading && (
                    <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
                      <span className="loading loading-spinner w-[300px] bg-gradient-to-tr from-blue-800 to-purple-700"></span>
                    </div>
                  )
                }
        </section>

        {/**send message */}
        <section className='h-12 mt-4 bg-white flex items-center px-4'>
            <div className='relative '>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'
                >
                  <FaPlus size={20} className={`${isOpen ? "rotate-45 duration-300" : "duration-500"}`}/>
                </button>

                {/**video and image */}
                {
                  isOpen && (
                    <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                    <form>
                        <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                            <div className='text-primary'>
                                <FaImage size={18}/>
                            </div>
                            <p>Image</p>
                        </label>
                        <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                            <div className='text-purple-500'>
                                <FaVideo size={18}/>
                            </div>
                            <p>Video</p>
                        </label>

                        <input 
                          type='file'
                          id='uploadImage'
                          onChange={handleUploadImage}
                          className='hidden'
                        />

                        <input 
                          type='file'
                          id='uploadVideo'
                          onChange={handleUploadVideo}
                          className='hidden'
                        />
                    </form>
                    </div>
                  )
                }
                
            </div>

            {/**input box */}
            <form 
            className='h-full w-full flex gap-2' 
            onSubmit={handleSendMessage}
            >
                <input
                  type='text'
                  placeholder='Type here message...'
                  className='py-0 px-4 outline-none w-full h-full'
                  value={message?.text}
                  onChange={(e) => {
                    setMessage((preve) => {
                      return{
                        ...preve ,
                        text : e.target.value
                      }
                    })
                  }}
                />
                <button className='text-primary hover:text-secondary'>
                    <IoMdSend size={28}/>
                </button>
            </form>
            
        </section>



  </div>
    );
};

export default MessagePage;
