import React from "react";

type Props = {
  number: Number;
};

export const CircleEnumeration: React.FC<Props> = ({ number}) => {
  return (
    <div className="aspect-square w-11 rounded-full bg-almostBlack p-0.5 shrink-0">
      <div className="h-full rounded-full bg-darkishRed flex justify-center items-center">
        <>{number}</>
      </div>
    </div>
  );
};

export default CircleEnumeration;
