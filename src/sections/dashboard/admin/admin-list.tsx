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
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { getInitials } from "src/utils/get-initials";
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
import { useDeleteuserMutation, useGetAlladminQuery } from "src/redux/reducer";
import { User } from "src/types/user";

export const AdminList = (props: any) => {
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetAlladminQuery("");
  const [deleteadmin] = useDeleteuserMutation();

  const [filter, setFilter] = useState<{
    fn: (items: User[]) => User[];
  }>({
    fn: (items) => items,
  });

  const AdminDataApi = () => {
    return filter
      .fn(isSuccess && data.user)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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

  const handleAdminDelete = async ({ id }: any) => {
    try {
      await deleteadmin({ id }).unwrap();
      toast.success("Admin Deleted Successfully!");
      refetch();
    } catch (error) {
      toast.error("Unable to delete the admin!");
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilter({
      fn: (items) => {
        const filterAdmins = items;
        if (searchTerm.length > 0) {
          return filterAdmins.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const router = useRouter();
  const handleDetail = ({ id }: any) => {
    router.push(paths.superadmin.admins.details.replace(":id", id));
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
            placeholder="Search by Admin Name"
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
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {isLoading ? (
                  SkeletonTable()
                ) : isSuccess && AdminDataApi()?.length > 0 ? (
                  AdminDataApi()?.map((admin: any, index: any) => {
                    return (
                      <TableRow hover key={index}>
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
                              {getInitials(admin?.name)}
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
                                onClick={() => handleDetail({ id: admin?._id })}
                                variant="subtitle2"
                              >
                                {admin?.name}
                              </Link>
                              <Typography
                                sx={{
                                  ml: 2,
                                }}
                                color="text.secondary"
                                variant="body2"
                              >
                                {admin?.email}
                              </Typography>
                            </div>
                          </Stack>
                        </TableCell>
                        <TableCell>{admin?.phoneNumber}</TableCell>
                        <TableCell>{admin?.role.toUpperCase()}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => handleAdminDelete({ id: admin._id })}
                          >
                            <Tooltip title="Delete Admin">
                              <SvgIcon>
                                <DeleteIcon />
                              </SvgIcon>
                            </Tooltip>
                          </IconButton>
                          <IconButton onClick={() => handleDetail(admin?._id)}>
                            <Tooltip title="Admin Detail">
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
              </>
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
          count={AdminDataApi.length}
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
