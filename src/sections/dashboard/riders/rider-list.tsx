/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import InfoIcon from "@mui/icons-material/InfoOutlined";
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
import { useRouter } from "src/hooks/use-router";
import {
  useDeleteRiderMutation,
  useGetallRidersQuery,
} from "src/redux/reducer";

export const RiderList = (props: any) => {
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetallRidersQuery("");

  const [deleterider] = useDeleteRiderMutation();

  const [filter, setFilter] = useState<{
    fn: (items: any[]) => any[];
  }>({
    fn: (items) => items,
  });

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

  const RiderAPI = () => {
    return (
      data &&
      filter
        .fn(data?.data)
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  const handleRiderDelete = async ({ id }: any) => {
    try {
      const response = await deleterider({ id: id }).unwrap();
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error(error);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilter({
      fn: (items) => {
        const filter_riders = items;
        if (searchTerm.length > 0) {
          return filter_riders.filter((rider) =>
            rider.name.includes(searchTerm)
          );
        }
        return filter_riders;
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

  const router = useRouter();
  const handleDetail = ({ id }: any) => {
    router.push(paths.superadmin.riders.detail.replace(":id", id));
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
            name="rider"
            placeholder="Search by Rider Name"
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
                <TableCell width={"30%"}>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>CNIC</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                SkeletonTable()
              ) : isSuccess && RiderAPI()?.length > 0 ? (
                RiderAPI()?.map((rider: any, index: any) => {
                  return (
                    <Fragment key={index}>
                      <TableRow hover>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                          >
                            <Avatar
                              sx={{
                                height: 50,
                                width: 50,
                              }}
                            >
                              {getInitials(rider?.name)}
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
                                onClick={() => handleDetail({ id: rider?._id })}
                                variant="subtitle2"
                              >
                                {rider?.name}
                              </Link>
                              <Typography
                                sx={{
                                  ml: 2,
                                }}
                                color="text.secondary"
                                variant="body2"
                              >
                                {rider?.email}
                              </Typography>
                            </div>
                          </Stack>
                        </TableCell>
                        <TableCell>{rider?.phoneNumber}</TableCell>
                        <TableCell>{rider?.Cnic}</TableCell>
                        <TableCell>RIDER</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleRiderDelete({ id: rider._id })}
                          >
                            <Tooltip title="Delete Rider">
                              <SvgIcon>
                                <DeleteIcon />
                              </SvgIcon>
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            onClick={() => handleDetail({ id: rider?._id })}
                          >
                            <Tooltip title="Rider Detail">
                              <SvgIcon>
                                <InfoIcon />
                              </SvgIcon>
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
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
              {isError && data.length === 0 && (
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
                        404 not found!, error occurs
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
          count={RiderAPI()?.length || 0}
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
