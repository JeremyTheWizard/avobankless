import BackArrow from "../general/BackArrow";
import CloseCircle from "../general/CloseCircle";
import ScoreButton from "../navbar/buttons/ScoreButton";

type WrapperProps = {
  children: React.ReactNode;
  backArrow?: boolean;
};

const DialogWrapper: React.FC<WrapperProps> = ({ children, backArrow }) => {
  return (
    <div className="fixed inset-0 z-10 w-full h-full bg-white overflow-auto">
      <div className="w-[90vw] h-full m-auto">
        <div className="relative">
          <CloseCircle />
          {backArrow && <BackArrow />}
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center space-y-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export const VerifyStep1: React.FC = () => {
  return (
    <DialogWrapper backArrow={true}>
      <div className="space-y-sm text-center">
        <h3 className="font-extrabold">Verify your identity</h3>
        <p className="w-full max-w-prose text-md">
          <span className="text-darkGreen"> Avobankless</span>
          {
            "needs to verify your identity. After the process you'll get a Soulbound token representing your identity. Once done your private details will be deleted."
          }
        </p>
      </div>
      <div className="space-y-md">
        <span>Use your webcam or phone to photograph:</span>
        <ol className="list-decimal space-y-sm">
          <li>Your identity document</li>
          <li>Your face</li>
        </ol>
      </div>
      <ScoreButton text="Choose document" />
      <span>
        <span className="text-darkGreen">Avobankless</span> does not sell
        personal information. Your data belongs to you.
      </span>
    </DialogWrapper>
  );
};

export const VerifyStep2: React.FC = () => {
  return <div></div>;
};
