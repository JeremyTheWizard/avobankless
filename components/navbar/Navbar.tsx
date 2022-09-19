// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import LINK from "next/link";
import { ConnectButton1 } from "../general/ConnectButton1";

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
        {/* <ScoreButton text="Connect Wallet" onClick={() => {}} /> */}
        <ConnectButton1 />
      </nav>
    );
  };

  return <>{navbar()}</>;
};

export default Navbar;
