/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Cancel from "@mui/icons-material/CancelRounded";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import {
  Card,
  CardHeader,
  Chip,
  Divider,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import NoDataIcon from "@mui/icons-material/Error";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import type { Theme } from "@mui/material/styles/createTheme";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";
import { GetToken } from "src/types/global";
import {
  API,
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
} from "src/redux/reducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";

export const PaymentList = () => {
  const [open, setOpen] = React.useState(false);
  const [view_id, setview_id] = useState("");
  const handleClickOpen = ({ view_id }: any) => {
    setOpen(true);
    setview_id(view_id);
  };

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  const { isLoading, isSuccess, data, isError } = useGetAllPaymentsQuery("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(API.util.invalidateTags(["Payment"]));
  }, []);
  const [total_price, setTotal_price] = useState<{
    [key: string]: { totalPrice: number; orderItems: any[] };
  }>({});

  useEffect(() => {
    if (data) {
      data
        ?.filter((elem: any) => elem.paymentStatus === false)
        ?.map((value: any, index: any) => {
          const priceArray = value.products.map((product: any) =>
            product.orderItem.reduce(
              (sum: any, item: any) => sum + item.price * item.quantity,
              0
            )
          );

          const orderItems = value.products.map((product: any) =>
            product?.orderItem.reduce((item: any) => item)
          );

          const totalPrice = priceArray.reduce(
            (sum: any, total: any) => sum + total,
            0
          );
          // console.log("check:", totalPrice);
          // console.log("OrderItems:", orderItems);
          setTotal_price((prev: any) => {
            return {
              ...prev,
              [index]: {
                totalPrice: totalPrice,
                orderItems: orderItems,
              },
            };
          });
        });
    }
  }, [data]);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filter, setFilter] = useState<{
    fn: (items: any[]) => any[];
  }>({
    fn: (items) => items,
  });

  const totalsPriceCount =
    data &&
    data
      ?.filter((elem: any) => elem.paymentStatus === false)
      ?.map((order: any) =>
        order.products.map((product: any) =>
          product.orderItem.reduce(
            (sum: any, item: any) => sum + item.price * item.quantity,
            0
          )
        )
      );

  const PaymentsAPI = () => {
    const dataCheck =
      data &&
      data
        .filter((elem: any) => elem.paymentStatus === false)
        .map((item: any) => item);
    return (
      data &&
      filter
        .fn(dataCheck)
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setFilter({
      fn: (items) => {
        const filterpayments = items;
        if (searchTerm.length > 0) {
          return filterpayments.filter((vendor: any) =>
            vendor?.vender_shop_id
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
        return filterpayments;
      },
    });
  }, [searchTerm]);

  const SkeletonTable = () => {
    const row = [];

    for (let index = 0; index < 5; index++) {
      row.push(
        <TableRow key={index}>
          <TableCell>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Skeleton
                width={50}
                height={50}
                animation="wave"
                variant="circular"
              />
              <div>
                <Typography
                  sx={{
                    ml: 2,
                  }}
                  color="text.secondary"
                  variant="body2"
                >
                  <Skeleton width={200} height={15} animation="wave" />
                </Typography>
                <Typography
                  sx={{
                    ml: 2,
                  }}
                  color="text.secondary"
                  variant="body2"
                >
                  <Skeleton width={250} height={15} animation="wave" />
                </Typography>
              </div>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography color="text.secondary" variant="body2">
              <Skeleton width={300} height={20} animation="wave" />
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="text.secondary" variant="body2">
              <Skeleton width={150} height={20} animation="wave" />
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="text.secondary" variant="body2">
              <Skeleton width={100} height={20} animation="wave" />
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return row;
  };

  const router = useNavigate();

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 1 }}
      >
        <Box
          // component="form"
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            fullWidth
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            name="orders"
            placeholder="Search by Shop ID"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
      </Stack>
      <Box sx={{ position: "relative" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell width={"30%"}>Shop ID</TableCell>
                <TableCell>Total Product</TableCell>
                <TableCell>Product Status</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>View orders</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                SkeletonTable()
              ) : isSuccess && PaymentsAPI()?.length > 0 ? (
                PaymentsAPI()?.map((payment: any, index: any) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Avatar
                            sx={{
                              height: 50,
                              width: 50,
                            }}
                          >
                            {getInitials("Vendor")}
                          </Avatar>
                          <div>
                            <Link
                              sx={{
                                ml: 2,
                              }}
                              color="inherit"
                              style={{
                                cursor: "pointer",
                              }}
                              variant="subtitle2"
                            >
                              <Chip
                                size="small"
                                color="default"
                                label={payment?.vender_shop_id}
                              />
                            </Link>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell> {payment?.products?.length}</TableCell>
                      <TableCell>
                        <div>
                          <Chip
                            size="small"
                            color="success"
                            label="Delivered"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment?.products?.length > 1 ? (
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Rs {total_price[index]?.totalPrice?.toFixed(2)}
                          </span>
                        ) : (
                          <>
                            {payment?.products?.map(
                              (item: any, index: number) => {
                                return (
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                    }}
                                    key={index}
                                  >
                                    Rs{" "}
                                    {parseFloat(
                                      item.product_price.toString()
                                    ).toFixed(2)}
                                  </span>
                                );
                              }
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color="info"
                          size="small"
                          onClick={() =>
                            handleClickOpen({
                              view_id: payment._id,
                            })
                          }
                          clickable
                          label="View"
                        />
                        <Dialog
                          maxWidth="sm"
                          open={open}
                          onClose={() => setOpen(!open)}
                          fullWidth
                        >
                          <DialogContent>
                            <Card
                              style={{
                                marginBottom: 5,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <CardHeader title="Order Item Details" />
                                <div
                                  style={{
                                    marginTop: "30px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <Tooltip title="Close">
                                    <SvgIcon
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setOpen(!open);
                                      }}
                                    >
                                      <Cancel />
                                    </SvgIcon>
                                  </Tooltip>
                                </div>
                              </div>

                              {PaymentsAPI()
                                ?.filter((item: any) => {
                                  return item._id === view_id;
                                })
                                ?.map((product: any) => {
                                  return product.products?.map((elem: any) => {
                                    return elem?.orderItem.map(
                                      (order: any, index: number) => {
                                        return (
                                          <div key={index}>
                                            <PropertyList>
                                              <PropertyListItem
                                                align={align}
                                                label="OrderId"
                                              >
                                                <Chip
                                                  size="small"
                                                  color="default"
                                                  variant="filled"
                                                  label={order?._id}
                                                />
                                              </PropertyListItem>
                                              <Divider />
                                              <PropertyListItem
                                                align={align}
                                                label="Product Name"
                                                value={order?.name}
                                              />
                                              <Divider />
                                              <PropertyListItem
                                                align={align}
                                                label="Product Price"
                                                value={order?.price?.toString()}
                                              />
                                              <Divider />
                                              <PropertyListItem
                                                align={align}
                                                label="Quantity"
                                                value={order?.quantity?.toString()}
                                              />
                                            </PropertyList>
                                          </div>
                                        );
                                      }
                                    );
                                  });
                                })}
                            </Card>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Payment Method">
                          <Chip
                            size="small"
                            variant="outlined"
                            color="error"
                            clickable
                            onClick={() => {
                              router("/paymentgateway", {
                                state: {
                                  vendorId: payment?.vender_shop_id,
                                  items: total_price[index]?.orderItems,
                                  totalPrice: total_price[index]?.totalPrice,
                                },
                              });
                            }}
                            label="Pay now"
                          />
                        </Tooltip>
                        {/* <IconButton>
                                <Tooltip title="Pay">
                                  <SvgIcon>
                                    <ArrowRightIcon />
                                  </SvgIcon>
                                </Tooltip>
                              </IconButton> */}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      textAlign: "center",
                      height: 80,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <NoDataIcon color="info" />
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 1,
                        }}
                      >
                        No data available
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      textAlign: "center",
                      height: 80,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <NoDataIcon color="info" />
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 1,
                        }}
                      >
                        404 not found!, unexpected error
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={PaymentsAPI()?.length || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={pages}
        />
      </Box>
    </>
  );
};
