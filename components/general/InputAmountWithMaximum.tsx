import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { FC, useState } from "react";
import dai from "../../public/dai.png";

type Props = {
  placeholder?: string | null | undefined;
  size?: "sm" | "md" | "lg";
  name?: string;
  disabled?: boolean;
  disabledText?: string;
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

const MaxWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
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

const Search: FC<{
  children: React.ReactNode;
  disabled?: boolean;
  disabledText?: string;
}> = ({ children, disabled, disabledText }) => {
  return (
    <div
      className={`relative rounded-2xl shadow-equal w-full min-w-[110px] flex ${
        disabled ? "bg-gray-400" : "bg-white"
      }
        `}
    >
      <div className="w-full flex flex-col items-center absolute h-full justify-center">
        {disabledText && disabledText}
      </div>
      {children}
    </div>
  );
};

const WithdrawAmountInput: FC<Props> = ({
  placeholder,
  size = "md",
  name,
  disabled,
  disabledText,
}) => {
  const [value, setValue] = useState<string | number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Search disabled={disabled} disabledText={disabledText}>
      <SearchIconWrapper>{DAI}</SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={handleChange}
        className="w-full"
        placeholder={
          placeholder ? placeholder : placeholder == null ? undefined : "0.00"
        }
        inputProps={{ "aria-label": "search" }}
        type="number"
        name={name}
        required={true}
        disabled={disabled}
      />
      <MaxWrapper>
        <Typography variant="h6" className="text-darkGreen cursor-pointer">
          MAX
        </Typography>
      </MaxWrapper>
    </Search>
  );
};

export default React.memo(WithdrawAmountInput);
