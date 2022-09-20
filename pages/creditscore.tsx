import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Tabs from "../components/credit-score/BasicTabs";
import GradientBorder from "../components/general/GradientBorder";
import GradientBox from "../components/general/GradientBox";
import GradientCircularGaugeIndicator from "../components/general/GradientCircularGaugeIndicator";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";

const CreditScore: React.FC = () => {
  const { isDisconnected, address } = useAccount();
  const [creditScore, setCreditScore] = useState();

  const updateExistingWalletScore = useCallback(async () => {
    if (address) {
      let response;
      try {
        response = await axios.get(`api/creditscore/${address}`);
      } catch (err) {
        console.log(err);
      }
      if (response?.data.score) {
        setCreditScore(response.data.score);
      }
    }
  }, [address]);

  useEffect(() => {
    updateExistingWalletScore();
  }, [updateExistingWalletScore]);

  useEffect(() => {
    if (isDisconnected) {
      setCreditScore(undefined);
    }
  }, [isDisconnected]);

  const calculateWalletScore = async () => {
    let response;
    try {
      response = await axios.post(`api/creditscore/${address}`);
    } catch (err) {
      console.log(err);
    }
    setCreditScore(response?.data.score);
  };

  return (
    <div className="space-y-md">
      <div className="flex gap-lg">
        <div className="space-y-md xl:shrink-0">
          <div className="space-y-xs">
            <Typography variant="h3" className="text-darkishRed">
              Generate Your Score {""}
              <span className="bg-object bg-clip-text text-transparent capitalize">
                Guacamole
              </span>
            </Typography>
            <Typography variant="h6" component="span">
              Connect wallet for Check History, DeFi activity and Social Graph
            </Typography>
          </div>
          <GradientBorder>
            <div className="flex flex-col items-center gap-xs">
              <Typography
                variant="h4"
                component="h3"
                className="font-semibold shrink-0"
              >
                🥑Avo Score
              </Typography>
              <Typography variant="h6" component="span">
                Multi Asset Credit Risk Oracle on-chain.
              </Typography>
            </div>
            <div className=" flex flex-col items-center">
              <GradientCircularGaugeIndicator
                score={creditScore ? creditScore : 0}
              />
              <div className="flex gap-sm text-xs">
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-red-500"></div>{" "}
                  <Typography variant="caption">
                    Beginner
                    <br />
                    (+ 0)
                  </Typography>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-yellow-400"></div>{" "}
                  <Typography variant="caption">
                    Learning
                    <br />
                    (+ 212)
                  </Typography>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-blue-400"></div>{" "}
                  <Typography variant="caption">
                    Grow
                    <br />
                    (+ 425)
                  </Typography>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-green-400"></div>{" "}
                  <Typography variant="caption">
                    Stable
                    <br />
                    (+ 637)
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex gap-md !mt-md self-center">
              <ScoreButton
                size="md"
                text="Calculate Score"
                disabled={isDisconnected && true}
                tooltip={isDisconnected ? "Connect your wallet first" : ""}
                onClick={() => calculateWalletScore()}
              />
              <SlideDeckButton
                size="md"
                text="Verify"
                disabled={(isDisconnected || !creditScore) && true}
                tooltip={
                  isDisconnected
                    ? "Connect your wallet first"
                    : !creditScore
                    ? "Calculate your creditScore first"
                    : ""
                }
              />
            </div>
          </GradientBorder>
        </div>
        <div className="w-full flex flex-col gap-md">
          <GradientBox>
            <div className="flex flex-col gap-sm">
              <Typography variant="h6" component="span">
                Balance
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                $0
              </Typography>
            </div>
            <div className="flex flex-col gap-sm">
              <Typography variant="h6" component="span">
                Deposits
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                $0
              </Typography>
            </div>
            <div className="flex flex-col gap-sm">
              <Typography variant="h6" component="span">
                Borrowed
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                $0
              </Typography>
            </div>
            <div className="flex flex-col gap-sm">
              <Typography variant="h6" component="span">
                Loans
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                $0
              </Typography>
            </div>
          </GradientBox>
          <div className="relative h-full">
            <GradientBorder
              twPropsParent={"h-full w-full absolute"}
              twPropsChild={"overflow-y-scroll"}
            >
              <Tabs />
            </GradientBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScore;
