// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import LINK from "next/link";
import router from "next/router";
import ScoreButton from "./buttons/ScoreButton";

const Navbar: React.FC = () => {
  const navbar = () => {
    return (
      <nav className="max-w-[1536px] flex items-center justify-between py-sm z-[999] mb-md">
        <LINK href="/">
          <div className="cursor-pointer">
            <Image
              src="/avobankless-logo.png"
              alt="avobankless logo"
              width="150px"
              height="36px"
            />
          </div>
        </LINK>
        <div className="w-full max-w-[150px] md:max-w-[250px]">
          <ScoreButton
            text="Launch App"
            onClick={() => router.push("/creditscore")}
            twProps="!py-2"
          />
        </div>
      </nav>
    );
  };

  return <>{navbar()}</>;
};

export default Navbar;
