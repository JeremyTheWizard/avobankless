import React from "react";
import { VerifyStep1 } from "../components/credit-score/Steps";
import CircleEnumeration from "../components/general/CircleEnumeration";
import GradientBorder from "../components/general/GradientBorder";
import GradientCircularGaugeIndicator from "../components/general/GradientCircularGaugeIndicator";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";
import avobanklessPet from "../public/avobankless-pet.png";
import dataOffChain from "../public/data-off-chain.png";
import loansOpportunities from "../public/loans-opportunities.png";
import web3Wallet from "../public/web3-wallet.png";
import { getDialogState, openDialog } from "../slices/creditScoreDialogSlice";
import { useDispatch, useSelector } from "../store/store";

const CreditScore: React.FC = () => {
  const { dialogOpen, dialogStep } = useSelector(getDialogState);
  const dispatch = useDispatch();

  const dialogSteps = [<VerifyStep1 key="0" />];

  let userName = "Avobankless";
  return (
    <>
      <GradientBorder twProps="p-lg grid grid-cols-2 gap-md">
        <div className="space-y-md">
          <div className="space-y-xs">
            <h3 className="text-darkishRed text-display-6">
              Welcome{" "}
              <span className="bg-object bg-clip-text text-transparent capitalize">{`${userName}`}</span>
              . Build Your Score! 🚀
            </h3>
            <p>
              Connect your web2 apps and/or your web3 accounts to check your
              credit score and unlock the best financial opportunities.
            </p>
          </div>
          <GradientBorder twProps="p-sm space-y-xs flex flex-col">
            <div className="flex flex-col items-center gap-xs">
              <h3 className="font-semibold shrink-0">🥑Avo Score</h3>
              <p>
                Multi Asset Credit Risk Score calculated from both: off-chain
                and on-chain data.{" "}
              </p>
            </div>
            <div className=" flex flex-col items-center">
              <GradientCircularGaugeIndicator />
              <div className="flex gap-sm text-xs">
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-red-500"></div>{" "}
                  <p>
                    Beginner
                    <br />
                    (+ 0)
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-yellow-400"></div>{" "}
                  <p>
                    Learning
                    <br />
                    (+ 212)
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-blue-400"></div>{" "}
                  <p>
                    Grow
                    <br />
                    (+ 425)
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <div className="w-4 aspect-square rounded-full bg-green-400"></div>{" "}
                  <p>
                    Stable
                    <br />
                    (+ 637)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-md !mt-md self-center">
              <ScoreButton text="Calculate Score" />
              <SlideDeckButton text="Create NFTSC" />
            </div>
          </GradientBorder>
        </div>
        <div className="space-y-md flex flex-col justify-between">
          <GradientBorder
            twProps="p-sm flex items-center gap-sm cursor-pointer"
            onClick={() => dispatch(openDialog())}
          >
            <img
              src={avobanklessPet.src}
              className="justify-self-center shrink-0"
            />
            <div className="space-y-xs justify-self-center">
              <h3 className="font-bold">Private identity</h3>
              <p>Verify your unique identity privately.</p>
            </div>
            <CircleEnumeration number={1} twProps="ml-auto" />
          </GradientBorder>
          <GradientBorder twProps="p-sm flex items-center gap-sm cursor-pointer">
            <img
              src={dataOffChain.src}
              className="justify-self-center shrink-0 "
            />
            <div className="space-y-xs justify-self-center">
              <h3 className="font-bold">Connect Data Off-chain</h3>
              <p>Verify your transaction history on your favorite apps.</p>
            </div>
            <CircleEnumeration number={2} twProps="ml-auto" />
          </GradientBorder>

          <GradientBorder twProps="p-sm flex items-center gap-sm cursor-pointer">
            <img
              src={web3Wallet.src}
              className="justify-self-center shrink-0 "
            />
            <div className="space-y-xs justify-self-center">
              <h3 className="font-bold">Connect Wallet</h3>
              <p>Connect your wallet to increase your credit score.</p>
            </div>
            <CircleEnumeration number={3} twProps="ml-auto" />
          </GradientBorder>
          <GradientBorder twProps="p-sm flex items-center gap-sm cursor-pointer">
            <img
              src={loansOpportunities.src}
              className="justify-self-center shrink-0 "
            />
            <div className="space-y-xs justify-self-center">
              <h3 className="font-bold">Loans Opportunities</h3>
              <p>
                Get access to unique financial opportunities like
                non-collateralize credit.
              </p>
            </div>
            <CircleEnumeration number={4} twProps="ml-auto" />
          </GradientBorder>
        </div>
      </GradientBorder>
      {dialogOpen && dialogSteps[dialogStep]}
    </>
  );
};

export default CreditScore;
