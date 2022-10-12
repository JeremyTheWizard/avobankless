import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";
import borrow from "../public/borrow.png";
import cashMan from "../public/cashMan.jpeg";
import creditScore from "../public/credit-score.png";
import imBankless from "../public/im-bankless.gif";
import lend from "../public/lend.png";
import superfluid from "../public/superfluid-stream.gif";

import Carousel from "../components/general/Carousel";
import GradientBox from "../components/general/GradientBox";

const Home: NextPage = () => {
  const handleOpenSlideDeck = () => {
    window.open(
      "https://pitch.com/public/33b982b3-177d-404c-b932-fc73944be7ae/594a9469-c7e2-45d1-a685-c4a970296423",
      "_blank"
    );
  };

  return (
    <div className="overflow-hidden">
      <Head>
        <title>avobankless</title>
        <meta
          name="description"
          content="Decentralized credit bureau for unbanked people on Latam"
        />
        <link rel="icon" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <main className="flex flex-col mx-auto space-y-xl ">
        <section className="flex justify-evenly items-center">
          <div className="space-y-md">
            <div>
              <h1 className="text-darkishRed capitalize sm:whitespace-nowrap  mb-0 text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl !leading-normal">
                Crypto Loans{""}
                <br />
                without collateral <br />
                <span className="bg-object bg-clip-text text-transparent">
                  are now possible
                </span>
              </h1>
              <p className="mt-4 max-w-xl ">
                The decentralized credit Protocol that understands your crypto
                income and DeFi activity.
              </p>
            </div>
            <div className="flex gap-6 w-full">
              <div className="w-full max-w-[250px]">
                <ScoreButton
                  text="Launch App"
                  onClick={() => router.push("/creditscore")}
                />
              </div>
              <div className="w-full max-w-[250px]">
                <SlideDeckButton
                  text="Slide deck"
                  onClick={handleOpenSlideDeck}
                />
              </div>
            </div>
            <p
              onClick={() =>
                window.open(
                  "https://github.com/avobankless/litepaper-v1/blob/main/Avobankless%20Litepaper%20v1.pdf",
                  "_blank"
                )
              }
              className="!mt-sm underline pl-xs font-medium cursor-pointer"
            >
              Avobankless litepaper
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={imBankless.src}
              alt="representation of the protocol"
              className="w-full object-fit"
            />
          </div>
        </section>
        <section className="relative hidden lg:grid grid-cols-3 justify-center gap-md prose-img:mb-0 text-center prose-h2:font-bold prose-h2:text-almostWhite">
          <GradientBox
            twProps={"flex-col items-center relative gap-sm pb-14 relative"}
          >
            <img
              src={borrow.src}
              alt="Hand holding coin"
              className="w-40 h-40"
            />
            <h2>Borrowing any time</h2>
            <p>
              Receive competitive Lending Rates in a crypto credit line in the
              form of a liquidity pool where you can withdraw at any time.
            </p>
            <img
              src={superfluid.src}
              alt="superfluid stream of money"
              className="w-20 h-28 absolute -right-20"
            />
          </GradientBox>
          <GradientBox twProps={"flex-col items-center relative gap-sm pb-14"}>
            <img src={lend.src} alt="hand giving cash" className="w-40 h-40" />
            <h2>Lend with Autopay</h2>
            <p>
              Take advantage of payment streams to automatically amortize loans
              with consistent returns. Always with liquidity.
            </p>
            <img
              src={superfluid.src}
              alt="superfluid stream of money"
              className="w-20 h-28 absolute -right-20 "
            />
          </GradientBox>
          <GradientBox twProps={"flex-col items-center relative gap-sm pb-14"}>
            <img src={creditScore.src} alt="eth badge" className="w-40 h-40" />
            <h2>NFT Credit Score</h2>
            <p>
              Connect your history DeFi on-chain into a single composable asset
              and develop your borrower profile.
            </p>
          </GradientBox>
        </section>
        <div className="lg:hidden self-center">
          <Carousel />
        </div>
        <div className="grid md:grid-cols-2 xl:gap-0 gap-md ">
          <div className="w-full order-1 md:order-0 mx-auto">
            <img
              src={cashMan.src}
              alt="Man setting in pile of eth"
              className="w-full max-w-2xl "
            />
          </div>
          <div className="space-y-sm order-0 md:order-1">
            <h2 className="text-darkishRed capitalize  mb-0  text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl !leading-normal mt-0">
              Capital efficiency and{" "}
              <span className="bg-object bg-clip-text text-transparent">
                Competitive Returns
              </span>
            </h2>
            <p>
              Uncollateralized loans provide an opportunity for lenders to earn
              higher returns, and for borrowers to maximize their capital
              efficiency.
            </p>
          </div>
        </div>
        <span className="text-center text-sm !mt-16">
          Making DeFi guacamole on 🥑 ETH Global
        </span>
      </main>
    </div>
  );
};

export default Home;
