
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white gro text-black'>
            <div className='bg-gray-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-gray-800 flex flex-col justify-between'>
                <div className="flex flex-col gap-1">
                    <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded ${isActive && "bg-gray-400"}`} title='chat'>
                        <IoChatbubbleEllipses
                            size={20}
                        />
                    </NavLink>

                    <div 
                        title='add friend' 
                        // onClick={()=>setOpenSearchUser(true)} 
                        className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-400 rounded' >
                        <FaUserPlus size={20}/>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <button 
                    className='mx-auto' 
                    // title={user?.name} 
                    // onClick={()=>setEditUserOpen(true)}
                    >
                        {/* <Avatar
                            width={40}
                            height={40}
                            // name={user?.name}
                            // imageUrl={user?.profile_pic}
                            // userId={user?._id}
                        /> */}
                    </button>
                    <button 
                        title='logout' 
                        // onClick={handleLogout}
                        className='w-12 h-12 flex justify-center hover:bg-gray-400 items-center cursor-pointer hover:bg-slate-200 rounded' 
                    >
                        <span className='-ml-2'>
                            <BiLogOut size={20}/>
                        </span>
                    </button>
                </div>
            </div>

            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-black gro'>Message</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>

                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
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

    </div>
    );
};

export default Sidebar;
