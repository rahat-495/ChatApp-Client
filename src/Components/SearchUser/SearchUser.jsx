
import { Input } from "@material-tailwind/react";

const SearchUser = () => {
    
    const handleSubmit = (e) => {
        e.preventDefualt() ;
    }

    return (
        <dialog id="my_modal_2" className="modal">
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
                required
                />

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
    );
};

export default SearchUser;
