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
      const botReply = user
        ? `Brick by brick, ${user.name}, that’s how legacies are built.`
        : "Log in or sign up — only then I can truly mentor you.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);

      if (!user) {
        setTimeout(() => navigate("/login"), 1500);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl h-[600px] rounded-3xl border border-[#C06CFC] bg-gradient-to-br from-[#0B0F1A] to-[#111827] shadow-[0_0_30px_#AA89FF33] flex flex-col overflow-hidden backdrop-blur-md">
      
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-[#1f2937] bg-[#0B0F1A]/80">
        <img
          src={gandivxAvatar}
          alt="GandivX"
          className="h-10 w-10 rounded-full border border-[#AA89FF] shadow-[0_0_10px_#AA89FF99]"
        />
        <h1 className="text-lg font-semibold text-[#C06CFC]">GandivX – Your Mentor Awaits</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 text-sm text-[#EDEDED]">
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

      {/* Input */}
      <div className="px-6 py-4 bg-[#0B0F1A] border-t border-[#1f2937]">
        <input
          className="w-full bg-transparent text-sm text-[#EDEDED] border border-[#C06CFC] rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#AA89FF] placeholder:text-[#888]"
          placeholder="Ask your mentor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
    </div>
  );
};

export default ChatBot;
