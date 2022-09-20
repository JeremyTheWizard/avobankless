import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { FC } from "react";

type Props = {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
};

const SearchBar: FC<Props> = ({ placeholder, size = "md" }) => {
  const Search: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div
        className={`relative rounded-2xl shadow-equal lg:w-full md:basis-4/12 min-w-[110px] ${
          size === "sm" ? "max-w-xs" : size === "md" ? "max-w-md" : "max-w-md"
        }`}
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

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        className="w-full"
        placeholder={placeholder ? placeholder : "Search..."}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
