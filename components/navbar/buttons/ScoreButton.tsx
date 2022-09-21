import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  text?: String;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  twProps?: String;
  size?: "sm" | "md" | "lg";
  tooltip?: String;
};

const ScoreButton: React.FC<Props> = ({
  text,
  disabled,
  onClick,
  children,
  twProps,
  size = "md",
  tooltip,
}) => {
  const router = useRouter();
  return (
    <Tooltip title={tooltip ? tooltip : ""}>
      <span>
        <button
          disabled={disabled}
          onClick={onClick}
          className={`w-max border-2 border-almostBlack px-12 py-3 rounded-100 bg-object text-almostWhite  ${twProps} ${
            disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          {text}
          {children}
        </button>
      </span>
    </Tooltip>
  );
};

export default ScoreButton;
