import React from "react";

type Props = {
  twPropsParent?: String | undefined;
  twPropsChild?: String | undefined;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: () => { payload: undefined };
};

const GradientBorder: React.FC<Props> = ({
  twPropsParent,
  twPropsChild,
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-object border-box p-0.5 ${twPropsParent}`}
    >
      <div
        className={`h-full bg-body rounded-xl p-sm space-y-md flex flex-col items-center ${twPropsChild}`}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
