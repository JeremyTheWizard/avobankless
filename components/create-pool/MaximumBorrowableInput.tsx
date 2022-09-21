import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import dai from "../../public/dai.png";

type Props = {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
};

const WithdrawAmountInput: FC<Props> = ({ placeholder, size = "md" }) => {
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    inputMode: "numeric",
    fontSize: 20,
    pattern: "[0-9]",
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(3, 1, 3, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(6em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>{DAI}</SearchIconWrapper>
      <StyledInputBase
        className="w-full"
        placeholder={"Maximum amount to borrow"}
        inputProps={{ "aria-label": "search" }}
        type="number"
      />
    </Search>
  );
};

export default WithdrawAmountInput;
