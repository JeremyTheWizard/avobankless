// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LINK from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { ConnectButton1 } from "../general/ConnectButton1";

const Navbar: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [open, setOpen] = useState(false);

  const navbar = () => {
    return (
      <>
        <nav className="max-w-[1536px] flex items-center justify-between py-sm z-[999] mb-md not-prose relative">
          <div className="hidden md:flex w-full items-center">
            <ul className="flex justify-between w-full items-center">
              <li className="cursor-pointer ">
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
                </div>
              </li>
              <li className="cursor-pointer inline">
                <div className=""></div>
              </li>
            </ul>
            <div className="w-[250px]">
              <ConnectButton1 />
            </div>
          </div>
          <div className="md:hidden flex w-full">
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
              <li onClick={() => setOpen(!open)} className="cursor-pointer">
                {open ? <RiCloseFill size="32px" /> : <FiMenu size="32px" />}
              </li>
            </ul>
          </div>
        </nav>
        <ul className="flex flex-col items-center gap-sm top-0 w-full text-lg font-bold -mt-md p-0 prose-a:no-underline prose-li:p-0">
          {open && (
            <>
              <li>
                <LINK href={"/creditscore"}>
                  <a
                    className={`${
                      currentRoute === "/creditscore" && "text-darkGreen"
                    }`}
                  >
                    Dashboard
                  </a>
                </LINK>
              </li>
              <li>
                <LINK href="/lendingpools">
                  <a
                    className={`${
                      currentRoute === "lendingpools" && "text-darkGreen"
                    }`}
                  >
                    Lending Pools
                  </a>
                </LINK>
              </li>
              <div className="w-full max-w-[250px]">
                <ConnectButton1 />
              </div>
            </>
          )}
        </ul>
      </>
    );
  };

  return <>{navbar()}</>;
};

export default Navbar;
