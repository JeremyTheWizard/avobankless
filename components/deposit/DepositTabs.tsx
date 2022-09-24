import { Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import borrowerPools from "../../deployments/goerli/BorrowerPools.json";
import token1 from "../../deployments/goerli/Token1.json";
import useApprove from "../../hooks/useApprove";
import useDeposit from "../../hooks/useDeposit";
import { getBorrowState } from "../../slices/borrowSlice";
import { getOthersSlice } from "../../slices/othersSlice";
import InputAmountWithMaximum from "../general/InputAmountWithMaximum";
import ScoreButton from "../navbar/buttons/ScoreButton";
import SelectInterestRangeInput from "./SelectInterestRate";

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
      {value === index && <div className="mt-lg space-y-md">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WithdrawTabs({}) {
  const [value, setValue] = useState(0);
  const { deposit, depositState, resetDeposit, depositEvents } = useDeposit();
  const { account } = useEthers();
  const { selectedPool } = useSelector(getBorrowState);
  const { yieldProjection } = useSelector(getOthersSlice);
  const { approve, approveState, resetApprove, approveEvents } = useApprove();
  const [amount, setAmount] = useState<BigNumber>();
  const [rate, setRate] = useState<BigNumber>();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  useEffect(() => {
    if (approveState.status === "Success") {
      resetApprove();
      deposit(account, amount, rate, selectedPool, token1.address);
    }
    if (approveState.status === "Fail" || approveState.status === "Exception") {
      setFailureMessage(
        approveState.errorMessage ?? "Oops, something went wrong"
      );
      setLoading(false);
      setShowFailureAlert(true);
    }
  }, [approveState]);

  useEffect(() => {
    if (depositState.status === "Success") {
      resetDeposit();
      setLoading(false);
      setShowSuccessAlert(true);
    }
    if (depositState.status === "Fail" || depositState.status === "Exception") {
      setFailureMessage(
        depositState.errorMessage ?? "Oops, something went wrong"
      );
      setLoading(false);
      setShowFailureAlert(true);
    }
  }, [depositState]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const amount = parseEther(String(e.target.amount.value));
    setAmount(amount);
    const rate = parseEther(
      String(Number(e.target.rate.value.slice(0, -1)) / 100)
    );
    setRate(rate);

    approve(borrowerPools.address, amount);
    setLoading(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
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
              className="text-2xl font-bold text-black"
              label="Deposit"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <form onSubmit={onSubmit} className="space-y-md">
            <div className="space-y-md w-full">
              <InputAmountWithMaximum name="amount" />
              <SelectInterestRangeInput
                name="rate"
                showYieldProjection={true}
              />
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Yield Projection
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {yieldProjection}
              </Typography>
            </div>
            <ScoreButton
              text="Deposit"
              twProps="!w-full mt-md"
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </form>
        </TabPanel>
      </Box>
      <div>
        {showFailureAlert && (
          <div className="mt-20 absolute bottom-20 left-20 w-96">
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setShowFailureAlert(false)}
            >
              {failureMessage}
            </Alert>
          </div>
        )}
      </div>
      {showSuccessAlert && (
        <div className="mt-20 absolute bottom-20 left-20 w-96">
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setShowSuccessAlert(false)}
          >
            You have successfully deposited!
          </Alert>
        </div>
      )}
    </>
  );
}
