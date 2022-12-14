import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Login() {

    //   "username": "mor_2314",
    //   "password": "83r5^_"

    const navigate = useNavigate();
    const username = useRef();
    const password = useRef();

    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = username.current.value;
        const pass = password.current.value;
        axios({
            method: 'POST', url: 'https://fakestoreapi.com/auth/login', data: {
                username: user,
                password: pass
            }
        }).then(() => {
            navigate('/order-summary')
        }).catch((error) => {
            if (error.response) {
                setError(true);
            }
        }
        )
    }

    return (
        <div className="lg:container lg:mx-auto grid grid-cols-9 lg:grid-cols-12">
            <div className="col-span-9 lg:col-span-8 xl:col-span-9 bg-white h-auto lg:h-screen relative lg:px-10 p-6 lg:py-12">
                <p>
                    <svg className="inline" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 5L5 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <span className="cursor-pointer text-gray-500 font-normal text-base ml-2.5" onClick={() => navigate('/')}>Back
                        </span>
                    </svg>
                </p>
                <h3 className="font-semibold text-gray-800 text-4xl mt-2">Login</h3>
                <div className="mt-7 lg:mt-20">
                    <p className="font-normal text-sm text-gray-600 mb-3">Your details</p>
                    <h3 className="text-2xl text-gray-800 font-medium">Enter your details</h3>
                    <form className="mt-8" autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <input aria-label="emailAddress" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="email" placeholder="Username" ref={username} />

                            <input aria-label="password" className="border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none" type="password" placeholder="Password" ref={password} />
                        </div>
                    </form>
                </div>
                {
                    error && <p className="text-red-500 text-sm mt-2">Invalid email or password</p>
                }
                <button className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto" onClick={handleSubmit}>Login to confirm payment</button>
            </div>
        </div>
    );
}

