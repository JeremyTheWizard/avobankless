import type { NextPage } from "next";
import Head from "next/head";
import ScoreButton from "../components/navbar/buttons/scoreButton";
import SlideDeckButton from "../components/navbar/buttons/slideDeckButton";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main className="flex flex-col mx-auto">
        <section className="grid grid-cols-2">
          <div className="space-y-md2">
            <h2 className="text-red capitalize tracking-wide">
              We Make Credit{" "}
              <span className="bg-object bg-clip-text text-transparent font-bold">
                Possible For All{" "}
              </span>
              New Generations
            </h2>
            <p className="text-display-9">
              The Decentralized Credit Bureau For The Unbanked.
              <br /> Inclusive, Secure And Private.
            </p>
            <div className="flex gap-6">
              <ScoreButton />
              <SlideDeckButton />
            </div>
          </div>
            <div className="">
              <img
                src="/homepage-gif.png"
                alt="representation of the protocol"
              />
          </div>
        </section>
        <section className="mt-lg text-display-6 flex justify-center">How it works?</section>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
