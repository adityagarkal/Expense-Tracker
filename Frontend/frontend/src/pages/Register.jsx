import Navbar from "../Components/login/Navbar";
import RegisterForm from "../Components/register/RegisterForm";


const Register = () => {
     return(
        <div className=' flex flex-col gap-10 h-screen '>
            <div>
                <Navbar />
            </div>


            <div className='flex flex-col items-center '>
                <h2 className='font-semibold text-2xl'>Sign up</h2>
            </div>


            <div className='flex flex-col items-center '>
                <h4 className='font-medium text-1xl'>What should we call you?</h4>
            </div>


            <div>
                <RegisterForm />
            </div>
        
        </div>
     )
}

export default Register;