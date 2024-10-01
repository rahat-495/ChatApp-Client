
import logo from '../../assets/logo.png'

const HomeDefaulComp = () => {
    return (
        <div className="w-full min-h-screen text-center play text-black flex flex-col items-center justify-center gap-3">
            <img src={logo} alt="logo" className='w-96'/>
            <h1 className="font-semibold text-3xl">Select User To Sent Message</h1>
        </div>
    );
};

export default HomeDefaulComp;
