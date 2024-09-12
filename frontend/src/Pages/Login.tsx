import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { login , LoginType} from '../Redux/Slices/authSlice.reducer.ts';
import { useAppDispatch } from '../Helpers/Hooks.ts';


function Login() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginType>({
        email: "",
        password: "",
    });

    function handleUserInput(e : React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(event : any)  {
        event.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        const logindata : LoginType = {
            email : loginData.email,
            password : loginData.password
        }

        // dispatch create account action
        const response = await dispatch(login(logindata));
        if(response?.payload?.success)
            navigate("/");

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        
            <div className='flex overflow-x-auto items-center justify-center h-[100vh] bg-white border-gray-200 border-5 '>
                <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>

                    <p className="text-center">
                        Donot have an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div>
        
    );
}

export default Login;