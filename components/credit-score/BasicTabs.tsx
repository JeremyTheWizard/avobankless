import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import { formatEther } from "ethers/lib/utils";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDeepCompareEffect from "use-deep-compare-effect";
import positionManager from "../..//deployments/goerli/PositionManager.json";
import useGetPoolState from "../../hooks/useGetPoolState";
import useGetPositionsInfo from "../../hooks/useGetPositionsInfo";
import dai from "../../public/dai.png";
import { openBorrow } from "../../slices/borrowSlice";
import { openWithdraw, setSelectedPosition } from "../../slices/withdrawSlice";
import SlideDeckButton from "../navbar/buttons/SlideDeckButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="h-full"
    >
      {value === index && (
        <div className="flex flex-col h-full overflow-x-hidden gap-sm pt-sm">
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({}) {
  const [value, setValue] = useState(0);
  const { account: address } = useEthers();
  const [loans, setLoans] = useState<Array<JSX.Element>>([]);
  const [deposits, setDeposits] = useState<Array<JSX.Element>>([]);
  const [userTokenIds, setUserTokenIds] = useState<string[]>([]);

  const dispatch = useDispatch();
  const userPositionsInfo = useGetPositionsInfo(userTokenIds);

  const getUserPositions = useCallback(async () => {
    if (!address) {
      return;
    }
    let nfts: any;
    const options = {
      method: "GET",
      url: `https://api.nftport.xyz/v0/accounts/${address}`,
      params: {
        chain: "goerli",
        contract_address: positionManager.address,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          process.env.NEXT_PUBLIC_NFT_PORT_AUTHORIZATION ??
          "1a528522-d34f-46e4-be38-b3636bb4407f",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        nfts = response.data.nfts;
      })
      .catch(function (error) {
        console.error(error);
      });

    let tokenIds: string[] = [];
    console.log("nfts", nfts);

    for (let i = 0; i < nfts?.length; i++) {
      tokenIds.push(nfts[i].token_id);
    }
    setUserTokenIds(tokenIds);
  }, [address]);

  useEffect(() => {
    getUserPositions();
  }, [getUserPositions]);

  useDeepCompareEffect(() => {
    if (
      !userPositionsInfo.length ||
      userPositionsInfo.every((x) => x === undefined)
    ) {
      return;
    }

    const styledDeposits = [];
    for (let i = 0; i < userPositionsInfo.length; i++) {
      styledDeposits.push(
        <>
          <div
            key={i}
            className="grid grid-cols-5 justify-items-center items-center "
          >
            <div className="flex gap-xs items-center">
              <img src={dai.src} alt="dai" className="m-0" />
              <h5>Dai</h5>
            </div>
            <span className="text-base">{"0"}</span>
            <span className="text-base">{"?"}</span>
            <span className="text-base">
              {Number(
                formatEther(
                  String(
                    parseInt(
                      userPositionsInfo[i]?.value?.adjustedBalance?._hex,
                      16
                    )
                  )
                )
              ).toFixed(0) ?? "?"}
            </span>
            <SlideDeckButton
              onClick={() => {
                dispatch(openWithdraw());
                dispatch(setSelectedPosition(userTokenIds[i]));
              }}
              text="Withdraw"
              size="sm"
              twProps="!py-1"
            ></SlideDeckButton>
          </div>
        </>
      );
    }
    setDeposits(styledDeposits);
  }, [userPositionsInfo]);

  // Loans tab
  const userPoolState = useGetPoolState(address ?? "");

  useEffect(() => {
    const styledLoans = [];
    if (userPoolState) {
      if (userPoolState[0])
        styledLoans.push(
          <>
            <div className="grid grid-cols-4 justify-items-center items-center">
              <div className="flex gap-xs items-center">
                <img src={dai.src} alt="dai" className="m-0" />
                <span className="text-base">DAI</span>
              </div>
              <span className="text-base">
                {parseInt(userPoolState?.normalizedAvailableDeposits?._hex, 16)}
              </span>
              <span className="text-base">3%</span>
              <span className="text-base">
                {parseInt(userPoolState?.normalizedBorrowedAmount?._hex, 16)}
              </span>
            </div>
          </>
        );
      setLoans(styledLoans);
    }
  }, [userPoolState]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "1.5rem",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            padding: "0px 1.5rem",
            "& .MuiTabs-flexContainer": { justifyContent: "space-evenly" },
          }}
          variant="fullWidth"
        >
          <Tab
            className="text-lg font-extrabold text-black"
            label="Deposits"
            {...a11yProps(0)}
          />
          <Tab
            className="text-lg font-extrabold text-black"
            label="Loans"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <div className="capitalize grid grid-cols-5 justify-items-center ">
          <h6 className="text-base font-semibold text-darkGreen">Assets</h6>
          <h6 className="text-base font-semibold text-darkGreen">Earned</h6>
          <h6 className="text-base font-semibold text-darkGreen">Deposited</h6>
          <h6 className="text-base font-semibold text-darkGreen">Available</h6>
        </div>
        <div className="mb-md">{deposits && deposits}</div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <div className="mb-14 lg:mb-0 space-y-sm">
            <div className="capitalize grid grid-cols-4 justify-items-center">
              <h6 className="text-base  text-darkGreen">Asset</h6>
              <h6 className="text-base  text-darkGreen">Deposited</h6>
              <h6 className="text-base text-darkGreen">Avg. Interest</h6>
              <h6 className="text-base text-darkGreen">Borrowed</h6>
            </div>
            {loans && loans}
          </div>
        </div>
        <div className="w-full max-w-[250px] my-auto self-center">
          <SlideDeckButton
            text="Borrow"
            onClick={() => dispatch(openBorrow())}
          />
        </div>
        <div className="bg-objectDown flex flex-col mt-auto gap-sm py-6">
          <div className="grid grid-cols-2 text-center w-full gap-sm ">
            <h6 className="m-0 text-base font-semibold text-almostWhite">
              Ends On
            </h6>
            <h6 className="m-0 text-base font-semibold text-almostWhite">
              Autopay
            </h6>
          </div>
          <div className="grid grid-cols-2 text-center w-full">
            <span className="m-0 text-base text-almostWhite">
              {parseInt(userPoolState?.currentMaturity._hex, 16)
                ? 0
                : "No duration set"}
            </span>
            <span className="m-0 text-base text-almostWhite">
              {parseInt(userPoolState?.flowRate?._hex ?? 0) === 0
                ? "Borrow first"
                : parseInt(userPoolState?.flowRate?._hex ?? 0)}
            </span>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
