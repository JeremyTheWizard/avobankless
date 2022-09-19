import React from "react";

type Props = {
  twProps?: String | undefined;
  children?: React.ReactNode;
  onClick?: () => { payload: undefined };
};

const GradientBorder: React.FC<Props> = ({ twProps, children, onClick }) => {
  return (
    <div onClick={onClick} className="rounded-xl bg-object p-0.5">
      <div
        className={`h-full bg-body rounded-xl p-sm space-y-xs flex flex-col ${twProps}`}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
