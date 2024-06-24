/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { Chip, Box, Skeleton } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { useGetAddressByIdQuery, useGetShopbyIdQuery } from "src/redux/reducer";

export const VendorShopDetail = ({ shopId }: any) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  const { isLoading, data } = useGetShopbyIdQuery({
    id: shopId,
  });

  const { data: userLocation } = useGetAddressByIdQuery({ id: shopId });
  const [address, setAddress] = useState(userLocation || "");

  useEffect(() => {
    setAddress(userLocation || "");
  }, [userLocation]);

  return (
    <>
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
                <PropertyListItem align={align} label="VendorShop Name">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="License Number">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Pharmacy Address">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="CNIC">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <PropertyListItem align={align} label="Shop Details">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
              </PropertyList>
            </Card>

            <Card
              style={{
                width: "50%",
                borderRadius: 0,
              }}
            >
              <CardHeader title="More info" />
              <Divider />
              <PropertyList>
                <PropertyListItem align={align} label="Approved">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Total Medicines">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Orders">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Location">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <PropertyListItem align={align} label="UserID">
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
                label="VendorShop Name"
                value={data.shop?.Pharmacyname}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="License Number"
                value={data.shop?.licences}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Pharmacy Address"
                value={data.shop?.Pharmacyaddress}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="CNIC"
                value={data.shop?.Cnic}
              />
              <Divider />
              <PropertyListItem align={align} label="ShopID">
                <Chip size="small" label={shopId} />
              </PropertyListItem>
              <Divider />
              <PropertyListItem align={align} label="Shop Products">
                {data.shop?.isapproved === "false" && (
                  <Chip
                    clickable
                    size="small"
                    color="primary"
                    label={"Shop has not been approved"}
                  />
                )}
                {data.shop?.isapproved === "approved" && (
                  <Chip
                    component={RouterLink}
                    href={paths.superadmin.vendors.productlist.replace(
                      ":id",
                      shopId
                    )}
                    clickable
                    size="small"
                    color="primary"
                    label={"View Product"}
                  />
                )}
                {data.shop?.isapproved === "Canceled" && (
                  <Chip
                    clickable
                    size="small"
                    color="error"
                    label={"Shop not Registered"}
                  />
                )}
                {data.shop?.isapproved === "blocked" && (
                  <Chip
                    clickable
                    size="small"
                    color="warning"
                    label={"Shop has been blocked"}
                  />
                )}
              </PropertyListItem>
              <Divider />
            </PropertyList>
          </Card>
          <Card
            style={{
              width: "50%",
              borderRadius: 0,
            }}
          >
            <CardHeader title="More info" />
            <Divider />
            <PropertyList>
              <PropertyListItem align={align} label="Approved">
                {data.shop?.isapproved === "false" && (
                  <Chip
                    size="small"
                    color="secondary"
                    label={
                      data.shop?.isapproved.charAt(0).toUpperCase() +
                      data.shop?.isapproved.slice(1)
                    }
                  />
                )}
                {data.shop?.isapproved === "approved" && (
                  <Chip
                    size="small"
                    color="success"
                    label={
                      data.shop?.isapproved.charAt(0).toUpperCase() +
                      data.shop.isapproved.slice(1)
                    }
                  />
                )}
                {data.shop?.isapproved === "Canceled" && (
                  <Chip
                    size="small"
                    color="error"
                    label={
                      data.shop?.isapproved.charAt(0).toUpperCase() +
                      data.shop?.isapproved.slice(1)
                    }
                  />
                )}
                {data.shop?.isapproved === "blocked" && (
                  <Chip
                    size="small"
                    color="warning"
                    label={
                      data.shop?.isapproved.charAt(0).toUpperCase() +
                      data.shop.isapproved.slice(1)
                    }
                  />
                )}
              </PropertyListItem>
              <Divider />
              <PropertyListItem
                align={align}
                label="Total Medicines"
                value={data.shop?.Medicines.length.toString()}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Orders"
                value={data.shop?.Orders.length.toString()}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Location"
                value={address || "Loading..."}
              />
              <Divider />
              <PropertyListItem align={align} label="UserID">
                <Chip size="small" label={data.shop?.user} />
              </PropertyListItem>
              <Divider />
            </PropertyList>
          </Card>
        </Box>
      )}
    </>
  );
};
