import Navbar from '../Components/login/Navbar'
import LoginForm from '../Components/login/LoginForm'

const Login = () => {
  
    return (

        
        <div className=' flex flex-col gap-15 h-screen   '>
            <div>
                <Navbar />
            </div>


            <div className='flex flex-col items-center '>
                <h2 className='font-semibold text-2xl'>Login</h2>
            </div>

            
            <div>
                <LoginForm />
            </div>

            
        </div>

        
    )
 }


export default Login