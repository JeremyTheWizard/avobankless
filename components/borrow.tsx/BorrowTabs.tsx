import { Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEthers } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";
import * as React from "react";
import { useEffect, useState } from "react";
import useBorrow from "../../hooks/useBorrow";
import WithdrawAmountInput from "../general/InputAmountWithMaximum";
import ScoreButton from "../navbar/buttons/ScoreButton";

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

export default function BorrowTabs({}) {
  const [value, setValue] = useState(0);
  const [earned, setEarned] = useState(0);
  const [available, setAvailable] = useState(0);
  const [loading, setLoading] = useState(false);
  const { borrow, borrowState, resetBorrowState, borrowEvents } = useBorrow();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const { account } = useEthers();

  useEffect(() => {
    if (borrowState.status === "Success") {
      setShowSuccessAlert(true);
      setLoading(false);
      resetBorrowState();
    }
    if (borrowState.status === "Fail" || borrowState.status === "Exception") {
      setFailureMessage(
        borrowState.errorMessage ?? "Oops, something went wrong"
      );
      setShowFailureAlert(true);
      setLoading(false);
      resetBorrowState();
    }
  }, [borrowState]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const amount = parseEther(String(e.target.amount.value));
    console.log("account", account);
    borrow(account, amount);
    setLoading(true);
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
              className="text-lg font-extrabold text-black"
              label="Borrow"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <form onSubmit={onSubmit} className="space-y-md">
            <div className="space-y-md w-full">
              <WithdrawAmountInput name="amount" />
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                AVG Interest
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {earned}
              </Typography>
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Available
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {available}
              </Typography>
            </div>
            <ScoreButton
              text="Borrow"
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
            Your funds have been transferred successfully!
          </Alert>
        </div>
      )}
    </>
  );
}
