import CloseCircle from "../general/CloseCircle";
import ScoreButton from "../navbar/buttons/ScoreButton";

type WrapperProps = {
  children: React.ReactNode;
};

const DialogWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 z-10 w-screen h-screen space-y-md bg-white flex flex-col items-center justify-center">
      <CloseCircle />
      {children}
    </div>
  );
};

export const VerifyStep1: React.FC = () => {
  return (
    <DialogWrapper>
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
