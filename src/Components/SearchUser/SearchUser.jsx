
import { Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";

const SearchUser = () => {

    const user = useSelector(state => state.user) ;
    const [userName , setUserName] = useState('') ;
    
    const { data : users = [] } = useQuery({
        queryKey : ['users' , user , userName] ,
        queryFn : async () => {
          const {data} = await axios.get(`http://localhost:5555/api/users`) ;
          return data ;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault() ;
    }

    return (
        <dialog id="my_modal_2" className="modal">
            
            <div className="modal-box bg-gray-100 gro">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                    <div className="relative flex w-full">
                        <Input
                            type="text"
                            label="User Name"
                            onChange={(e) => setUserName(e.target.value)}
                            className="pr-20"
                            containerProps={{
                            className: "min-w-0",
                            }}
                        />
                        <button
                            size="sm"
                            disabled={!userName}
                            className={`!absolute right-1 top-1 text-base rounded bg-black text-white w-10 h-8 flex items-center justify-center ${userName ? "" : "bg-gray-700"}`}
                        >
                            <IoIosSearch />
                        </button>
                    </div>
                </form>
                
                <div className="">
                    
                </div>

            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

      </dialog>
    );
};

export default SearchUser;
