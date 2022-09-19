import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import ScoreButton from "../components/navbar/buttons/ScoreButton";
import SlideDeckButton from "../components/navbar/buttons/SlideDeckButton";

import Typography from "@mui/material/Typography";
import { getDialogState } from "../slices/creditScoreDialogSlice";
import { useSelector } from "../store/store";

const Home: NextPage = () => {
  const { overflow } = useSelector(getDialogState);
  return (
    <div className={`${overflow}`}>
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
              <Typography
                variant="h1"
                className="text-darkishRed capitalize sm:whitespace-nowrap"
              >
                We Make Credit <br />
                <span className="bg-object bg-clip-text text-transparent">
                  Possible For All
                  <br />
                </span>
                New Generations
              </Typography>
              <Typography variant="h5" component="span">
                The Decentralized Credit Bureau For The Unbanked.
                <br /> Inclusive, Secure And Private.
              </Typography>
            </div>
            <div className="flex gap-6">
              <ScoreButton
                text="Launch App"
                onClick={() => router.push("/creditscore")}
              />
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
          <Typography variant="h4" component="h2">
            How it works?
          </Typography>
        </section>
      </main>
    </div>
  );
};

export default Home;
