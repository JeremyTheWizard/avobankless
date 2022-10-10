import { Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEthers } from "@usedapp/core";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";
import * as React from "react";
import { useEffect, useState } from "react";
import useBorrow from "../../hooks/useBorrow";
import useEstimateLoanRate from "../../hooks/useEstimateLoanRate";
import useGetPoolParameters from "../../hooks/useGetPoolParameters";
import useGetPoolState from "../../hooks/useGetPoolState";
import useGetRepaymentAmount from "../../hooks/useGetRepaymentAmount";
import ScoreButton from "../navbar/buttons/ScoreButton";
import InputAmountWithMaximum from "./InputAmountWithMaximum";

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
  const [loading, setLoading] = useState(false);
  const { borrow, borrowStatus, resetBorrowStatus } = useBorrow();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const { account } = useEthers();
  const [normalizedBorrowedAmount, setNormalizedBorrowedAmount] = useState<
    string | undefined
  >();
  const repaymentAmount = useGetRepaymentAmount(normalizedBorrowedAmount);

  const estimatedInterestRate = useEstimateLoanRate(
    normalizedBorrowedAmount,
    account
  );

  const poolState = useGetPoolState(account);
  const poolParameters = useGetPoolParameters(account);

  useEffect(() => {
    if (borrowStatus === "Success") {
      setShowSuccessAlert(true);
      setLoading(false);
      resetBorrowStatus();
    }
    if (borrowStatus === "Fail" || borrowStatus === "Exception") {
      setFailureMessage("Oops, something went wrong");
      setShowFailureAlert(true);
      setLoading(false);
      resetBorrowStatus();
    }
  }, [
    borrowStatus,
    resetBorrowStatus,
    setShowFailureAlert,
    setLoading,
    setShowSuccessAlert,
    setFailureMessage,
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const amount = parseEther(String(e.target.amount.value));
    borrow(amount.toString());
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
          <p>
            <span className="font-bold">IMPORTANT:</span> To borrow you will
            start an auto repayment stream. Tokens will be streamed from your
            account to the protocol each second.
            <br />
            <br />
            <span className="underline">
              Please ensure you have enough super DAI(DAIx) at all moments
            </span>{" "}
            to make the minimum payments. Otherwise, you will be{" "}
            <span className="text-darkishRed">
              liquidated, penalized and additional fees will be accrued.
            </span>
            <br />
            <br />
          </p>
          <form onSubmit={onSubmit} className="space-y-md">
            <div className="space-y-md w-full">
              <InputAmountWithMaximum
                name="amount"
                setNormalizedBorrowedAmount={setNormalizedBorrowedAmount}
              />
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                DAI Available
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {formatEther(
                  poolState?.normalizedAvailableDeposits?.toString() ?? "0"
                ) ?? "---"}
              </Typography>
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Interest Rate Aprox.
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {(
                  estimatedInterestRate &&
                  Number(formatUnits(estimatedInterestRate.toString(), 16))
                )?.toFixed(2) ?? "---"}{" "}
                %
              </Typography>
            </div>
            <div className="flex justify-between w-full">
              <Typography variant="h6" component="span" className="font-bold">
                Autopay
              </Typography>
              <Typography variant="h6" component="span" className="font-bold">
                {(
                  repaymentAmount &&
                  poolParameters &&
                  parseInt(repaymentAmount.toString()) /
                    parseInt(poolParameters.loanDuration.toString())
                )?.toFixed(10) ?? "---"}
                /sec
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
