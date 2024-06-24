import type { FC } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import CreditCard01Icon from "@untitled-ui/icons-react/build/esm/CreditCard01";
import Settings04Icon from "@untitled-ui/icons-react/build/esm/Settings04";
import User03Icon from "@untitled-ui/icons-react/build/esm/User03";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { logoutUser } from "src/redux/authSlice";

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  userInfo: any;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, userInfo, ...other } = props;

  const dispatch = useDispatch<AppDispatch>();

  const handleLogoutAuth = () => {
    onClose?.();
    dispatch(logoutUser());
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">{userInfo?.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {userInfo?.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={RouterLink}
          href={paths.superadmin.account}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <Settings04Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Settings</Typography>}
          />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          href={paths.superadmin.index}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        ></ListItemButton>
      </Box>
      <Divider sx={{ my: "0 !important" }} />
      <Box
        sx={{
          display: "flex",
          p: 1,
          justifyContent: "center",
        }}
      >
        <Button color="inherit" onClick={handleLogoutAuth} size="small">
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
