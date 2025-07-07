import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [name, setName] = useState("")
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!name) return alert("Please enter your name")
        setUser({ name })
        navigate('/dashboard')
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-[#EDEDED] px-4">
            <div className="w-full max-w-md bg-[#111827] border border-[#C06CFC] rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 mb-4 bg-transparent border border-[#5A69F2] rounded text-[#EDEDED] outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-[#5A69F2] hover:bg-[#C06CFC] text-white font-semibold py-2 rounded"
                >
                    Enter
                </button>
            </div>
        </div>
    );
};

export default Login;