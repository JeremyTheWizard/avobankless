import Backdrop from "@mui/material/Backdrop";
import {
  closeBorrow,
  getBorrowState,
  openBorrow,
} from "../../slices/borrowSlice";
import { useDispatch, useSelector } from "../../store/store";
import CloseCircle from "../general/CloseCircle";
import BorrowTabs from "./BorrowTabs";

type Props = {};

const Borrow: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const borrow = useSelector(getBorrowState);

  const handleClose = () => {
    dispatch(closeBorrow());
  };
  const handleToggle = () => {
    if (borrow.borrow === false) {
      dispatch(openBorrow());
    } else {
      dispatch(closeBorrow());
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
        open={borrow.borrow}
        onClick={handleClose}
      >
        <div
          onClick={(e) => stopPropagation(e)}
          className="space-y-lg w-full max-w-4xl flex flex-col items-center p-md"
        >
          <BorrowTabs />
        </div>
        <CloseCircle />
      </Backdrop>
    </div>
  );
};

export default Borrow;
