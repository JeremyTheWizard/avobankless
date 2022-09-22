import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import dai from "../../public/dai.png";
import { openBorrow } from "../../slices/borrowSlice";
import { getWithdrawState, openWithdraw } from "../../slices/withdrawSlice";
import { Deposits, Loans } from "../../utils/types";
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
  const { address } = useAccount();
  const [deposits, setDeposits] = useState<Array<JSX.Element>>([]);
  const [loansInfo, setLoansInfo] = useState<Loans>([]);
  const [loans, setLoans] = useState<Array<JSX.Element>>([]);
  const { withdraw } = useSelector(getWithdrawState);

  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    let deposits: Deposits | undefined;
    const getAddressDeposits = async () => {
      if (address) {
        try {
          deposits = await axios
            .get(`./api/deposits/${address}`)
            .then((res) => res.data.deposits);
        } catch (err) {
          return err;
        }
      }
      const styledDeposits = [];
      if (deposits) {
        for (let i = 0; i < deposits.length; i++) {
          styledDeposits.push(
            <>
              <div
                key={i}
                className="grid grid-cols-5 justify-items-center items-center "
              >
                <div className="flex gap-xs items-center">
                  <img src={dai.src} alt="dai" className="m-0" />
                  <Typography>DAI</Typography>
                </div>
                <span className="text-base">${deposits[i].deposited}K</span>
                <span className="text-base">${deposits[i].earned}K</span>
                <span className="text-base">${deposits[i].available}K</span>
                <SlideDeckButton
                  onClick={() => dispatch(openWithdraw())}
                  text="Withdraw"
                  size="sm"
                  twProps="!py-1"
                ></SlideDeckButton>
              </div>
            </>
          );
        }
      }
      setDeposits(styledDeposits);
    };
    getAddressDeposits();
  }, [address]);

  useEffect(() => {
    let loans: Loans | undefined;
    const getAddressLoans = async () => {
      if (address) {
        try {
          loans = await axios
            .get(`./api/loans/${address}`)
            .then((res) => res.data.loans);
        } catch (err) {
          return err;
        }
      }
      const styledLoans = [];
      if (loans) {
        setLoansInfo(loans);
        for (let i = 0; i < loans.length; i++) {
          styledLoans.push(
            <>
              <div
                key={i}
                className="grid grid-cols-3 justify-items-center items-center"
              >
                <div className="flex gap-xs items-center">
                  <img src={dai.src} alt="dai" className="m-0" />
                  <span className="text-base">DAI</span>
                </div>
                <span className="text-base">{loans[i].avgInterest}</span>
                <span className="text-base">{loans[i].borrowed}</span>
              </div>
            </>
          );
        }
      }
      setLoans(styledLoans);
    };
    getAddressLoans();
  }, [address]);

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
            <div className="capitalize grid grid-cols-3 justify-items-center">
              <h6 className="text-base  text-darkGreen">Asset</h6>
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
              {loansInfo[0]?.endsOn}
            </span>
            <span className="m-0 text-base text-almostWhite">
              {loansInfo[0]?.flowRate}
            </span>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
