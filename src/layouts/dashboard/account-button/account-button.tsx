import type { FC } from "react";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import SvgIcon from "@mui/material/SvgIcon";

import { usePopover } from "src/hooks/use-popover";

import { AccountPopover } from "./account-popover";
import { getInitials } from "src/utils/get-initials";
import { useUserInfoQuery, useVerifyTokenQuery } from "src/redux/reducer";
import { Alert, Typography } from "@mui/material";

export const AccountButton: FC = () => {
  const popover = usePopover<HTMLButtonElement>();

  const { data, isSuccess: isVerifySuccess } = useVerifyTokenQuery("");

  const { data: userInfo, isLoading } = useUserInfoQuery({
    id: isVerifySuccess && data?.decoded?.user?.id,
  });

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

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
          {getInitials(userInfo?.user?.name)}
          {/* <SvgIcon>
            <User01Icon />
          </SvgIcon> */}
        </Avatar>
      </Box>
      <AccountPopover
        userInfo={userInfo}
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
