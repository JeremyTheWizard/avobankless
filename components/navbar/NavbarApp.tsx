// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LINK from "next/link";
import { useRouter } from "next/router";
import { ConnectButton1 } from "../general/ConnectButton1";

const Navbar: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const navbar = () => {
    return (
      <nav className="max-w-[1536px] flex items-center justify-between py-sm z-[999] mb-md">
        <ul className="flex justify-between w-full items-center">
          <li className="cursor-pointer">
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
          </li>
          <li className="cursor-pointer">
            <div className="flex gap-lg">
              <LINK href={"/creditscore"}>
                <a
                  className={`${
                    currentRoute === "/creditscore" && "text-darkGreen"
                  }`}
                >
                  <Typography variant="h6" component="span">
                    Dashbord
                  </Typography>
                </a>
              </LINK>
              <LINK href="/lendingpools">
                <a
                  className={`${
                    currentRoute === "lendingpools" && "text-darkGreen"
                  }`}
                >
                  <Typography variant="h6" component="span">
                    Lending Pools
                  </Typography>
                </a>
              </LINK>
              <LINK href="/borrow">
                <a
                  className={`${currentRoute === "borrow" && "text-darkGreen"}`}
                >
                  <Typography variant="h6" component="span">
                    Borrow
                  </Typography>
                </a>
              </LINK>
            </div>
          </li>
          <li className="cursor-pointer">
            <ConnectButton1 />
          </li>
        </ul>
      </nav>
    );
  };

  return <>{navbar()}</>;
};

export default Navbar;
