import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React, { FC, useState } from "react";
import dai from "../../public/dai.png";

type Props = {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  name?: string;
  marginLeft?: string;
};

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
    <Image src={dai} alt="" />
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

const WithdrawAmountInput: FC<Props> = ({
  placeholder,
  size = "md",
  icon,
  name,
  marginLeft,
}) => {
  const [value, setValue] = useState<number | string>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>{icon ? icon : DAI}</SearchIconWrapper>
      <StyledInputBase
        onChange={onChange}
        value={value}
        required={true}
        name={name ? name : "amount"}
        className="w-full"
        placeholder={placeholder ? placeholder : "Maximum amount to borrow"}
        inputProps={{ "aria-label": "search" }}
        type="number"
        sx={{
          "& .MuiInputBase-input": {
            paddingLeft: `${marginLeft && marginLeft}`,
            width: "100%",
          },
        }}
      />
    </Search>
  );
};

export default WithdrawAmountInput;
