import { CircularProgress } from "@mui/material";
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
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
};

const ScoreButton: React.FC<Props> = ({
  text,
  disabled,
  onClick,
  children,
  twProps,
  size = "md",
  tooltip,
  type = "button",
  loading,
}) => {
  const router = useRouter();
  return (
    <Tooltip title={tooltip ? tooltip : ""}>
      <span>
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`w-full border-2 border-almostBlack p-3 rounded-100  disabled:bg-gray-400 text-almostWhite  ${twProps} ${
            disabled
              ? "cursor-not-allowed pointer-events-none "
              : "cursor-pointer bg-object"
          }`}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <span className="text-base">{text}</span>
              {children}
            </>
          )}
        </button>
      </span>
    </Tooltip>
  );
};

export default ScoreButton;
