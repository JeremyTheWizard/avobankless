import React from "react";

type Props = {
  number: Number;
  twProps?: String;
};

const CircleEnumeration: React.FC<Props> = ({ number, twProps }) => {
  return (
    <div
      className={`aspect-square w-11 rounded-full bg-almostBlack p-0.5 shrink-0 ${twProps}`}
    >
      <div className="h-full rounded-full bg-darkishRed flex justify-center items-center">
        <>{number}</>
      </div>
    </div>
  );
};

export default CircleEnumeration;
