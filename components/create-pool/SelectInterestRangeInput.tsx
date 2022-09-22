import {
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  options?: string[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: "1rem",
    },
  },
};

const WithdrawAmountInput: FC<Props> = ({
  placeholder,
  size = "md",
  options = ["Interest Range: 2% - 15%"],
}) => {
  const [personName, setPersonName] = React.useState<string[]>([options[0]]);
  const theme = useTheme();

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
    color: "inherit",
    borderRadius: "1rem",
    "& .MuiInputBase-input": {
      padding: theme.spacing(3, 1, 3, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      borderRadius: "1rem",
      backgroundColor: "white",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0px",
    },
  }));

  return (
    <>
      <div className="shadow-equal rounded-2xl">
        <Select
          sx={{ width: "100%", borderRadius: "1rem" }}
          value={personName}
          displayEmpty
          input={<StyledInputBase />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default WithdrawAmountInput;
