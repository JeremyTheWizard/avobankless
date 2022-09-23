import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { BigNumber } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import dai from "../../public/dai.png";

type Props = {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  setMaximum?:
    | Dispatch<SetStateAction<BigNumber | number>>
    | React.MutableRefObject<undefined>;
  name?: string;
  marginLeft?: string;
};

const WithdrawAmountInput: FC<Props> = ({
  placeholder,
  size = "md",
  icon,
  setMaximum,
  name,
  marginLeft,
}) => {
  const Search: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div
        className={`relative rounded-2xl shadow-equal w-full min-w-[110px] flex bg-white
        `}
      >
        {children}
      </div>
    );
  };

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const DAI = (
    <div className="flex gap-xs items-center">
      <img src={dai.src} alt="" />
      <span>DAI</span>
    </div>
  );

  const onChange = (e: any) => {
    setMaximum ? e.target.value : null;
  };

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    require: true,
    inputMode: "numeric",
    fontSize: 20,
    pattern: "[0-9]",
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(3, 1, 3, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: marginLeft ? marginLeft : `calc(6em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>{icon ? icon : DAI}</SearchIconWrapper>
      <StyledInputBase
        onChange={onChange}
        required={true}
        name={name ? name : "amount"}
        className="w-full"
        placeholder={placeholder ? placeholder : "Maximum amount to borrow"}
        inputProps={{ "aria-label": "search" }}
        type="number"
      />
    </Search>
  );
};

export default WithdrawAmountInput;
