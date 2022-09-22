import React from "react";

type Props = {
  children?: React.ReactNode;
  twProps?: string;
};

const GradientBox: React.FC<Props> = ({ children, twProps }) => {
  return (
    <div
      className={`bg-objectDown flex justify-around p-sm text-almostWhite rounded-2xl ${twProps}`}
    >
      {children}
    </div>
  );
};

export default GradientBox;
