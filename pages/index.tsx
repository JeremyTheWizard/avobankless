import type { NextPage } from "next";
import Head from "next/head";

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
      </Head>

      <main className="w-[95vw] mx-auto">
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-3xl md:text-6xl lg:text-8xl">
            Welcome to <span className="text-teal-600">avobankless!</span>
          </h1>

          <p className="text-lg md:text-2xl">
            Decentralized credit bureau for unbanked people on Latam
          </p>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
