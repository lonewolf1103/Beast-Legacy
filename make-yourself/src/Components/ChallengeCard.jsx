
import React, { useRef } from "react";

const ChallengeCard = ({ title, description, completed, onComplete, locked, proof, onProofUpload }) => {
  const fileInputRef = useRef(null);

  return (
    <div
      className={`border rounded-xl p-4 bg-[#111827] transition shadow-md space-y-2 ${
        completed
          ? "border-green-500 opacity-70"
          : locked
          ? "border-[#444] opacity-40 pointer-events-none"
          : "border-[#C06CFC] hover:shadow-[0_0_20px_#C06CFC55]"
      }`}
    >
      <h3 className="text-lg font-semibold text-[#AA89FF]">{title}</h3>
      <p className="text-sm text-[#aaa]">{description}</p>

      {/* Proof Upload */}
      {!completed && !locked && (
        <div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-xs mt-2 underline text-[#5A69F2] hover:text-[#6a78ff]"
          >
            Upload Proof
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onProofUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Show proof preview */}
      {proof && (
        <img
          src={proof}
          alt="proof"
          className="mt-2 w-full max-h-48 rounded-xl object-cover border border-[#444]"
        />
      )}

      {/* Complete Button */}
      {!locked && (
        <button
          onClick={onComplete}
          disabled={completed}
          className={`mt-2 px-4 py-1 text-sm rounded-full font-semibold transition ${
            completed
              ? "bg-green-700 text-white cursor-default"
              : "bg-[#5A69F2] hover:bg-[#6a78ff] text-white"
          }`}
        >
          {completed ? "Completed" : "Mark as Complete"}
        </button>
      )}
    </div>
  );
};

export default ChallengeCard;
