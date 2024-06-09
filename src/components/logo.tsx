import type { FC } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../../public/mediswift.png";
import { width } from "@mui/system";

export const Logo: FC = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return <img src={logo} alt="" style={{ width: "70px", height: "50px" }} />;
};
