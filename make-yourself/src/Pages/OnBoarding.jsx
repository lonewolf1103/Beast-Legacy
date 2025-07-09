
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import gandivxAvatar from "../assets/gandivx.png";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const questions = [
    {
      question: "What is your greatest struggle?",
      placeholder: "e.g. Procrastination, Laziness, Social Media",
      key: "struggle"
    },
    {
      question: "Choose your path:",
      options: ["Warrior", "Monk", "Balanced"],
      key: "path"
    },
    {
      question: "How many days a week can you commit to growth?",
      placeholder: "e.g. 3, 5, 7",
      key: "commitment"
    }
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleInput = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const nextStep = () => {
    if (step === questions.length - 1) {
      localStorage.setItem("onboarding", JSON.stringify(answers));
      navigate("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const current = questions[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-[#EDEDED] px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#C06CFC] bg-gradient-to-br from-[#0B0F1A] to-[#111827] shadow-[0_0_40px_#AA89FF55] p-8 space-y-6 text-center">

        {/* Avatar and Greeting */}
        <div className="space-y-2">
          <img
            src={gandivxAvatar}
            alt="GandivX"
            className="mx-auto h-16 w-16 rounded-full border border-[#AA89FF] shadow-[0_0_10px_#AA89FF99]"
          />
          <h2 className="text-2xl font-bold text-[#C06CFC]">
            GandivX Welcomes You, {user?.name || "Warrior"}
          </h2>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-[#EDEDED]">{current.question}</p>

          {current.options ? (
            <div className="flex justify-center gap-4">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    handleInput(current.key, opt);
                    nextStep();
                  }}
                  className="px-6 py-2 rounded-full border border-[#AA89FF] hover:bg-[#5A69F2] hover:text-white transition text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder={current.placeholder}
                value={answers[current.key] || ""}
                onChange={(e) => handleInput(current.key, e.target.value)}
                className="w-full bg-transparent border border-[#C06CFC] rounded-full px-4 py-2 text-sm placeholder:text-[#777] text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#AA89FF]"
              />
              <button
                onClick={nextStep}
                className="mt-2 w-full bg-[#5A69F2] hover:bg-[#6a78ff] text-white font-semibold py-2 rounded-full transition"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
