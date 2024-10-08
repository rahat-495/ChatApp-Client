
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logOut, setOnlineUser, setSocketConnection, setUser } from "../../Redux/userSlice";
import Sidebar from "../../Components/Sidebar/Sidebar";
import io from 'socket.io-client' ;

const Home = () => {

    const user = useSelector(state => state.user) ;
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const {data : userDetails} = useQuery({
        queryKey : ['userDetails'] ,
        queryFn : async () => {
            const {data} = await axios.get(`http://localhost:5555/api/userDetails` , {withCredentials : true}) ;
            return data ;
        }
    })

    useEffect(() => {
        if(userDetails?.data?.logout && !user?.token){
            dispatch(logOut()) ;
            navigate('/email') ;
        }
        dispatch(setUser(userDetails?.data)) ;
    } , [dispatch , userDetails , navigate , user]) ;

    useEffect(() => {
        const socketConnection = io('http://localhost:5555' , {
            auth : {
                token : localStorage.getItem('token') ,
            }
        }) ;

        socketConnection.on('onlineUser' , (data) => {
            dispatch(setOnlineUser(data)) ;
        })

        dispatch(setSocketConnection(socketConnection)) ;
        
        return () => {
            socketConnection.disconnect() ;
        }
    } , [dispatch])

    return (
        <div className="min-h-[70vh] flex w-full gap-10">
            
            <div className="bg-white w-[250px] min-h-screen fixed">
                <Sidebar/>
            </div>

            <div className="w-full bg-gray-200 min-h-screen ml-[250px]">
                <Outlet/>
            </div>
            
        </div>
    );
};

export default Home;
