import type { FC } from "react";
import PropTypes from "prop-types";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import type { SxProps } from "@mui/system/styleFunctionSx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { usePopover } from "src/hooks/use-popover";

import { TenantPopover } from "./tenant-popover";

const tenants: string[] = ["Devias", "Acme Corp"];

interface TenantSwitchProps {
  sx?: SxProps;
}

export const TenantSwitch: FC<TenantSwitchProps> = (props) => {
  const popover = usePopover<HTMLButtonElement>();

  return (
    <>
      <Stack alignItems="center" direction="row" spacing={2} {...props}>
        <div style={{ display: "flex" }}>
          <Typography color="inherit" variant="h6">
            Medi
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
            style={{ color: "#0dabc4" }}
          >
            Swift
          </Typography>
        </div>
      </Stack>
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
};
