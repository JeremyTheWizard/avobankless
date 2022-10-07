import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers/lib/ethers";
import { useEffect, useRef, useState } from "react";
import deployments from "../deployments.json";
import { networkConfig } from "../helper-hardhat-config";
import useCreateFlow from "./useCreateFlow";
import useApproveFDAI from "./useFDAIApprove";
import useFDAIUpgrade from "./useFDAIUpgrade";
import useGetNetworkName from "./useGetNeworkName";
import useGetPoolParameters from "./useGetPoolParameters";
import useGetRepaymentAmount from "./useGetRepaymentAmount";
import useGetSDAIBalance from "./useGetSDAIBalance";
import useSDAIApprove from "./useSDAIApprove";

const useBorrow = () => {
  /*
   * 1. Get repayment amount and loan duration
   * 2. Check account superToken balance
   * 3. If balance is 0
   * 3.1 Approve underlyingToken to superToken
   * 3.2 Upgrade underlyingToken to superToken
   * 4. Approve superToken to SuperfluidCallbacks contract
   * 5. Create stream
   */

  // resources
  const { account } = useEthers();

  const getSDAIBalance = useGetSDAIBalance();
  const { fDAIApprove, fDAIApproveState, fDAIResetApprove, fDAIApproveEvents } =
    useApproveFDAI();
  const { fDAIUpgrade, fDAIUpgradeStatus, resetFDAIUpgradeStatus } =
    useFDAIUpgrade();
  const { sDAIApprove, sDAIApproveStatus, resetSDAIApproveStatus } =
    useSDAIApprove();
  const { createFlow, createFlowStatus, resetCreateFlowStatus } =
    useCreateFlow();
  const [borrowStatus, setBorrowStatus] = useState("None");
  const [sDAIBalance, setSDAIBalance] = useState<string | undefined>();
  const [loanAmount, setLoanAmount] = useState<string | undefined>();
  const onGoing = useRef(false);

  // ( 1.
  const repaymentAmount = useGetRepaymentAmount(loanAmount); // if loanAmount is undefined, it will return undefined
  const poolParameters = useGetPoolParameters(account ?? ""); // if account is undefined, it will return undefined
  const loanDuration = poolParameters?.loanDuration;
  // )

  const netWorkName = useGetNetworkName();

  const sDAIAddress = networkConfig[netWorkName ?? ""].sDAI ?? undefined;

  // 3.
  useEffect(() => {
    if (onGoing.current) {
      return;
    }

    if (fDAIApproveState.status !== "None") {
      return;
    }
    if (!sDAIBalance || !repaymentAmount) {
      return;
    }
    if (sDAIApproveStatus !== "None") {
      return;
    }
    if (createFlowStatus !== "None") {
      return;
    }

    if (BigNumber.from(sDAIBalance).lt(repaymentAmount)) {
      // 3.1
      fDAIApprove(sDAIAddress, repaymentAmount);
      onGoing.current = true;
    } else {
      const spender = deployments.contracts.SuperfluidCallbacks.address;

      sDAIApprove(spender, repaymentAmount.toString());
      onGoing.current = true;
    }
  }, [sDAIBalance, repaymentAmount]);

  useEffect(() => {
    if (fDAIApproveState.status === "Success") {
      onGoing.current = false;
    }
    if (fDAIApproveState.status === "Exception") {
      resetFDAIUpgradeStatus();
      setBorrowStatus("Exception");
    }
  }, [fDAIApproveState]);

  useEffect(() => {
    if (onGoing.current) {
      return;
    }

    // 3.2
    if (
      fDAIApproveState.status == "Success" &&
      fDAIUpgradeStatus == "None" &&
      repaymentAmount &&
      repaymentAmount.toString() !== "0"
    ) {
      // upgrade
      onGoing.current = true;
      fDAIUpgrade(repaymentAmount.toString());
    }
  }, [fDAIApproveState, repaymentAmount, fDAIUpgradeStatus]);

  useEffect(() => {
    if (fDAIUpgradeStatus === "Success") {
      onGoing.current = false;
    }
    if (fDAIUpgradeStatus === "Exception") {
      resetFDAIUpgradeStatus();
      setBorrowStatus("Exception");
    }
  }, [fDAIUpgradeStatus]);

  // 4.
  useEffect(() => {
    if (onGoing.current) {
      return;
    }

    if (sDAIApproveStatus !== "None" && createFlowStatus !== "None") {
      return;
    }
    if (fDAIUpgradeStatus == "Success" && repaymentAmount) {
      const spender = deployments.contracts.SuperfluidCallbacks.address;
      const processedRepaymentAmount = repaymentAmount.toString();
      if (processedRepaymentAmount) {
        onGoing.current = true;
        sDAIApprove(spender, processedRepaymentAmount);
      }
    }
  }, [fDAIUpgradeStatus, repaymentAmount, createFlowStatus]);

  useEffect(() => {
    if (sDAIApproveStatus === "Success") {
      onGoing.current = false;
    }
    if (sDAIApproveStatus === "Exception") {
      resetSDAIApproveStatus();
      setBorrowStatus("Exception");
    }
  }, [sDAIApproveStatus]);

  // 5.
  useEffect(() => {
    if (onGoing.current) {
      return;
    }

    if (sDAIApproveStatus === "Exception") {
      setBorrowStatus("Exception");
    }

    if (
      createFlowStatus === "None" &&
      sDAIApproveStatus == "Success" &&
      repaymentAmount &&
      repaymentAmount.toString() !== "0" &&
      loanAmount &&
      loanDuration &&
      loanDuration.toString() !== "0"
    ) {
      onGoing.current = true;

      const flowRate = repaymentAmount.div(loanDuration).toString();
      createFlow(flowRate, loanAmount);
    }
  }, [
    sDAIApproveStatus,
    repaymentAmount,
    loanAmount,
    loanDuration,
    createFlowStatus,
  ]);

  useEffect(() => {
    if (createFlowStatus === "Exception") {
      setBorrowStatus("Exception");
    }
    if (createFlowStatus === "Success") {
      setBorrowStatus("Success");
    }

    resetCreateFlowStatus();
    resetSDAIApproveStatus();
    resetCreateFlowStatus();
    resetFDAIUpgradeStatus();
    fDAIResetApprove();
    setLoanAmount(undefined);
    setSDAIBalance(undefined);
  }, [createFlowStatus]);

  const borrow = async (_loanAmount: string) => {
    if (!account) {
      alert("No account found");
      return;
    }

    onGoing.current = false;

    setLoanAmount(_loanAmount);
    // 2.
    const sDAIBalance = await getSDAIBalance(account);
    setSDAIBalance(sDAIBalance);
  };

  const resetBorrowStatus = () => {
    setBorrowStatus("None");
  };

  return { borrow, borrowStatus, resetBorrowStatus };
};

export default useBorrow;
