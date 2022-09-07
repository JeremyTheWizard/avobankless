import { useRouter } from "next/router";
import React from "react";

type Props = {
  text: String
}

export const ScoreButton: React.FC<Props> = ({text}) => {
  const router = useRouter()
  return <button onClick={() => router.push("/creditscore")} className="border-2 border-almostBlack px-18 py-3 rounded-100 bg-object text-almostWhite">{text}</button>; 
};

export default ScoreButton;
