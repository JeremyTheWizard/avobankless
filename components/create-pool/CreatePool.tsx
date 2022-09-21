import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CloseCircle from "../general/CloseCircle";
import CreatePoolTabs from "./CreatePoolTabs";

type Props = {
  openCreatePool: boolean;
  setOpenCreatePool: (open: boolean) => void;
};

const CreatePool: React.FC<Props> = ({ openCreatePool, setOpenCreatePool }) => {
  const handleClose = () => {
    setOpenCreatePool(false);
  };
  const handleToggle = () => {
    setOpenCreatePool(!openCreatePool);
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
        open={openCreatePool}
        onClick={handleClose}
      >
        <div
          onClick={(e) => stopPropagation(e)}
          className="space-y-lg w-full max-w-4xl flex flex-col items-center"
        >
          <Typography variant="h5" className="font-bold">
            CREATE YOUR POOL
          </Typography>
          <CreatePoolTabs />
        </div>
        <CloseCircle />
      </Backdrop>
    </div>
  );
};

export default CreatePool;
