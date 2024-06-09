/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type MouseEvent,
} from "react";
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
  Chip,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Tooltip,
} from "@mui/material";
import NoDataIcon from "@mui/icons-material/Error";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useRouter } from "src/hooks/use-router";
import { useDeleteShopsMutation, useGetAllShopsQuery } from "src/redux/reducer";
import { useNavigate } from "react-router";

export const ShopListTable = (props: any) => {
  const { isLoading, isSuccess, isError, data, refetch } =
    useGetAllShopsQuery("");

  const [deleteshop] = useDeleteShopsMutation();

  const [filter, setFilter] = useState<{
    fn: (items: any[]) => any[];
  }>({
    fn: (items) => items,
  });

  const ShopAPI = () => {
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
          return filterAdmins.filter((item) =>
            item.Pharmacyname?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return filterAdmins;
      },
    });
  }, [searchTerm]);

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
  const [Address, setAddress] = useState<{
    [key: number]: { address: string };
  }>({});

  const FetchAddress = async (id: any, index: any) => {
    const userIndex = ShopAPI()?.findIndex((item: any) => item._id === id);

    if (userIndex === index) {
      try {
        const url = `https://thingproxy.freeboard.io/fetch/https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          ShopAPI()[index]?.location?.Latitude
        }&lon=${
          ShopAPI()[index]?.location?.Longitude
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
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }

    return userIndex;
  };

  //
  const handleDeleteShop = async ({ id }: any) => {
    try {
      const response = await deleteshop({ id }).unwrap();
      refetch();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

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

  const router = useNavigate();
  const handleDetail = ({ id, location }: any) => {
    router(paths.superadmin.shops.detail.replace(":id", id), {
      state: { location },
    });
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
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
            }}
            name="shopname"
            placeholder="Search by Shop Name"
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
                <TableCell>Shop Name</TableCell>
                <TableCell>Cnic</TableCell>
                <TableCell>Approval</TableCell>
                <TableCell width={"20%"}>Location</TableCell>
                <TableCell
                  width={"16%"}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Total Medicines
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                SkeletonTable()
              ) : isSuccess && ShopAPI().length > 0 ? (
                ShopAPI().map((shop: any, index: any) => {
                  FetchAddress(shop._id, index);
                  return (
                    <TableRow hover key={shop._id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Avatar
                            sx={{
                              height: 50,
                              width: 50,
                            }}
                          >
                            {getInitials(shop?.Pharmacyname)}
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
                                  id: shop?._id,
                                  location: Address[index]?.address,
                                })
                              }
                              variant="subtitle2"
                            >
                              {shop?.Pharmacyname}
                            </Link>
                            <Typography
                              sx={{
                                ml: 2,
                              }}
                              color="text.secondary"
                              variant="body2"
                            >
                              {shop?.Pharmacyaddress}
                            </Typography>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell>{shop?.Cnic}</TableCell>
                      <TableCell>
                        {" "}
                        {shop?.isapproved === "false" && (
                          <Chip
                            size="small"
                            color="secondary"
                            label={
                              shop?.isapproved.charAt(0).toUpperCase() +
                              shop?.isapproved.slice(1)
                            }
                          />
                        )}
                        {shop?.isapproved === "approved" && (
                          <Chip
                            size="small"
                            color="success"
                            label={
                              shop?.isapproved.charAt(0).toUpperCase() +
                              shop?.isapproved.slice(1)
                            }
                          />
                        )}
                        {shop?.isapproved === "Canceled" && (
                          <Chip
                            size="small"
                            color="error"
                            label={
                              shop?.isapproved.charAt(0).toUpperCase() +
                              shop?.isapproved.slice(1)
                            }
                          />
                        )}
                        {shop?.isapproved === "Blocked" && (
                          <Chip
                            size="small"
                            color="warning"
                            label={
                              shop?.isapproved.charAt(0).toUpperCase() +
                              shop?.isapproved.slice(1)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {Address[index]?.address || "Loading..."}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {shop?.Medicines?.length}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDeleteShop({ id: shop._id })}
                        >
                          <Tooltip title="Delete Shop">
                            <SvgIcon>
                              <DeleteIcon />
                            </SvgIcon>
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDetail({ id: shop?._id })}
                        >
                          <Tooltip title="Shop Detail">
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
                        No Data Available
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
          count={isSuccess && data ? ShopAPI().length : 0}
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
