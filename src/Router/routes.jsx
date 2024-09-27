
import { createBrowserRouter } from "react-router-dom";
import Root from "../LayOut/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import CheckEmail from "../Pages/CheckEmail/CheckEmail";
import CheckPassword from "../Pages/CheckPassword/CheckPassword";
import MessagePage from "../Components/MessagePage/MessagePage";

const router = createBrowserRouter([
    {
        path : '/' ,
        element : <Root/>,
        children : [
            {
                path : '/' ,
                element : <Home/> ,
                children : [
                    {
                        path : ':userId' ,
                        element : <MessagePage/>,
                    },
                ],
            },
            {
                path : '/register' ,
                element : <Register/> ,
            },
            {
                path : '/email' ,
                element : <CheckEmail/> ,
            },
            {
                path : '/password' ,
                element : <CheckPassword/> ,
            },
        ] 
    },
])

export default router;
