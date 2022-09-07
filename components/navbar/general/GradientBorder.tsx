import React from "react";

type Props = {
  twProps?: String | undefined;
  children?: React.ReactNode
};

export const GradientBorder: React.FC<Props> = ({ twProps, children }) => {
  return (
    <div className="rounded-xl bg-object p-0.5">
      <div className={`h-full bg-body rounded-xl ${twProps}`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
