import React from "react";

type Props = {
  text: String;
  disabled?: boolean;
};

const SlideDeckButton: React.FC<Props> = ({ text, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {}}
      className={`border-[1px] px-18 py-3 text-darkishRed rounded-100 border-darkGreen ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
};

export default SlideDeckButton;
