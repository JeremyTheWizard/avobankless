import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Borrow from "../components/borrow.tsx/Borrow";
import CreatePool from "../components/create-pool/CreatePool";
import Tabs from "../components/credit-score/BasicTabs";
import GradientBorder from "../components/general/GradientBorder";
import GradientBox from "../components/general/GradientBox";
import GradientCircularGaugeIndicator from "../components/general/GradientCircularGaugeIndicator";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";
import TestFaucet from "../components/testFaucet";
import Withdraw from "../components/withdraw/Withdraw";
import { getBorrowState } from "../slices/borrowSlice";
import { getCreatePoolSlice, toggleOpen } from "../slices/createPoolSlice";
import { getUserPositionsState } from "../slices/userPositionsSlice";
import { getWithdrawState } from "../slices/withdrawSlice";
import { useDispatch, useSelector } from "../store/store";

const CreditScore: React.FC = () => {
  const { account } = useEthers();
  const [creditScore, setCreditScore] = useState<Number | undefined>();
  const { loans } = useSelector(getCreatePoolSlice);
  const [openCreatePool, setOpenCreatePool] = useState(false);
  const dispatch = useDispatch();
  const { userDepositsTotal } = useSelector(getUserPositionsState);
  const { userTotalBorrowed } = useSelector(getBorrowState);
  const { userAvailableTotal } = useSelector(getWithdrawState);

  const updateExistingWalletScore = useCallback(async () => {
    if (account) {
      let score;
      try {
        score = await axios
          .get(`api/creditscore/${account}`)
          .then((res) => res.data.score);
      } catch (err) {
        return err;
      }
      setCreditScore(score);
    }
  }, [account]);

  // useEffect(() => {
  //   updateExistingWalletScore();
  // }, [updateExistingWalletScore]);

  useEffect(() => {
    if (!account) {
      setCreditScore(undefined);
    }
  }, [!account]);

  const calculateWalletScore = async () => {
    let score;
    try {
      score = await axios
        .post(`api/creditscore/${account}`)
        .then((res) => res.data.score);
    } catch (err) {
      return err;
    }
    if (typeof score === "number") {
      setCreditScore(score);
    }
  };

  return (
    <>
      <div className="space-y-md overflow-hidden">
        <div className="lg:hidden">
          <h3 className="text-darkishRed text-3xl sm:text-4xl md:text-5xl text-center">
            Generate Your Score, {""}
            <span className="font-bold bg-object bg-clip-text text-transparent capitalize">
              Guacamole!
            </span>
          </h3>
          <p className="text-center">
            Connect wallet to check your History, DeFi activity and Social Graph
          </p>
        </div>
        <div className="flex lg:hidden w-full flex-col gap-md col-span-6">
          <GradientBox twProps="prose-h5:m-0 ">
            <div className="flex flex-col gap-sm">
              <h5>Balance</h5>
              <h5 className="font-bold">$0</h5>
            </div>
            <div className="flex flex-col gap-sm">
              <h5>Deposits</h5>
              <h5 className="font-bold">${userDepositsTotal ?? "0"}</h5>
            </div>
            <div className="flex flex-col gap-sm">
              <h5>Borrowed</h5>
              <h5 className="font-bold">${userTotalBorrowed ?? "0"}</h5>
            </div>
            <div className="flex flex-col gap-sm">
              <h5>Loans</h5>
              <h5 className="font-bold">$0</h5>
            </div>
          </GradientBox>
          <div className="w-11/12 mx-auto">
            {loans === undefined && account && (
              <ScoreButton
                onClick={() => dispatch(toggleOpen())}
                text="Create Pool"
                twProps={"!w-full"}
              />
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-11 xl:gap-md gap-sm">
          <div className="space-y-md w-full min-w-0 min-h-0 col-span-5">
            <div className="hidden lg:block">
              <h3 className="text-darkishRed md:text lg:text-3xl xl:text-4xl mt-0">
                Generate Your Score, {""}
                <span className="font-bold bg-object bg-clip-text text-transparent capitalize">
                  Guacamole!
                </span>
              </h3>
              <p>
                Connect your wallet to check your Transaction History, DeFi
                activity and Social Graph.
              </p>
            </div>
            <GradientBorder twPropsChild="!lg:space-y-lg !space-y-md ">
              <div className="flex flex-col items-center gap-xs">
                <h3 className="font-bold">🥑Avo Score</h3>
                <span>Multi Asset Credit Risk Oracle.</span>
              </div>
              <div className="flex flex-col items-center">
                <GradientCircularGaugeIndicator
                  score={creditScore ? creditScore : 0}
                />
                <div className="flex xl:gap-md gap-sm text-xs">
                  <div className="flex gap-xs items-center">
                    <div className="w-4 aspect-square rounded-full bg-red-500"></div>{" "}
                    <span>
                      Beginner
                      <br />
                      (+ 0)
                    </span>
                  </div>
                  <div className="flex gap-xs items-center">
                    <div className="w-4 aspect-square rounded-full bg-yellow-400"></div>{" "}
                    <span>
                      Learning
                      <br />
                      (+ 212)
                    </span>
                  </div>
                  <div className="flex gap-xs items-center">
                    <div className="w-4 aspect-square rounded-full bg-blue-400"></div>{" "}
                    <span>
                      Grow
                      <br />
                      (+ 425)
                    </span>
                  </div>
                  <div className="flex gap-xs items-center">
                    <div className="w-4 aspect-square rounded-full bg-green-400"></div>{" "}
                    <span>
                      Stable
                      <br />
                      (+ 637)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-md self-center pb-md w-full justify-center ">
                <div className="w-full max-w-xs">
                  <ScoreButton
                    text="Calculate Score"
                    disabled={!account && true}
                    tooltip={!account ? "Connect your wallet first" : ""}
                    onClick={() => calculateWalletScore()}
                  />
                </div>
                <div className="w-full max-w-xs">
                  <SlideDeckButton
                    size="md"
                    text="Verify"
                    disabled={(!account || !creditScore) && true}
                    tooltip={
                      account!
                        ? "Connect your wallet first"
                        : !creditScore
                        ? "Calculate your creditScore first"
                        : ""
                    }
                  />
                </div>
              </div>
            </GradientBorder>
          </div>
          <div className="hidden lg:flex w-full flex-col gap-md col-span-6">
            <GradientBox twProps="prose-h5:m-0 ">
              <div className="flex flex-col gap-sm">
                <h5>Earned</h5>
                <h5 className="font-bold">$0</h5>
              </div>
              <div className="flex flex-col gap-sm">
                <h5>Available</h5>
                <h5 className="font-bold">${userAvailableTotal ?? "0"}</h5>
              </div>
              <div className="flex flex-col gap-sm">
                <h5>Deposits</h5>
                <h5 className="font-bold">${userDepositsTotal ?? "0"}</h5>
              </div>
              <div className="flex flex-col gap-sm">
                <h5>Borrowed</h5>
                <h5 className="font-bold">${userTotalBorrowed ?? "0"}</h5>
              </div>
            </GradientBox>
            <div className="w-11/12 mx-auto">
              {loans === undefined && account && (
                <ScoreButton
                  onClick={() => setOpenCreatePool(true)}
                  text="Create Pool"
                  twProps={"!w-full"}
                />
              )}
            </div>
            <div className="h-full">
              <GradientBorder
                twPropsParent={"h-full w-full "}
                twPropsChild={"overflow-y-scroll !p-0 "}
              >
                <Tabs />
              </GradientBorder>
            </div>
          </div>
        </div>
        <div className="lg:hidden h-full">
          <GradientBorder
            twPropsParent={"h-full w-full "}
            twPropsChild={"overflow-y-scroll !items-start !p-0 "}
          >
            <Tabs />
          </GradientBorder>
        </div>
      </div>

      <CreatePool
        openCreatePool={openCreatePool}
        setOpenCreatePool={setOpenCreatePool}
      />
      <Withdraw />
      <Borrow />
      <TestFaucet />
    </>
  );
};

export default CreditScore;
