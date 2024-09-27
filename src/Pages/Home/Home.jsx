
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-[70vh]">
            home
            <Outlet/>
        </div>
    );
};

export default Home;
