import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  OutlinedInput,
  InputAdornment,
  Chip,
  Skeleton,
  TablePagination,
  Link,
  Tooltip,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import NoDataIcon from "@mui/icons-material/Error";
import SvgIcon from "@mui/material/SvgIcon";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useGetAllTransactionsQuery, useWalletQuery } from "src/redux/reducer";

const formatedBalance = (balance: any) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return formatted;
};

const PaymentWallet: React.FC = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetAllTransactionsQuery("");
  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
    isSuccess: isWalletSuccess,
  } = useWalletQuery("");

  // const [totalTransactions, settotalTransactions] = useState(
  //   (data && data.totalTransactions) || 0
  // );
  // const [totalDepositAmount, settotalDepositAmount] = useState(
  //   (data && data.totaldeposit) || 0
  // );

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

  const TransactionAPI = () => {
    return (
      data &&
      filter
        .fn(isSuccess && data.result)
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setFilter({
      fn: (items) => {
        const filterAdmins = items;
        if (searchTerm.length > 0) {
          return filterAdmins.filter((transaction: any) =>
            transaction?.transactionId
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
        return filterAdmins;
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

  return (
    <>
      <div>
        <Stack alignItems="center" direction="row" gap={3} sx={{ p: 1 }}>
          <Box component="form" sx={{ flexGrow: 1 }}>
            <OutlinedInput
              fullWidth
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              name="orders"
              placeholder="Search by Transaction ID"
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
      </div>
      <div>
        <Grid
          container
          sx={{
            mt: 1,
            mb: 2,
          }}
          spacing={2}
        >
          <Grid item md={4} xs={12}>
            <Box
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "space-around",
                background: "linear-gradient(to right,#4e54c8, #8f94fb)",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 20,
              }}
            >
              {isWalletLoading ? (
                <div
                  style={{
                    height: "110px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    thickness={4}
                    sx={{
                      color: "white",
                      "& .MuiCircularProgress-circle": {
                        stroke: "currentColor",
                      },
                    }}
                    size={60}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Typography variant="h6" color="white">
                      Account Balance
                    </Typography>
                    <Typography variant="h4" sx={{ pt: 1 }} color="white">
                      Rs {formatedBalance(walletData?.data?.balance)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      sx={{ pt: 1, fontWeight: "500" }}
                    >
                      {walletData?.data?.role?.toUpperCase()}
                    </Typography>
                  </div>
                  <div>
                    <LocalOfferIcon style={{ fontSize: 100, color: "white" }} />
                  </div>
                </>
              )}
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box
              sx={{
                borderRadius: 2,
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                background: "linear-gradient(to right,#11998e, #38ef7d)",
                justifyContent: "space-around",
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    height: "110px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    thickness={4}
                    sx={{
                      color: "white",
                      "& .MuiCircularProgress-circle": {
                        stroke: "currentColor",
                      },
                    }}
                    size={60}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Typography variant="h6" color="white">
                      Total Transactions
                    </Typography>
                    <Typography variant="h4" sx={{ pt: 1 }} color="white">
                      {data && data.totalTransactions}
                    </Typography>
                  </div>
                  <div>
                    <PaymentsIcon style={{ fontSize: 100, color: "white" }} />
                  </div>
                </>
              )}
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box
              sx={{
                padding: 2,
                background: "linear-gradient(to right,#0082c8, #667db6)",
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "space-around",
                borderRadius: 2,
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    height: "110px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    thickness={4}
                    sx={{
                      color: "white",
                      "& .MuiCircularProgress-circle": {
                        stroke: "currentColor",
                      },
                    }}
                    size={60}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Typography variant="h6" color="white">
                      Total Deposit Amount
                    </Typography>
                    <Typography variant="h4" sx={{ pt: 1 }} color="white">
                      Rs {formatedBalance(data && data.totaldeposit)}
                    </Typography>
                  </div>
                  <div>
                    <CreditScoreIcon
                      style={{ fontSize: 100, color: "white" }}
                    />
                  </div>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ position: "relative" }}>
          <Scrollbar>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Reciever</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  SkeletonTable()
                ) : isSuccess && TransactionAPI().length > 0 ? (
                  TransactionAPI()?.map((payment: any, index: any) => {
                    const formattedDate = new Date(payment.date).toLocaleString(
                      "en-US",
                      {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    );
                    return (
                      <TableRow hover key={index}>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                          >
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
                                  label={payment?.transactionId}
                                />
                              </Link>
                            </div>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            Rs {formatedBalance(payment?.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {payment?.userEmail}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {formattedDate}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {payment?.status ? (
                            <Tooltip title="Payment Delivered">
                              <Chip
                                size="small"
                                variant="filled"
                                color="success"
                                clickable
                                label="Delivered"
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Payment Delivered">
                              <Chip
                                size="small"
                                variant="filled"
                                color="error"
                                clickable
                                label="Failed"
                              />
                            </Tooltip>
                          )}
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
            count={TransactionAPI()?.length ? TransactionAPI()?.length : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
          />
        </Box>
      </div>
    </>
  );
};

export default PaymentWallet;
