import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  closeWithdraw,
  getWithdrawState,
  openWithdraw,
} from "../../slices/withdrawSlice";
import { useDispatch, useSelector } from "../../store/store";
import CloseCircle from "../general/CloseCircle";
import WithdrawTabs from "./WithdrawTabs";

type Props = {};

const Withdraw: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const withdraw = useSelector(getWithdrawState);

  const handleClose = () => {
    dispatch(closeWithdraw());
  };
  const handleToggle = () => {
    if (withdraw.withdraw === false) {
      dispatch(openWithdraw());
    } else {
      dispatch(closeWithdraw());
    }
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(40px)",
        }}
        open={withdraw.withdraw}
        onClick={handleClose}
      >
        <div
          onClick={(e) => stopPropagation(e)}
          className="space-y-lg w-full max-w-4xl flex flex-col items-center p-md"
        >
          <Typography variant="h5" className="font-bold">
            WITHDRAW
          </Typography>
          <WithdrawTabs />
        </div>
        <CloseCircle />
      </Backdrop>
    </div>
  );
};

export default Withdraw;
