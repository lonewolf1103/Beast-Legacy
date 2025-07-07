import React from 'react'
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#EDEDED] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#AA89FF] mb-4">Welcome, {user?.name} 👋</h1>
      <p className="text-lg text-[#C06CFC]">Your progress will appear here soon.</p>
    </div>
  );
};

export default Dashboard;
