import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gandivxAvatar from "../assets/gandivx.png";
import { useAuth } from "../Context/AuthContext"; // ✅ added

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth(); // ✅ use context to update global state

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };

    // ✅ Store in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Update global context
    setUser(userData);

    // ✅ Redirect to onboarding
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#EDEDED] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#C06CFC] bg-gradient-to-br from-[#0B0F1A] to-[#111827] shadow-[0_0_40px_#AA89FF55] p-8 space-y-6 backdrop-blur-md">
        
        <div className="text-center space-y-2">
          <img
            src={gandivxAvatar}
            alt="GandivX"
            className="mx-auto h-16 w-16 rounded-full border border-[#AA89FF] shadow-[0_0_10px_#AA89FF99]"
          />
          <h2 className="text-2xl font-bold text-[#C06CFC]">
            {isLogin ? "Welcome Back" : "Reveal Yourself"}
          </h2>
          <p className="text-sm text-[#aaa]">
            {isLogin
              ? "Enter your sacred details to continue."
              : "Only those who commit may continue the path."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border border-[#C06CFC] rounded-full px-4 py-2 text-sm text-[#EDEDED] placeholder:text-[#777] focus:outline-none focus:ring-2 focus:ring-[#AA89FF]"
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-[#C06CFC] rounded-full px-4 py-2 text-sm text-[#EDEDED] placeholder:text-[#777] focus:outline-none focus:ring-2 focus:ring-[#AA89FF]"
          />

          <button
            type="submit"
            className="w-full bg-[#5A69F2] hover:bg-[#6a78ff] text-white font-semibold py-2 rounded-full transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-[#888] hover:text-[#C06CFC] transition"
          >
            {isLogin
              ? "New here? Reveal yourself first."
              : "Already known? Return to login."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
