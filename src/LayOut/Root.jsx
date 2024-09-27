
import { Outlet } from "react-router-dom";
import Nav from "../Shared/Navbar/Nav";

const Root = () => {
    return (
        <div className="">

            <div className="sticky top-0 z-50 bg-opacity-0 backdrop-blur-md">
                <Nav/>
            </div>

            <div className="">
                <Outlet/>
            </div>

        </div>
    );
};

export default Root;
