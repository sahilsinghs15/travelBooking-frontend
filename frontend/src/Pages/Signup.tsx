import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher.ts';
import { createAccount } from '../Redux/Slices/authSlice.reducer.ts';
import { UserData } from "../Redux/Slices/authSlice.reducer.ts";


function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState<UserData>({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    async function createNewAccount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.phoneNumber) {
            toast.error("Please fill all the details");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be at least 5 characters long");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("Invalid email address");
            return;
        }

        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 characters long with at least a number and special character");
            return;
        }

        const userData: UserData = {
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        phoneNumber: signupData.phoneNumber
    };

        const response = await dispatch<any>(createAccount(userData)); 
        if (response?.payload?.success) {
            navigate("/");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            phoneNumber: ""
        });
    }

    return (
        
        
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-black border-gray-200 border-5 w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName" className='font-semibold'> Name </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phoneNumber" className='font-semibold'> Phone Number </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter your phone number.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.phoneNumber}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Create account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>

                </form>
            </div>
      
    );
}

export default Signup;