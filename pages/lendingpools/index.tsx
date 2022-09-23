import { NextPage } from "next";
import { useEffect, useState } from "react";
import Deposit from "../../components/deposit/Deposit";
import GradientBorder from "../../components/general/GradientBorder";
import SearchBar from "../../components/general/SearchBar";
import ScoreButton from "../../components/navbar/buttons/ScoreButton";
import useGetPoolsInfo from "../../hooks/useGetPoolsInfo";
import coin from "../../public/coin.png";
import dai from "../../public/dai.png";
import { processCreditScore } from "../../utils/processRawCreditScore";

const LendingPools: NextPage = () => {
  const [lendersCount, setLendersCount] = useState(0);
  const [TVL, setTVL] = useState(0);
  const [lendingPools, setLendingPools] = useState<Array<JSX.Element>>([]);
  const [openBorrow, setOpenBorrow] = useState(false);

  const poolsInfo = useGetPoolsInfo();

  useEffect(() => {
    const getLendingPools = async () => {
      let styledLendingPools = [];
      if (poolsInfo) {
        console.log("🚀 ~ poolsInfo", poolsInfo);

        for (let i = 0; i < poolsInfo.length; i++) {
          const creditScore = processCreditScore(643);
          let creditScoreColor;
          if (creditScore <= 25) {
            creditScoreColor = "#dc2626";
          } else if (creditScore <= 50) {
            creditScoreColor = "#fbbf24";
          } else if (creditScore <= 75) {
            creditScoreColor = "#60a5fa";
          } else {
            creditScoreColor = "#22c55e";
          }
          styledLendingPools.push(
            <>
              <div className="flex gap-xs items-center">
                <img src={dai.src} alt="dai" className="m-0" />
                <span className="text-base">DAI</span>
              </div>
              <span className="text-base">${poolsInfo}k</span>
              <span className="text-base">{poolsInfo}k</span>
              <span className="text-base">${poolsInfo}</span>
              <span className="text-base">{poolsInfo}%</span>
              <span className="text-base">{poolsInfo}%</span>
              <span className="text-base">{poolsInfo}%</span>
              <span color={creditScoreColor}>{poolsInfo}</span>
              <ScoreButton text="Deposit" onClick={() => setOpenBorrow(true)} />
            </>
          );
          setLendingPools(styledLendingPools);
        }
      }
    };
    getLendingPools();
  }, []);

  return (
    <>
      <GradientBorder
        twPropsParent={
          "overflow-x-scroll w-full scrollbar !scrollbar-thumb-darkGreen scrollbar-track-gray-100 mt-lg"
        }
        twPropsChild="min-w-[950px]"
      >
        <div className="flex gap-sm w-full">
          <div className="flex md:gap-md gap-sm items-center justify-evenly w-full">
            <div className="flex gap-xs items-center ">
              <img src={coin.src} alt="coin" />
              <h4 className="font-bold">Lending Pools</h4>
            </div>
            <SearchBar placeholder="Search by ENS or address..." size="lg" />
            <h6 className="font-bold ">{lendersCount} lenders</h6>
            <h6 className="font-bold ">TVL: ${TVL}</h6>
          </div>
        </div>
        <div className="grid grid-cols-9 items-center justify-items-center w-full space-y-sm ">
          <h6 className="text-darkGreen capitalize !mb-0 mt-[24px]">Asset</h6>
          <h6 className="text-darkGreen capitalize">Deposit</h6>
          <h6 className="text-darkGreen capitalize">TVL</h6>
          <h6 className="text-darkGreen capitalize">Borrowed</h6>
          <h6 className="text-darkGreen capitalize">Active APY</h6>
          <h6 className="text-darkGreen capitalize">Reward APY</h6>
          <h6 className="text-darkGreen capitalize">Yearn APY</h6>
          <h6 className="text-darkGreen capitalize">CS</h6>
          <div></div>
          {lendingPools && lendingPools}
        </div>
      </GradientBorder>
      <Deposit openBorrow={openBorrow} setOpenBorrow={setOpenBorrow} />
    </>
  );
};

export default LendingPools;
