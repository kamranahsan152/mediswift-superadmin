/* eslint-disable react-hooks/exhaustive-deps */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { Chip, Box, Skeleton } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import SvgIcon from "@mui/material/SvgIcon";
import UserIcon from "@untitled-ui/icons-react/build/esm/UserCheck01";
import { useGetUserByIdQuery } from "src/redux/reducer";
import { useLocation } from "react-router";

export const CustomerDetail = ({ customerId }: any) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  const { data, isLoading } = useGetUserByIdQuery({ id: customerId });

  const location = useLocation();
  const address = location.state.location;

  return (
    <>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack spacing={1}>
          <Typography variant="h6">
            {isLoading ? (
              <Skeleton variant="text" width={"60%"} />
            ) : (
              data.data?._id
            )}
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            width={350}
            padding={0.5}
            borderRadius={2}
          >
            <Box
              width={180}
              borderRight={"1px solid #ccc"}
              textAlign={"center"}
            >
              <Typography
                color="text.secondary"
                variant="body1"
                fontWeight={"500"}
              >
                user_id
              </Typography>
            </Box>
            <SvgIcon color="action">
              <UserIcon />
            </SvgIcon>
            <Box width={"100%"}>
              {isLoading ? (
                <Skeleton variant="text" width={"80%"} />
              ) : (
                <Chip size="small" color="primary" label={data.data?._id} />
              )}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {isLoading ? (
        <>
          <Box display={"flex"}>
            <Card
              style={{
                width: "50%",
                borderRadius: 0,
              }}
            >
              <CardHeader title="Basic info" />
              <Divider />
              <PropertyList>
                <PropertyListItem align={align} label="Customer Name">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Phone Number#">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Email address">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Role">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
              </PropertyList>
            </Card>
          </Box>
        </>
      ) : (
        <Box display={"flex"}>
          <Card
            style={{
              width: "50%",
              borderRadius: 0,
            }}
          >
            <CardHeader title="Basic info" />
            <Divider />
            <PropertyList>
              <PropertyListItem
                align={align}
                label="Customer Name"
                value={data.data?.name ? data.data?.name : "NaN"}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Phone Number#"
                value={data.data?.phoneNumber}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Email address"
                value={data.data?.email ? data.data?.email : "NaN"}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Role"
                value={data.data?.role.toUpperCase()}
              />
              <Divider />
              <PropertyListItem align={align} label="Address" value={address} />
              <Divider />
            </PropertyList>
          </Card>
        </Box>
      )}
    </>
  );
};
