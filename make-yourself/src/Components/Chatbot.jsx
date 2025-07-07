import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: user
        ? `Welcome back, ${user.name}. What do you need help with today?`
        : "I’m GandivX. What’s troubling you, young warrior?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];

    if (!user) {
      newMessages.push({
        sender: "bot",
        text: "To guide you better, please login or signup first.",
      });
      setMessages(newMessages);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      newMessages.push({
        sender: "bot",
        text: `Discipline is built one brick at a time, ${user.name}. Keep going.`,
      });
      setMessages(newMessages);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[340px] md:w-96 h-[440px] bg-[#0B0F1A] border border-[#C06CFC] rounded-2xl shadow-xl flex flex-col overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto text-[#EDEDED] space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm ${
              msg.sender === "bot" ? "text-left" : "text-right"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-xl ${
                msg.sender === "bot"
                  ? "bg-[#1C2233] text-[#AA89FF]"
                  : "bg-[#5A69F2] text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-2 bg-[#111827] border-t border-[#1f2937]">
        <input
          className="w-full bg-transparent text-sm text-[#EDEDED] outline-none"
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
