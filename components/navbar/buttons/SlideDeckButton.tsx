import Tooltip from "@mui/material/Tooltip";
import React from "react";

type Props = {
  text: String;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  tooltip?: String;
  twProps?: String;
  onClick?: () => void;
};

const SlideDeckButton: React.FC<Props> = ({
  text,
  disabled,
  size = "md",
  tooltip,
  twProps,
  onClick,
}) => {
  return (
    <Tooltip title={tooltip ? tooltip : ""}>
      <span>
        <button
          onClick={onClick}
          className={` w-full border-[1px] border-darkGreen p-3 text-darkGreen bg-transparent rounded-100 ${
            disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "cursor-pointer"
          } ${twProps}`}
        >
          <span className="text-base">{text}</span>
        </button>
      </span>
    </Tooltip>
  );
};

export default SlideDeckButton;
