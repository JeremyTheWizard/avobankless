import { FiArrowLeft } from "react-icons/fi";
import { closeDialog } from "../../slices/creditScoreDialogSlice";
import { useDispatch } from "../../store/store";

const BackArrow = () => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(closeDialog())}
      className="w-16 h-16 rounded-full bg-object absolute top-20 flex items-center justify-center border-2 border-almostBlack cursor-pointer"
    >
      <FiArrowLeft size="32" color="#FDFFFB" />
    </div>
  );
};

export default BackArrow;
