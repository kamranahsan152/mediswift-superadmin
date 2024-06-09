/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { getInitials } from "src/utils/get-initials";
import axios from "axios";
import toast from "react-hot-toast";
import {
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Tooltip,
} from "@mui/material";
import NoDataIcon from "@mui/icons-material/Error";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useNavigate } from "react-router";
import {
  useDeleteuserMutation,
  useGetAllCustomersQuery,
} from "src/redux/reducer";

export const CustomerListTable = (props: any) => {
  const [Address, setAddress] = useState<{
    [key: number]: { address: string };
  }>({});
  const { data, isLoading, refetch, isSuccess, isError } =
    useGetAllCustomersQuery("");

  const [deleteuser] = useDeleteuserMutation();

  const FetchAddress = async (id: any, index: any) => {
    const userIndex = CustomerAPI()?.findIndex((item: any) => item._id === id);

    if (userIndex === index) {
      try {
        const url = `https://thingproxy.freeboard.io/fetch/https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          CustomerAPI()[index].location.Latitude
        }&lon=${
          CustomerAPI()[index].location.Longitude
        }&zoom=18&addressdetails=1`;
        const response = await fetch(url, {
          headers: {
            "Accept-Language": "en-US,en;q=0.9",
          },
        });
        const data = await response.json();

        if (response.ok && data.display_name) {
          setAddress((prev) => {
            return {
              ...prev,
              [index]: {
                address: data.display_name,
              },
            };
          });
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }

    return userIndex;
  };

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

  const handleCustomerDelete = async ({ id }: any) => {
    try {
      await deleteuser({ id }).unwrap();
      refetch();
      toast.success("Customer Deleted Successfully!");
    } catch (error) {
      toast.error("Unable to delete the customer!");
    }
  };

  //searching
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setFilter({
      fn: (items) => {
        const filterAdmins = items;
        if (searchTerm.length > 0) {
          return filterAdmins.filter((item) =>
            item.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleDetail = ({ id, location }: any) => {
    router(paths.superadmin.customers.details.replace(":id", id), {
      state: { location },
    });
  };
  const [filter, setFilter] = useState<{
    fn: (items: any[]) => any[];
  }>({
    fn: (items) => items,
  });

  const CustomerAPI = () => {
    return (
      data &&
      filter
        .fn(isSuccess && data.user)
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

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
            name="orderNumber"
            placeholder="Search by Customer Name"
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
                <TableCell width={"30%"}>Phone Number</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                SkeletonTable()
              ) : isSuccess && CustomerAPI().length > 0 ? (
                CustomerAPI()?.map((customer: any, index: any) => {
                  FetchAddress(customer._id, index);
                  return (
                    <TableRow hover key={customer._id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Avatar
                            sx={{
                              height: 50,
                              width: 50,
                            }}
                          >
                            {getInitials(customer?.phoneNumber)}
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
                              onClick={() =>
                                handleDetail({
                                  id: customer?._id,
                                  location: Address[index]?.address,
                                })
                              }
                              variant="subtitle2"
                            >
                              {customer?.phoneNumber}
                            </Link>
                            <Typography
                              sx={{
                                ml: 2,
                              }}
                              color="text.secondary"
                              variant="body2"
                            >
                              {customer?.email}
                            </Typography>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {/* {customer?.locationName || "Loading..."} */}
                        {Address[index]?.address || "Loading..."}
                      </TableCell>
                      <TableCell>{customer?.role.toUpperCase()}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleCustomerDelete({ id: customer._id })
                          }
                        >
                          <Tooltip title="Delete Customer">
                            <SvgIcon>
                              <DeleteIcon />
                            </SvgIcon>
                          </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleDetail(customer?._id)}>
                          <Tooltip title="Customer Detail">
                            <SvgIcon>
                              <ArrowRightIcon />
                            </SvgIcon>
                          </Tooltip>
                        </IconButton>
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
                        404 not found!
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
          count={CustomerAPI()?.length ? CustomerAPI()?.length : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={pages}
          // rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </>
  );
};
