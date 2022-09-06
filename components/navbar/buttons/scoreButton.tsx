import { useRouter } from "next/router";
import React from "react";

export const ScoreButton: React.FC = () => {
  const router = useRouter()
  return <button onClick={() => router.push("/creditscore")} className="border-2 border-almostDark px-18 py-3 rounded-100 bg-object text-almostWhite">Build your score</button>; 
};

export default ScoreButton;
