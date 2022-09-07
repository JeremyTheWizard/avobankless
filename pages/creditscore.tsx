import React from "react";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";
import CircleEnumeration from "../components/navbar/general/CircleEnumeration";
import GradientBorder from "../components/navbar/general/gradientBorder";
import GradientCircularGaugeIndicator from "../components/navbar/general/GradientCircularGaugeIndicator";
import dataOffChain from "../public/data-off-chain.png";
import loansOpportunities from "../public/loans-opportunities.png";
import web3Wallet from "../public/web3-wallet.png";
import worldcoinLogo from "../public/worldcoin-logo.png";

export const creditScore: React.FC = () => {
  let userName = "Avobankless";
  return (
    <GradientBorder twProps="p-lg grid grid-cols-2 gap-md2">
      <div className="space-y-md1">
        <div className="space-y-sm">
          <h3 className="text-red">
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
          <div className="flex flex-col items-center gap-sm">
            <p className="text-display-7 font-semibold shrink-0">🥑Avo Score</p>
            <p>
              Multi Asset Credit Risk Score calculated from both: off-chain and
              on-chain data.{" "}
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
          <div className="flex gap-xs !mt-md2 self-center">
            <ScoreButton text="Calculate Score" />
            <SlideDeckButton text="Create NFTSC" />
          </div>
        </GradientBorder>
      </div>
      <div className="space-y-md1 flex flex-col justify-between">
        <GradientBorder twProps="p-sm flex items-center gap-sm">
          <img
            src={worldcoinLogo.src}
            className="justify-self-center shrink-0 "
          />
          <div className="space-y-xs justify-self-center">
            <h3 className="font-bold">Private identity</h3>
            <p>
              Verify your unique identity privately (World ID) . Your data
              belongs to you.
            </p>
          </div>
          <CircleEnumeration number={1} />
        </GradientBorder>
        <GradientBorder twProps="p-sm flex items-center gap-sm">
          <img
            src={dataOffChain.src}
            className="justify-self-center shrink-0 "
          />
          <div className="space-y-xs justify-self-center">
            <h3 className="font-bold">Connect Data Off-chain</h3>
            <p>Verify your transaction history on your favorite apps.</p>
          </div>
          <CircleEnumeration number={2} />
        </GradientBorder>

        <GradientBorder twProps="p-sm flex items-center gap-sm">
          <img src={web3Wallet.src} className="justify-self-center shrink-0 " />
          <div className="space-y-xs justify-self-center">
            <h3 className="font-bold">Connect Wallet</h3>
            <p>Connect your wallet to increase your credit score.</p>
          </div>
          <CircleEnumeration number={3} />
        </GradientBorder>
        <GradientBorder twProps="p-sm flex items-center gap-sm">
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
          <CircleEnumeration number={4} />
        </GradientBorder>
      </div>
    </GradientBorder>
  );
};

export default creditScore;
