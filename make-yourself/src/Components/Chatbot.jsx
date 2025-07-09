import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import gandivxAvatar from "../assets/gandivx.png";

const ChatBot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: user
        ? `Welcome back, ${user.name}. What do you need help with today?`
        : "I’m GandivX. Speak, young warrior — what burdens your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showIdentityGate, setShowIdentityGate] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (!user && messages.length >= 3) {
        // Show identity gate after 2 responses
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I wish to help you... but I must know who you are. Reveal yourself.",
          },
        ]);
        setIsTyping(false);
        setTimeout(() => setShowIdentityGate(true), 1200);
      } else {
        const botReply = user
          ? `Brick by brick, ${user.name}, that’s how legacies are built.`
          : "Let me understand your path first...";

        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
        setIsTyping(false);

        if (!user && messages.length === 1) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                sender: "bot",
                text: "I can only walk with those who reveal their identity.",
              },
            ]);
          }, 1500);
        }
      }
    }, 1000);
  };

  return (
    <>
      {/* Main Chat UI */}
      <div className="w-full max-w-6xl h-[300px] rounded-3xl border border-[#C06CFC] bg-gradient-to-br from-[#0B0F1A] to-[#111827] shadow-[0_0_30px_#AA89FF33] flex overflow-hidden backdrop-blur-md">

        {/* LEFT: Avatar & Title */}
        <div className="w-[250px] bg-[#0B0F1A] border-r border-[#1f2937] flex flex-col items-center justify-center gap-4 p-4">
          <img
            src={gandivxAvatar}
            alt="GandivX"
            className="h-20 w-20 rounded-full border border-[#AA89FF] shadow-[0_0_15px_#AA89FF99]"
          />
          <h2 className="text-[#C06CFC] font-semibold text-center text-sm leading-tight">
            GandivX<br />Your Legacy Mentor
          </h2>
        </div>

        {/* RIGHT: Messages + Input */}
        <div className="flex-1 flex flex-col justify-between p-4 space-y-2">

          {/* Message window */}
          <div className="flex-1 overflow-y-auto space-y-2 text-sm text-[#EDEDED] pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`w-fit max-w-[75%] px-4 py-2 rounded-2xl ${
                  msg.sender === "bot"
                    ? "bg-[#1C2233] text-[#AA89FF] rounded-bl-none"
                    : "bg-[#5A69F2] text-white ml-auto rounded-br-none"
                } shadow-md`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="bg-[#1C2233] text-[#AA89FF] px-4 py-2 rounded-2xl w-fit shadow-md animate-pulse">
                GandivX is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input field */}
          <div className="pt-2 border-t border-[#1f2937]">
            <input
              className="w-full bg-transparent text-sm text-[#EDEDED] border border-[#C06CFC] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AA89FF] placeholder:text-[#888]"
              placeholder="Ask your mentor..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
        </div>
      </div>

      {/* 🧠 Identity Gate Modal */}
      {showIdentityGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#111827] border border-[#C06CFC] rounded-2xl shadow-[0_0_60px_#AA89FF44] p-8 w-[90%] max-w-md space-y-6 text-center text-[#EDEDED] animate-fadeIn">
            <img
              src={gandivxAvatar}
              alt="GandivX"
              className="mx-auto h-16 w-16 rounded-full border border-[#AA89FF] shadow-[0_0_15px_#AA89FF99]"
            />
            <h2 className="text-xl font-semibold text-[#C06CFC]">Reveal Yourself</h2>
            <p className="text-sm text-[#aaa]">
              Only those with identity may proceed. Sign up and continue your journey with GandivX.
            </p>

            <button
              onClick={() => navigate("/auth")}
              className="w-full bg-[#5A69F2] text-white font-semibold py-2 rounded-full hover:bg-[#6a78ff] transition"
            >
              Continue to Signup
            </button>

            <button
              onClick={() => setShowIdentityGate(false)}
              className="text-xs text-[#888] hover:text-[#EDEDED]"
            >
              Not ready yet
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
