import { useRouter } from "next/router";
import React from "react";

type Props = {
  text?: String;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const ScoreButton: React.FC<Props> = ({
  text,
  disabled,
  onClick,
  children,
}) => {
  const router = useRouter();
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`border-2 border-almostBlack px-18 py-3 rounded-100 bg-object text-almostWhite ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {text}
      {children}
    </button>
  );
};

export default ScoreButton;
