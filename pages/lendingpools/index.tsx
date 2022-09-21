import { Typography } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Deposit from "../../components/deposit/Deposit";
import GradientBorder from "../../components/general/GradientBorder";
import SearchBar from "../../components/general/SearchBar";
import ScoreButton from "../../components/navbar/buttons/ScoreButton";
import coin from "../../public/coin.png";
import dai from "../../public/dai.png";
import { processCreditScore } from "../../utils/processRawCreditScore";

const LendingPools: NextPage = () => {
  const [lendersCount, setLendersCount] = useState(0);
  const [TVL, setTVL] = useState(0);
  const [lendingPools, setLendingPools] = useState<Array<JSX.Element>>([]);
  const [openBorrow, setOpenBorrow] = useState(false);

  useEffect(() => {
    const getLendingPools = async () => {
      let lendingPools = [];
      try {
        lendingPools = await axios
          .get("/api/lendingpools")
          .then((res) => res?.data.lendingPools);
      } catch (err) {
        console.log(err);
      }
      let styledLendingPools = [];
      for (let i = 0; i < lendingPools.length; i++) {
        const creditScore = processCreditScore(lendingPools[i].creditScore);
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
              <img src={dai.src} alt="dai" />
              <Typography>DAI</Typography>
            </div>
            <Typography>${lendingPools[i].deposit}k</Typography>
            <Typography>{lendingPools[i].TVL}k</Typography>
            <Typography>${lendingPools[i].borrowed}</Typography>
            <Typography>{lendingPools[i].activeAPY}%</Typography>
            <Typography>{lendingPools[i].rewardAPY}%</Typography>
            <Typography>{lendingPools[i].yearnAPY}%</Typography>
            <Typography color={creditScoreColor}>
              {lendingPools[i].creditScore}
            </Typography>
            <ScoreButton
              text="Deposit"
              twProps={"px-6"}
              onClick={() => setOpenBorrow(true)}
            />
          </>
        );
        setLendingPools(styledLendingPools);
      }
    };
    getLendingPools();
  }, []);

  return (
    <>
      <GradientBorder>
        <div className="flex gap-sm w-full">
          <div className="flex md:gap-md gap-sm items-center justify-evenly w-full">
            <div className="flex gap-xs items-center ">
              <img src={coin.src} alt="coin" />
              <Typography variant="h6" component="h4" className="font-bold">
                Lending Pools
              </Typography>
            </div>
            <SearchBar placeholder="Search by ENS or address..." size="lg" />
            <Typography variant="h6" component="span" className="font-bold ">
              {lendersCount} lenders
            </Typography>
            <Typography variant="h6" component="span" className="font-bold ">
              TVL: ${TVL}
            </Typography>
          </div>
        </div>
        <div className="grid grid-cols-9 items-center justify-items-center w-full space-y-sm">
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize self-end"
          >
            Asset
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            Deposit
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            TVL
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            Borrowed
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            Active APY
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            Reward APY
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            Yearn APY
          </Typography>
          <Typography
            variant="h6"
            component="span"
            className="text-darkGreen capitalize"
          >
            CS
          </Typography>
          <div></div>
          {lendingPools && lendingPools}
        </div>
      </GradientBorder>
      <Deposit openBorrow={openBorrow} setOpenBorrow={setOpenBorrow} />
    </>
  );
};

export default LendingPools;
