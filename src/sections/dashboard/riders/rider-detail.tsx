/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
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
import axios from "axios";
import { useGetRiderByIdQuery } from "src/redux/reducer";

export const RiderDetail = ({ RiderId }: any) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  const { data, isLoading } = useGetRiderByIdQuery({ id: RiderId });

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
                rider_id
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
                <PropertyListItem align={align} label="Rider Name">
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
                <PropertyListItem align={align} label="Home address">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Role">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <PropertyListItem align={align} label="Driving Licence">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <PropertyListItem align={align} label="CNIC">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <PropertyListItem align={align} label="Total Orders">
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
                label="Rider Name"
                value={data.data?.name}
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
                value={data.data?.email}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Home address"
                value={data.data?.address}
              />
              <Divider />
              <PropertyListItem align={align} label="Role" value={"RIDER"} />
              <Divider />
              <PropertyListItem
                align={align}
                label="Driving Licence"
                value={data.data?.DrivingLicence}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="CNIC"
                value={data.data?.Cnic}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Total Orders"
                value={data.data?.orders?.length.toString()}
              />
              <Divider />
            </PropertyList>
          </Card>
        </Box>
      )}
    </>
  );
};
