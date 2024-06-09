import type { FC } from "react";
import PropTypes from "prop-types";
import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import { alpha } from "@mui/system/colorManipulator";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles/createTheme";

export const AccountGeneralSettings = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";


  return (
    <Stack spacing={4}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Box
                    sx={{
                      borderColor: "neutral.300",
                      borderRadius: "50%",
                      borderStyle: "dashed",
                      borderWidth: 1,
                      p: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: (theme) =>
                            alpha(theme.palette.neutral[700], 0.5),
                          borderRadius: "50%",
                          color: "common.white",
                          cursor: "pointer",
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          left: 0,
                          opacity: 0,
                          position: "absolute",
                          top: 0,
                          width: "100%",
                          zIndex: 1,
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <SvgIcon color="inherit">
                            <Camera01Icon />
                          </SvgIcon>
                          <Typography
                            color="inherit"
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                          >
                            Select
                          </Typography>
                        </Stack>
                      </Box>
                      <Avatar
                        src={""}
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                      >
                        <SvgIcon>
                          <User01Icon />
                        </SvgIcon>
                      </Avatar>
                    </Box>
                  </Box>
                  <Button color="inherit" size="small">
                    Change
                  </Button>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={3}>
                  {/* <PropertyList> */}
                  {/* <PropertyListItem
                      align={align}
                      label="ID"
                      value={userData?.user._id}
                    />
                    <Divider />
                    <PropertyListItem
                      align={align}
                      label="Full Name"
                      value={userData?.user.name}
                    />
                    <Divider />
                    <PropertyListItem
                      align={align}
                      label="Email Address"
                      value={userData?.user.email}
                    />
                    <Divider />
                    <PropertyListItem
                      align={align}
                      label="Phone No"
                      value={userData?.user.phoneNumber}
                    />
                    <Divider />
                  </PropertyList> */}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card></Card>
      <Card>
        <CardContent>
          {/* <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack alignItems="flex-start" spacing={3}>
                <Typography variant="subtitle1">
                  Delete your account and all of your source data. This is
                  irreversible.
                </Typography>
                <Button color="error" variant="outlined">
                  Delete account
                </Button>
              </Stack>
            </Grid>
          </Grid> */}
        </CardContent>
      </Card>
    </Stack>
  );
};
