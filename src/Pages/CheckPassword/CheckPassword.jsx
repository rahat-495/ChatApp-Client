
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Input, Tooltip } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/userSlice";

const CheckPassword = () => {

  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch() ;

  const splitName = location?.state?.name?.split(" ");

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [location, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `http://localhost:5555/api/checkPassword`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token)) ;
        localStorage.setItem("token", response?.data?.token) ;

        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ]

  const randomNumber = Math.floor(Math.random() * 9)

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm gro text-black rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          <Tooltip
            className={"bg-white border text-black gro font-semibold"}
            content={location?.state?.email}
          >
            {location?.state?.profile_pic ? (
              <img
                className="w-20 h-20 cursor-pointer rounded-full border border-primary"
                src={location?.state?.profile_pic}
                alt=""
              />
            ) : (
              <div className={`w-20 h-20 cursor-pointer rounded-full border border-primary flex flex-col items-center justify-center ${bgColor[randomNumber]}`}>
                <p className="font-semibold text-xl">{splitName[0].slice(0,1)}{splitName[1].slice(0,1)}</p>
              </div>
            )}
          </Tooltip>
          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>

        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Input
              color="blue"
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="btn btn-outline text-black hover:border-gray-600 hover:bg-primary hover:text-white">
            Login
          </button>
        </form>

        <p className="my-3 text-center">
          <Link
            to={"/forgatePassword"}
            className="hover:text-primary font-semibold"
          >
            Forgot password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPassword;
