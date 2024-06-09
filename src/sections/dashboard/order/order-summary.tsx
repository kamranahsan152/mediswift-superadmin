/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent, FC } from "react";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { Chip, Box, Skeleton } from "@mui/material";
import type { Orders, OrdersDetail } from "src/types/order";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import SvgIcon from "@mui/material/SvgIcon";
import CalendarIcon from "@untitled-ui/icons-react/build/esm/Calendar";
import moment from "moment";
interface OrderDetail {
  order: OrdersDetail;
}

export const OrderSummary = ({ orderId }: any) => {
  const authToken = localStorage.getItem("token");

  // console.log(orderId);
  const [loading, setloading] = useState(true);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  const [state, setstate] = useState<OrderDetail | null>(null);
  const handleDetails = async () => {
    const response = await fetch(
      `http://localhost:4000/api/v1/singleorder/${orderId}`,
      {
        method: "GET",
        credentials: "include",
        headers: { authorization: `${authToken}` },
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      setstate({
        order: data,
      });
      setloading(false);
    }
  };

  useEffect(() => {
    handleDetails();
  }, []);

  //date

  console.log(state?.order.orderAt);

  const orderAt_ = moment(state?.order.orderAt);
  const createAt_ = moment(state?.order.crearedAt);
  const orderAt = orderAt_.format("DD-MM-YYYY hh:mm A");
  const createAt = createAt_.format("DD-MM-YYYY hh:mm A");

  //price
  const PakistaniRupees = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  });
  const totalAmount = state?.order?.totalPrice
    ? PakistaniRupees.format(state.order.totalPrice)
    : "N/A";

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
            {loading ? (
              <Skeleton variant="text" width={"60%"} />
            ) : (
              state?.order._id
            )}
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            bgcolor={"#f5f5f5"}
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
                variant="body2"
                fontWeight={"500"}
              >
                Placed on
              </Typography>
            </Box>
            <SvgIcon color="action">
              <CalendarIcon />
            </SvgIcon>
            <Box width={"100%"}>
              {loading ? <Skeleton variant="text" width={"80%"} /> : orderAt}
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {loading ? (
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
                <PropertyListItem align={align} label="UserID">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="ID">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Created At">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Total Amount">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Shipping Info">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Payment Info">
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
              <Divider />
              <PropertyList>
                <PropertyListItem
                  style={{
                    marginTop: "4.25rem",
                  }}
                  align={align}
                  label="Delivered From Shop"
                >
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Order Status">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Total Order-Items">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
                <PropertyListItem align={align} label="Cash On Delivery">
                  <Skeleton variant="text" width={"80%"} />
                </PropertyListItem>
                <Divider />
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
              <PropertyListItem align={align} label="UserID">
                <Chip
                  size="small"
                  color="default"
                  variant="filled"
                  label={state?.order._id}
                />
              </PropertyListItem>
              <Divider />
              <PropertyListItem
                align={align}
                label="ID"
                value={state?.order._id}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Created At"
                value={createAt}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Total Amount"
                value={totalAmount}
              />
              <Divider />
              <PropertyListItem align={align} label="Shipping Info">
                <Box
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  width={"65%"}
                  marginLeft={"-10px"}
                >
                  <Typography variant="subtitle2">Phone#</Typography>
                  <Chip
                    size="small"
                    color="primary"
                    variant="outlined"
                    label={state?.order.shippingInfo.phoneNo}
                  />
                </Box>
              </PropertyListItem>
              <Divider />
              <PropertyListItem
                align={align}
                label="Payment Info"
                value={state?.order.paymentInfo.status}
              ></PropertyListItem>
            </PropertyList>
          </Card>
          <Card
            style={{
              width: "50%",
              borderRadius: 0,
            }}
          >
            <Divider />
            <PropertyList>
              <PropertyListItem
                style={{
                  marginTop: "4.25rem",
                }}
                align={align}
                label="Delivered From Shop"
              >
                {state?.order.DeliveredfromShop === 0 ? (
                  <>
                    <Chip
                      size="small"
                      color="warning"
                      label={"Pending"}
                      variant="filled"
                    />
                  </>
                ) : (
                  <>
                    <Chip
                      size="small"
                      color="success"
                      label={"Delivered"}
                      variant="filled"
                    />
                  </>
                )}
              </PropertyListItem>
              <Divider />
              <PropertyListItem align={align} label="Order Status">
                <Typography variant="subtitle2" color={"primary"}>
                  {state?.order.orderStatus.toLocaleUpperCase()}
                </Typography>
              </PropertyListItem>
              <Divider />
              <PropertyListItem
                align={align}
                label="Total Order-Items"
                value={state?.order.orderItems.length.toString()}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Cash On Delivery"
                value={
                  state?.order.paymentInfo.CashonDelivery === 0 ? "NO" : "YES"
                }
              ></PropertyListItem>
              <Divider />
            </PropertyList>
          </Card>
        </Box>
      )}
    </>
  );
};
