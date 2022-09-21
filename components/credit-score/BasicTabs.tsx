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
    >
      {value === index && <div className="pt-sm">{children}</div>}
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
                className="grid grid-cols-5 justify-items-center items-center"
              >
                <div className="flex gap-xs items-center">
                  <img src={dai.src} alt="dai" />
                  <Typography>DAI</Typography>
                </div>
                <Typography>${deposits[i].deposited}K</Typography>
                <Typography>${deposits[i].earned}K</Typography>
                <Typography>${deposits[i].available}K</Typography>
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
        for (let i = 0; i < loans.length; i++) {
          styledLoans.push(
            <>
              <div
                key={i}
                className="grid grid-cols-5 justify-items-center items-center"
              >
                <div className="flex gap-xs items-center">
                  <img src={dai.src} alt="dai" />
                  <Typography>DAI</Typography>
                </div>
                <Typography>{loans[i].avgInterest}</Typography>
                <Typography>{loans[i].borrowed}</Typography>
                <Typography>{loans[i].endsOn}</Typography>
                <Typography>{loans[i].flowRate}</Typography>
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
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
        <div className="capitalize grid grid-cols-5 justify-items-center pb-sm">
          <Typography className="font-semibold text-darkGreen">
            Assets
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Earned
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Deposited
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Available
          </Typography>
        </div>
        {deposits && deposits}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="capitalize grid grid-cols-5 justify-items-center pb-sm">
          <Typography className="font-semibold text-darkGreen">
            Asset
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Avg. Interest
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Borrowed
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Ends On
          </Typography>
          <Typography className="font-semibold text-darkGreen">
            Autopay
          </Typography>
        </div>
        {loans && loans}
      </TabPanel>
    </Box>
  );
}
