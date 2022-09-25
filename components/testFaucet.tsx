import { Alert, CircularProgress } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import useGetTestDAI from "../hooks/useGetTestDAI";
import useGetUserBalance from "../hooks/useGetUserBalance";

export default function TestFaucet() {
  const { mint, mintState, resetMint, mintEvents } = useGetTestDAI();
  const { account } = useEthers();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [userBalance, setUserBalance] = useState();
  const balance = useGetUserBalance(account);

  useEffect(() => {
    if (!balance) {
      return;
    }

    if (parseInt(balance._hex, 16) < 100) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, [balance]);

  const handleClick = () => {
    mint(account, parseEther("1000"));
    setLoading(true);
  };

  useEffect(() => {
    if (mintState.status === "Success") {
      setLoading(false);
      setShowSuccessAlert(true);
      resetMint();
      setShowComponent(false);
    }
    if (mintState.status === "Fail" || mintState.status === "Exception") {
      setLoading(false);
      setFailureMessage(mintState.errorMessage ?? "Oops, something went wrong");
      setShowFailureAlert(true);
      resetMint();
    }
  }, [mintState]);

  const component = () => {
    if (showComponent && account) {
      return (
        <>
          <div
            onClick={() => handleClick()}
            className="fixed bottom-5 right-5 md:bottom-10 md:right-10 w-56 p-sm bg-red-600 rounded-2xl cursor-pointer text-white flex justify-center items-center"
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <span className="font-bold text-3xl">Get test DAI</span>
            )}
          </div>
        </>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <>
      {component()}
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
            You have received very fake DAI.
          </Alert>
        </div>
      )}
    </>
  );
}
