/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import type { Orders } from "src/types/order";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { useNavigate } from "react-router-dom";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { paths } from "src/paths";
import { Skeleton } from "@mui/material";
import { useAuth } from "src/auth/auth";

import NoDataIcon from "@mui/icons-material/Error";

interface OrdersStoreState {
  orders: Orders[];
}
export const OrderListTable = () => {
  const authToken = localStorage.getItem("token");

  const [loading, setloading] = useState(true);
  //handlepagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [states, setState] = useState<OrdersStoreState>({
    orders: [],
  });
  //search item
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  //handledeliverstate.orders.
  const handleDeliveryItems = async () => {
    try {
      if (!user?.user) {
        return;
      }
      const response = await fetch(
        `http://localhost:4000/api/v1/delivertorider/${user?.user.shops?._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { authorization: `${authToken}` },
        }
      );
      if (response.ok) {
        response.json().then((data: any) => {
          setState({
            orders: data.result,
          });
          setloading(false);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleDeliveryItems();
  }, []);

  //filterdata
  const filterOrders = (term: string) => {
    if (term === "") {
      handleDeliveryItems();
    }
    const filteredOrders = states.orders.filter((order) =>
      order._id.toLowerCase().includes(term.toLowerCase())
    );
    setState({ orders: filteredOrders });
  };

  //router
  const router = useNavigate();

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
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
              filterOrders(e.target.value);
            }}
            name="orderNumber"
            placeholder="Search by order number"
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
      <>
        <Table>
          <TableBody>
            {loading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5}>
                      <Skeleton
                        height={30}
                        variant="text"
                        animation="wave"
                        style={{
                          margin: 5,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {states.orders.length > 0 ? (
                  states.orders
                    // .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => {
                      const orderDate = dayjs(order.orderAt);
                      const month = orderDate.format("MMMM");
                      const date = orderDate.date();

                      const PakistaniRupees = new Intl.NumberFormat("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      });
                      const totalAmount = PakistaniRupees.format(
                        order.totalPrice
                      );

                      return (
                        <TableRow hover key={order._id}>
                          <TableCell
                            sx={{
                              alignstate: "center",
                              display: "flex",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: (theme) =>
                                  theme.palette.mode === "dark"
                                    ? "neutral.800"
                                    : "neutral.200",
                                borderRadius: 2,
                                maxWidth: "fit-content",
                                ml: 3,
                                p: 1,
                              }}
                            >
                              <Typography align="center" variant="subtitle2">
                                {month}
                              </Typography>
                              <Typography align="center" variant="h6">
                                {date}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                variant="subtitle2"
                                onClick={() =>
                                  router(
                                    paths.superadmin.orders.details.replace(
                                      ":orderId",
                                      order._id
                                    )
                                  )
                                }
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                              >
                                Order# {order._id}
                              </Typography>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                Total of {totalAmount}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              size="small"
                              color={"success"}
                              label={
                                order.DeliveredfromShop === 1
                                  ? "Delivered"
                                  : order.orderStatus
                              }
                            />
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
              </>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={states.orders.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </>
    </>
  );
};
