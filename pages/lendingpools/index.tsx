import { formatEther, formatUnits } from "ethers/lib/utils";
import { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Deposit from "../../components/deposit/Deposit";
import GradientBorder from "../../components/general/GradientBorder";
import SearchBar from "../../components/general/SearchBar";
import ScoreButton from "../../components/navbar/buttons/ScoreButton";
import TestFaucet from "../../components/testFaucet";
import useGetPoolsAddresses from "../../hooks/useGetPoolsAddresses";
import useGetPoolsAggregates from "../../hooks/useGetPoolsAggregates";
import useGetPoolsInfo from "../../hooks/useGetPoolsInfo";
import coin from "../../public/coin.png";
import dai from "../../public/dai.png";
import { setSelectedPool } from "../../slices/borrowSlice";
import formatEtherFromHEX from "../../utils/formatEtherWithCustomDecimals";
import { processCreditScore } from "../../utils/processRawCreditScore";

const LendingPools: NextPage = () => {
  const [lendersCount, setLendersCount] = useState(0);
  const [TVL, setTVL] = useState(0);
  const [lendingPools, setLendingPools] = useState<Array<JSX.Element>>([]);
  const [openBorrow, setOpenBorrow] = useState(false);
  const dispatch = useDispatch();
  const lendingPoolsFetched = useRef(false);

  const poolsAddresses = useGetPoolsAddresses();
  const poolsInfo = useGetPoolsInfo(poolsAddresses);
  const poolsAggregates = useGetPoolsAggregates(poolsAddresses);

  const getLendingPools = useCallback(() => {
    if (lendingPoolsFetched.current) {
      // to avoid re-rendering and changing the random credit scores values
      return;
    }
    if (!poolsInfo.length || poolsInfo.every((x) => x === undefined)) {
      return;
    }
    if (
      !poolsAggregates.length ||
      poolsAggregates.every((x) => x === undefined)
    ) {
      return;
    }

    let styledLendingPools = [];

    for (let i = 0; i < poolsInfo.length; i++) {
      const creditScore = Math.floor(Math.random() * 850 + 1);
      const processedCreditScore = processCreditScore(creditScore);
      let creditScoreColor;
      if (processedCreditScore <= 25) {
        creditScoreColor = "#dc2626";
      } else if (processedCreditScore <= 50) {
        creditScoreColor = "#fbbf24";
      } else if (processedCreditScore <= 75) {
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
          <span className="text-base">
            {formatEtherFromHEX(
              poolsInfo[i]?.value?.normalizedAvailableDeposits?._hex
            ) ?? ""}
          </span>
          <span className="text-base">
            {Number(
              formatEther(
                String(
                  parseInt(
                    poolsInfo[i]?.value?.normalizedBorrowedAmount?._hex,
                    16
                  ) ?? ""
                )
              )
            ).toFixed(0) ?? ""}
          </span>
          <span className="text-base">
            {formatUnits(
              poolsAggregates[i].value?.weightedAverageLendingRate?.toString(),
              16
            )}
            %
          </span>
          <span className="text-base">
            {(Math.random() * 2 + 0.5).toFixed(2)}%
          </span>
          <span className="text-base">2.5%</span>
          <span style={{ color: creditScoreColor }}>{creditScore}</span>
          <ScoreButton
            text="Deposit"
            onClick={() => {
              setOpenBorrow(true);
              dispatch(setSelectedPool(poolsAddresses[i]));
            }}
          />
        </>
      );
      setLendingPools(styledLendingPools);
      lendingPoolsFetched.current = true;
    }
  }, [poolsInfo, dispatch, poolsAddresses]);

  useEffect(() => {
    getLendingPools();
  }, [getLendingPools]);

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
            <h6 className="font-bold ">
              Lenders: {lendersCount ? lendersCount : "348"}
            </h6>
            <h6 className="font-bold ">TVL: ${TVL ? TVL : "348000"}</h6>
          </div>
        </div>
        <div className="grid grid-cols-8 items-center justify-items-center w-full space-y-sm text-base xl:text-lg">
          <h6 className="text-darkGreen capitalize !mb-0 mt-[24px]">Asset</h6>
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

      <TestFaucet />
    </>
  );
};

export default LendingPools;
