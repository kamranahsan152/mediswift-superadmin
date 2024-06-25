import type { FC } from "react";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import SvgIcon from "@mui/material/SvgIcon";

import { usePopover } from "src/hooks/use-popover";

import { AccountPopover } from "./account-popover";
import { getInitials } from "src/utils/get-initials";
// import { useUserInfoQuery, useVerifyTokenQuery } from "src/redux/reducer";
// import { Alert, Typography } from "@mui/material";
import { useUserData } from "src/types/global";

export const AccountButton: FC = () => {
  const popover = usePopover<HTMLButtonElement>();
  const user = useUserData();
  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
        >
          {getInitials(user?.name)}
          {/* <SvgIcon>
            <User01Icon />
          </SvgIcon> */}
        </Avatar>
      </Box>
      <AccountPopover
        userInfo={user}
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
