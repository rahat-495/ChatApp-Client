
import { Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const SearchUser = () => {

    const [search , setSearch] = useState('') ;
    const currentUser = useSelector(state => state.user) ;
    
    const { data : users = [] , isLoading = false } = useQuery({
        queryKey : ['users'  , search] ,
        queryFn : async () => {
          const {data} = await axios.post(`http://localhost:5555/api/searchUser` , {search} , {withCredentials : true}) ;
          return data ;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault() ;
        setSearch(e.target.name.value) ;
    }

    return (
        <dialog id="my_modal_2" className="modal">

            <div className="modal-box bg-gray-900 gro">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                    <div className="relative flex w-full">
                        <Input
                            name="name"
                            color="white"
                            type="text"
                            label="User Name"
                            className="pr-20"
                            containerProps={{
                            className: "min-w-0",
                            }}
                        />
                        <button
                            size="sm"
                            className={`!absolute right-1 top-1 text-base rounded bg-black text-white w-10 h-8 flex items-center justify-center ${search ? "" : "bg-gray-700"}`}
                        >
                            <IoIosSearch />
                        </button>
                    </div>
                </form>
                
                <div className="border border-white rounded-lg w-full my-3 min-h-12 flex flex-col cursor-pointer items-center justify-center gap-2 px-3">
                    {
                        isLoading && <span className="loading loading-infinity loading-lg bg-white"></span>
                    }
                    {
                        users?.length === 0 && !isLoading && <p className="text-white">No Users Found !</p>
                    }
                    {
                        users?.length > 0 && !isLoading && users?.map((user) => <Link key={user?._id} to={"/"+user?._id} className='flex items-center gro text-white gap-3 p-2 my-2 lg:p-1 w-full border border-transparent border-b-gray-200 hover:border hover:border-primary rounded-none hover:rounded-md duration-150 cursor-pointer'>
                                
                            <div>
                                <Avatar
                                    width={50}
                                    height={50}
                                    name={user?.name === currentUser?.name ? "You" : user?.name}
                                    userId={user?._id}
                                    imageUrl={user?.profile_pic}
                                />
                            </div>

                            <div>
                                <div className='font-semibold text-ellipsis line-clamp-1'>
                                    {user?.name === currentUser?.name ? "You" : user?.name}
                                </div>
                                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
                            </div>

                        </Link>)
                    }
                </div>

            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

      </dialog>
    );
};

export default SearchUser;
