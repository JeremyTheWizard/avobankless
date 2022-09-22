import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import GradientBox from "../../components/general/GradientBox";
import borrow from "../../public/borrow.png";
import creditScore from "../../public/credit-score.png";
import lend from "../../public/lend.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const slides = [
  <GradientBox
    twProps={
      "flex-col items-center relative gap-sm pb-14 max-w-sm sm:max-w-xl md:max-w-2xl "
    }
  >
    <img src={borrow.src} alt="Hand holding coin" className="w-40 h-40 m-0" />
    <h2 className="text-almostWhite">Borrowing any time</h2>
    <p>
      Receive competitive Lending Rates in a crypto credit line in the form of a
      liquidity pool where you can withdraw at any time.
    </p>
  </GradientBox>,
  <GradientBox
    twProps={
      "flex-col items-center relative gap-sm pb-14 max-w-sm sm:max-w-xl md:max-w-2xl "
    }
  >
    <img src={lend.src} alt="hand giving cash" className="w-40 h-40 m-0" />
    <h2 className="text-almostWhite">Lend with Autopay</h2>
    <p>
      Take advantage of payment streams to automatically amortize loans with
      consistent returns, always with liquidity.
    </p>
  </GradientBox>,
  <GradientBox
    twProps={
      "flex-col items-center relative gap-sm pb-14 max-w-sm sm:max-w-xl md:max-w-2xl "
    }
  >
    <img src={creditScore.src} alt="eth badge" className="w-40 h-40 m-0" />
    <h2 className="text-almostWhite ">NFT Credit Score</h2>
    <p>
      Connect your history DeFi on-chain into a single composable asset and
      develop your borrower profile.
    </p>
  </GradientBox>,
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = slides.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full h-full flex flex-col self-center">
      <AutoPlaySwipeableViews
        interval={5000}
        className="overflow-hidden rounded-2xl"
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {slides.map((step, index) => (
          <div
            key={index}
            className="overflow-hidden flex flex-col items-center px-4 rounded-2xl"
          >
            {Math.abs(activeStep - index) <= 2 ? slides[index] : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            style={{ visibility: "hidden" }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            style={{ visibility: "hidden" }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
