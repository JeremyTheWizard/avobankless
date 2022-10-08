import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import { formatEther, formatUnits } from "ethers/lib/utils";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useDeepCompareEffect from "use-deep-compare-effect";
import positionManager from "../..//deployments/goerli/PositionManager.json";
import useGetFlowInfo from "../../hooks/useGetFlowInfo";
import useGetPoolAggregates from "../../hooks/useGetPoolAggregates";
import useGetPoolState from "../../hooks/useGetPoolState";
import useGetPositionsInfo from "../../hooks/useGetPositionsInfo";
import useGetPositionsRepatriations from "../../hooks/useGetPositionsRepartitions";
import dai from "../../public/dai.png";
import { dispatchTotalBorrowed, openBorrow } from "../../slices/borrowSlice";
import { getCreatePoolSlice, setLoans } from "../../slices/createPoolSlice";
import {
  dispatchUserDepositsTotal,
  dispatchUserTokenIds,
  getUserPositionsState,
} from "../../slices/userPositionsSlice";
import {
  dispatchUserAvailableTotal,
  openWithdraw,
  setSelectedPosition,
} from "../../slices/withdrawSlice";
import formatEtherWithCustomDecimals from "../../utils/formatEtherWithCustomDecimals";
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
  const { account } = useEthers();
  const { loans } = useSelector(getCreatePoolSlice);
  const [deposits, setDeposits] = useState<Array<JSX.Element>>([]);
  const { userTokenIds } = useSelector(getUserPositionsState);

  const dispatch = useDispatch();
  const userPositionsInfo = useGetPositionsInfo(userTokenIds);

  const poolAggregates = useGetPoolAggregates(account ?? "");

  const positionRepartition = useGetPositionsRepatriations(userTokenIds);

  const getUserPositions = useCallback(async () => {
    if (!account) {
      setDeposits([]);
      dispatch(setLoans([]));
      dispatch(dispatchUserTokenIds([]));

      return;
    }
    let nfts: any;
    const options = {
      method: "GET",
      url: `https://api.nftport.xyz/v0/accounts/${account}`,
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
        nfts = response.data.nfts;
      })
      .catch(function (error) {
        console.error(error);
      });

    let tokenIds: string[] = [];

    for (let i = 0; i < nfts?.length; i++) {
      tokenIds.push(nfts[i].token_id);
    }
    dispatch(dispatchUserTokenIds(tokenIds));
  }, [account]);

  useEffect(() => {
    getUserPositions();
  }, [getUserPositions]);

  useDeepCompareEffect(() => {
    const styledDeposits: any = [];
    if (
      !userPositionsInfo.length ||
      userPositionsInfo.every((x) => x === undefined)
    ) {
      setDeposits(styledDeposits);
      return;
    }

    let userDepositsTotal = 0;
    let userAvailableTotal = 0;
    for (let i = 0; i < userPositionsInfo.length; i++) {
      userDepositsTotal += parseFloat(
        formatEther(userPositionsInfo[i]?.value?.adjustedBalance?.toString())
      );
      userAvailableTotal += parseFloat(
        formatEther(
          positionRepartition[i].value?.normalizedDepositedAmount?.toString()
        )
      );

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
            <span className="text-base">0</span>
            <span className="text-base">
              {formatEtherWithCustomDecimals(
                userPositionsInfo[i]?.value?.adjustedBalance?.toString(),
                0
              )}
            </span>
            <span className="text-base">
              {formatEtherWithCustomDecimals(
                positionRepartition[
                  i
                ].value?.normalizedDepositedAmount?.toString(),
                0
              )}
            </span>
            <SlideDeckButton
              onClick={() => {
                dispatch(openWithdraw());
                dispatch(
                  setSelectedPosition({
                    tokenId: userTokenIds[i],
                    available: formatEtherWithCustomDecimals(
                      positionRepartition[
                        i
                      ].value?.normalizedDepositedAmount?.toString(),
                      0
                    ),
                  })
                );
              }}
              text="Withdraw"
              size="sm"
              twProps="!py-1"
            ></SlideDeckButton>
          </div>
        </>
      );
    }
    dispatch(dispatchUserDepositsTotal(userDepositsTotal));
    dispatch(dispatchUserAvailableTotal(userAvailableTotal));
    setDeposits(styledDeposits);
  }, [userPositionsInfo]);

  // Loans tab
  const userPoolState = useGetPoolState(account ?? "");

  const flowInfo = useGetFlowInfo(
    userPoolState?.normalizedBorrowedAmount?._hex != "0x00"
      ? account
      : undefined
  );

  useEffect(() => {
    const styledLoans = [];
    if (!poolAggregates) {
      dispatch(setLoans(undefined));
      return;
    }

    if (userPoolState) {
      if (userPoolState[0]) {
        dispatch(
          dispatchTotalBorrowed(
            formatEtherWithCustomDecimals(
              userPoolState?.normalizedBorrowedAmount?.toString(),
              0
            )
          )
        );
        styledLoans.push(
          <>
            <div className="grid grid-cols-4 justify-items-center items-center">
              <div className="flex gap-xs items-center">
                <img src={dai.src} alt="dai" className="m-0" />
                <span className="text-base">DAI</span>
              </div>
              <span className="text-base">
                {formatEtherWithCustomDecimals(
                  userPoolState?.normalizedAvailableDeposits?._hex
                )}
              </span>
              <span className="text-base">
                {formatUnits(
                  poolAggregates.weightedAverageLendingRate?.toString(),
                  16
                )}
                %
              </span>
              <span className="text-base">
                {formatEtherWithCustomDecimals(
                  userPoolState?.normalizedBorrowedAmount?._hex
                )}
              </span>
            </div>
          </>
        );
        dispatch(setLoans(styledLoans));
      } else {
        dispatch(setLoans(undefined));
      }
    }
  }, [userPoolState, dispatch, poolAggregates]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGoTuSuperfluid = () => {
    window.open("https://app.superfluid.finance/", "_blank");
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
        {deposits.length ? (
          <div className="mb-md">{deposits}</div>
        ) : (
          <span className="text-lg md:text-xl font-bold self-center mt-md">
            No deposits yet
          </span>
        )}
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
        {
          <div className="w-full p-sm my-auto self-center flex flex-col items-center">
            <div className="w-full max-w-[250px] my-auto self-center">
              <SlideDeckButton
                text="Borrow"
                onClick={() => dispatch(openBorrow())}
                disabled={
                  loans?.length &&
                  userPoolState?.normalizedAvailableDeposits?._hex != "0x00"
                    ? false
                    : true
                }
              />
            </div>
            {loans?.length &&
            userPoolState?.normalizedAvailableDeposits?._hex != "0x00" ? (
              ""
            ) : loans?.length ? (
              <span className="text-lg md:text-lg self-center my-auto p-sm text-center">
                Once someone deposits funds you will be able to borrow
              </span>
            ) : (
              <span className="text-lg md:text-lg self-center my-auto p-sm text-center">
                Create a pool first to be able to borrow and see your loans.
              </span>
            )}
          </div>
        }
        <div className="bg-objectDown flex flex-col mt-auto gap-sm py-6">
          <div className="grid grid-cols-2 text-center w-full gap-sm ">
            <h6 className="m-0 text-base font-semibold text-almostWhite">
              Ends On
            </h6>
            <Tooltip title="manage your stream." placement="top">
              <div
                onClick={handleGoTuSuperfluid}
                className="mx-auto flex gap-xs cursor-pointer"
              >
                <h6 className="m-0 text-base font-semibold text-almostWhite">
                  Autopay
                </h6>
                <MdOpenInNew size="24" color="#FDFFFB" />
              </div>
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 text-center w-full">
            <span className="m-0 text-base text-almostWhite">
              {userPoolState &&
              userPoolState?.normalizedBorrowedAmount?._hex != "0x00"
                ? new Date(
                    userPoolState?.currentMaturity.toNumber() * 1000
                  ).toLocaleDateString("en-US") ?? "---"
                : "Borrow first"}
            </span>
            <span className="m-0 text-base text-almostWhite">
              {userPoolState &&
              userPoolState?.normalizedBorrowedAmount?.toString() != "0"
                ? flowInfo && flowInfo.flowRate !== "0"
                  ? formatEther(flowInfo.flowRate).toString().slice(0, 10) +
                    "..." +
                    "/sec"
                  : "Create a stream. You will default if you don't."
                : "Borrow first"}
            </span>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
