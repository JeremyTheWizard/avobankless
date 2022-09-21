import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CloseCircle from "../general/CloseCircle";
import DepositTabs from "./DepositTabs";

type Props = {
  openBorrow: boolean;
  setOpenBorrow: (open: boolean) => void;
};

const Deposit: React.FC<Props> = ({ openBorrow, setOpenBorrow }) => {
  const handleClose = () => {
    setOpenBorrow(false);
  };
  const handleToggle = () => {
    setOpenBorrow(!openBorrow);
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
        open={openBorrow}
        onClick={handleClose}
      >
        <div
          onClick={(e) => stopPropagation(e)}
          className="space-y-lg w-full max-w-4xl flex flex-col items-center"
        >
          <Typography variant="h5" className="font-bold">
            Deposit
          </Typography>
          <DepositTabs />
        </div>
        <CloseCircle />
      </Backdrop>
    </div>
  );
};

export default Deposit;
