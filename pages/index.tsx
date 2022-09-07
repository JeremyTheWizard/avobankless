import type { NextPage } from "next";
import Head from "next/head";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";

const Home: NextPage = () => {
  return (
    <div>
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

      <main className="flex flex-col mx-auto">
        <section className="flex justify-between items-center">
          <div className="space-y-md">
            <div className="space-y-sm">
              <h1 className="text-darkishRed capitalize tracking-wide whitespace-nowrap">
                We Make Credit <br />
                <span className="bg-object bg-clip-text text-transparent">
                  Possible For All <br />
                </span>
                New Generations
              </h1>
              <p>
                The Decentralized Credit Bureau For The Unbanked.
                <br /> Inclusive, Secure And Private.
              </p>
            </div>
            <div className="flex gap-6">
              <ScoreButton text="Build Your Score!" />
              <SlideDeckButton text="Slide deck" />
            </div>
          </div>
          <img
            src="/homepage-gif.png"
            alt="representation of the protocol"
            className="object-scale-down"
          />
        </section>
        <section className="mt-lg text-display-6 flex justify-center ">
          <h2 className="font-medium">How it works?</h2>
        </section>
      </main>
    </div>
  );
};

export default Home;
