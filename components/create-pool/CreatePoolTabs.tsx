import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  cooldownPeriod,
  distributionRate,
  establishmentFeeRate,
  lateRepayFeePerBondRate,
  liquidityRewardsActivationThreshold,
  loanDuration,
  maxBorrowableAmount,
  maxRateInput,
  minRateInput,
  rateSpacingInput,
  repaymentFeeRate,
  repaymentPeriod,
} from "../../constants";
import token1 from "../../deployments/goerli/Token1.json";
import yearnFinanceWrapper from "../../deployments/goerli/YearnFinanceWrapper.json";
import useCreatePool from "../../hooks/useCreatePool";
import ScoreButton from "../navbar/buttons/ScoreButton";
import MaximumInput from "./MaximumInput";
import SelectInterestRangeInput from "./SelectInterestRangeInput";

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
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const { createNewPool, createNewPoolState } = useCreatePool();

  useEffect(() => {
    console.log("🚀 ~ createNewPoolState", createNewPoolState);
    if (
      createNewPoolState.status === "Fail" ||
      createNewPoolState.status === "Exception"
    ) {
      setFailureMessage(
        createNewPoolState.errorMessage ?? "Oops, something went wrong"
      );
      setShowFailureAlert(true);

      setLoading(false);
    }
    if (createNewPoolState.status === "PendingSignature") {
      setLoading(true);
    }
    if (createNewPoolState.status === "Success") {
      setLoading(false);
      setShowSuccessAlert(true);
    }
  }, [createNewPoolState]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const params = {
      poolOwner: address,
      underlyingToken: token1.address,
      yieldProvider: yearnFinanceWrapper.address,
      minRate: minRateInput,
      maxRate: maxRateInput,
      rateSpacing: rateSpacingInput,
      maxBorrowableAmount: maxBorrowableAmount, //parseEther(String(e.target.maximumBorrowable.value)),
      loanDuration: loanDuration, //e.target.loanDuration.value,
      distributionRate: distributionRate,
      cooldownPeriod: cooldownPeriod,
      repaymentPeriod: repaymentPeriod,
      lateRepayFeePerBondRate: lateRepayFeePerBondRate,
      establishmentFeeRate: establishmentFeeRate,
      repaymentFeeRate: repaymentFeeRate,
      liquidityRewardsActivationThreshold: liquidityRewardsActivationThreshold,
      earlyRepay: true,
    };

    createNewPool(params);
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
              label="Create your own pool"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <form onSubmit={onSubmit} noValidate={false}>
            <div className="space-y-md w-full">
              <MaximumInput name="maximumBorrowable" />
              <MaximumInput
                placeholder="Liquidity rewards"
                name="liquidityRewards"
              />
              <MaximumInput
                placeholder="Loan duration"
                icon={<span></span>}
                name="loanDuration"
                marginLeft="2rem"
              />
              <SelectInterestRangeInput />
            </div>
            <ScoreButton
              type="submit"
              text="Create"
              twProps="!w-full mt-lg"
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
            You have created your pool successfully!
          </Alert>
        </div>
      )}
    </>
  );
}
