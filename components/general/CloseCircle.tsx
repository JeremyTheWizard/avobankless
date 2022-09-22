import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "../../store/store";

const CloseCircle = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-12 h-12 rounded-full bg-object absolute top-10 right-5 md:top-20 md:right-10 xl:right-40 2xl:right-80 flex items-center justify-center border-2 border-almostBlack cursor-pointer">
      <AiOutlineClose size="28" color="#000" />
    </div>
  );
};

export default CloseCircle;
