import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import gandivxAvatar from "../assets/gandivx.png";
import { useNavigate } from "react-router-dom";
import ChallengeCard from "../Components/ChallengeCard";

// Quotes and challenge seeds
const quotes = [
  "Brick by brick, your future is built.",
  "Discipline isn't punishment. It's power.",
  "You either suffer the pain of discipline or regret.",
  "Routine is the backbone of transformation.",
  "True warriors master the mundane"
];

const defaultChallenges = [
  {
    title: "Wake Up Before 7 AM",
    description: "Discipline starts early. Can you win the morning?"
  },
  {
    title: "No Social Media Today",
    description: "Silence the noise. Listen to your inner voice."
  },
  {
    title: "Workout / Walk for 30 Mins",
    description: "Move your body. Strength is built daily."
  }
];

const getToday = () => new Date().toISOString().split("T")[0];

const initialStreak = {
  count: 0,
  lastCompleted: null,
  rewardUnlocked: false
};

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [onboardingData, setOnboardingData] = useState(null);
  const [quote, setQuote] = useState("");
  const [challenges] = useState(defaultChallenges);
  const [challengeStatus, setChallengeStatus] = useState(() => {
    const stored = localStorage.getItem("challengeStatus");
    return stored
      ? JSON.parse(stored)
      : Array(defaultChallenges.length).fill(false);
  });

  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem("streakData");
    return stored ? JSON.parse(stored) : initialStreak;
  });

  const [proofs, setProofs] = useState(() => {
    const stored = localStorage.getItem("proofs");
    return stored ? JSON.parse(stored) : Array(defaultChallenges.length).fill(null)
  })

  // ✅ Load onboarding data and quote
  useEffect(() => {
    const stored = localStorage.getItem("onboarding");
    if (stored) {
      setOnboardingData(JSON.parse(stored));
    }

    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  // ✅ Reset challenges every new day
  useEffect(() => {
    const today = getToday();
    const last = localStorage.getItem("lastOpened");

    if (last !== today) {
      localStorage.setItem("lastOpened", today);
      const empty = Array(defaultChallenges.length).fill(false);
      setChallengeStatus(empty);
      localStorage.setItem("challengeStatus", JSON.stringify(empty));
    }
  }, []);

  // ✅ Mark challenge as complete and update streak
  const handleComplete = (index) => {
    const updated = [...challengeStatus];
    updated[index] = true;
    setChallengeStatus(updated);
    localStorage.setItem("challengeStatus", JSON.stringify(updated));

    const allCompleted = updated.every((val) => val === true);
    const today = getToday();

    if (allCompleted && streak.lastCompleted !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const isConsecutive = streak.lastCompleted === yesterdayStr;
      const newStreak = {
        count: isConsecutive ? streak.count + 1 : 1,
        lastCompleted: today,
        rewardUnlocked: isConsecutive && streak.count + 1 >= 3
      };

      setStreak(newStreak);
      localStorage.setItem("streakData", JSON.stringify(newStreak));
    }
  };

  const handleProofUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedProofs = [...proofs];
      updatedProofs[index] = reader.result
      setProofs(updatedProofs)
      localStorage.setItem("proofs", JSON.stringify(updatedProofs))
    }
    reader.readAsDataURL(file)
  };

  // 🔓 Logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("onboarding");
    setUser(null);
    navigate("/auth");
  };

  // 🛑 Prevent early return before hooks — show loader if no user
  if (!user) {
    return (
      <div className="text-center text-white py-12 text-xl">Authenticating...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#EDEDED] px-4 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Glowing BG */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#AA89FF22] via-transparent to-[#5A69F255] blur-2xl z-0 animate-pulse" />

      {/* Header */}
      <div className="relative z-10 w-full max-w-3xl flex items-center justify-between gap-4 border border-[#C06CFC] bg-gradient-to-br from-[#0B0F1A] to-[#111827] px-6 py-4 rounded-2xl shadow-[0_0_50px_#AA89FF33]">
        <div className="flex items-center gap-4">
          <img
            src={gandivxAvatar}
            alt="GandivX"
            className="h-14 w-14 rounded-full border border-[#AA89FF] shadow-[0_0_10px_#AA89FF99]"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#C06CFC]">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-[#aaa]">Your path begins now.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs text-[#888] hover:text-red-400 border border-[#444] px-3 py-1 rounded-full transition"
        >
          Logout
        </button>
      </div>

      {/* Identity + GandivX Message */}
      <div className="relative z-10 mt-8 w-full max-w-2xl space-y-4">
        <div className="p-4 border border-[#C06CFC] rounded-xl bg-[#111827]">
          <h2 className="text-lg font-semibold text-[#AA89FF]">🧱 Your Discipline Profile</h2>
          <p><span className="font-semibold">Struggle:</span> {onboardingData?.struggle}</p>
          <p><span className="font-semibold">Path:</span> {onboardingData?.path}</p>
          <p><span className="font-semibold">Commitment:</span> {onboardingData?.commitment} days/week</p>
        </div>

        <div className="p-4 border border-[#5A69F2] rounded-xl bg-[#0F172A]">
          <h2 className="text-lg font-semibold text-[#5A69F2]">🔥 GandivX Message</h2>
          <p className="text-sm text-[#EDEDED] italic">“{quote}”</p>
        </div>

        {/* Streak Tracker */}
        <div className="p-4 border border-[#C06CFC] rounded-xl bg-[#111827]">
          <h2 className="text-lg font-semibold text-[#AA89FF]">📅 Your Streak</h2>
          <p>
            <span className="font-semibold text-[#5A69F2]">{streak.count}</span>{" "}
            day{streak.count !== 1 ? "s" : ""} of consistent discipline.
          </p>
          {streak.rewardUnlocked ? (
            <div className="mt-2 text-green-400 font-semibold animate-pulse">
              🏆 You’ve unlocked a badge! (3-day streak)
            </div>
          ) : (
            <p className="text-sm text-[#aaa] mt-1 italic">
              Complete all challenges 3 days in a row to earn your first badge.
            </p>
          )}
        </div>
      </div>

      {/* 🏆 Badges */}
      <div className="p-4 border border-[#5A69F2] rounded-xl bg-[#0F172A]">
        <h2 className="text-lg font-semibold text-[#5A69F2]">🏅 Your Rewards</h2>
        {streak.rewardUnlocked ? (
          <div className="text-green-400 font-semibold mt-2 flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3534/3534064.png"
              alt="Badge"
              className="w-8 h-8"
            />
            <span>3-Day Streak – Beginner Beast</span>
          </div>
        ) : (
          <p className="text-sm text-[#aaa] italic">
            Earn your first badge by completing 3 days in a row.
          </p>
        )}
      </div>


      {/* Challenges */}
      <div className="relative z-10 mt-8 w-full max-w-2xl space-y-4">
        <h2 className="text-xl font-bold text-[#C06CFC] text-left mb-2">
          🔥 Your Discipline Challenges
        </h2>
        {challenges.map((challenge, index) => {
          const locked = index > 0 && !challengeStatus[index - 1];

          return (
            <ChallengeCard
              key={index}
              title={challenge.title}
              description={challenge.description}
              completed={challengeStatus[index]}
              locked={locked}
              proof={proofs[index]}
              onProofUpload={(e) => handleProofUpload(index, e.target.files[0])}
              onComplete={() => handleComplete(index)}
            />
          );
        })}

      </div>
    </div>
  );
};

export default Dashboard;
