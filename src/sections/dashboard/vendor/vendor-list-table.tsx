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
import Setting from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLessOutlined";
import ExpandMore from "@mui/icons-material/ExpandMoreOutlined";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { getInitials } from "src/utils/get-initials";
import toast from "react-hot-toast";
import {
  Alert,
  Chip,
  Collapse,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Skeleton,
  Tooltip,
} from "@mui/material";
import NoDataIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";
import Block from "@mui/icons-material/BlockRounded";
import Done from "@mui/icons-material/CheckCircleRounded";
import Cancel from "@mui/icons-material/CancelRounded";
import False from "@mui/icons-material/RemoveCircle";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { useRouter } from "src/hooks/use-router";
import {
  useApproveShopMutation,
  useDeleteuserMutation,
  useGetAllVendorsQuery,
  useLazyGetShopbyIdQuery,
} from "src/redux/reducer";
import { useNavigate } from "react-router";

export const VendorListTable = () => {
  const ApprovalType = [
    {
      icon: <Done />,
      name: "approved",
    },
    {
      icon: <Block />,
      name: "blocked",
    },
    {
      icon: <Cancel />,
      name: "Canceled",
    },
  ];

  const [trigger] = useLazyGetShopbyIdQuery();
  const [approveShop] = useApproveShopMutation();

  const [shop_data, setShopData] = useState<{
    [key: number]: {
      approvalStatus: string;
      icon: any;
    };
  }>({});

  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: { icon: React.ReactNode; name: string };
  }>({});

  const { isLoading, refetch, isSuccess, isError, data } =
    useGetAllVendorsQuery("");

  const [deletevendor] = useDeleteuserMutation();

  const [filter, setFilter] = useState<{
    fn: (items: any[]) => any[];
  }>({
    fn: (items) => items,
  });

  const VendorAPI = () => {
    return (
      data &&
      filter
        .fn(data.vendor)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };
  useEffect(() => {
    if (!data) {
      return;
    }

    const fetchData = async () => {
      try {
        const updatedShopData = await Promise.all(
          data?.vendor?.map(async (vendor: any, index: any) => {
            if (vendor?.shops?.length > 0) {
              const id = vendor.shops[0];
              const { data } = await trigger({ id });

              let icon = <Done />;

              if (data?.shop?.isapproved === "blocked") {
                icon = <Block />;
              } else if (data?.shop?.isapproved === "Canceled") {
                icon = <Cancel />;
              } else if (data?.shop?.isapproved === "false") {
                icon = <False />;
              }

              return {
                index,
                approvalStatus: data?.shop?.isapproved,
                icon: icon,
              };
            }
            return null;
          })
        );

        const validShopData = updatedShopData.filter((item) => item !== null);

        const shopDataObject = validShopData.reduce((acc, item) => {
          acc[item.index] = {
            approvalStatus: item.approvalStatus,
            icon: item.icon,
          };
          return acc;
        }, {});

        setShopData(shopDataObject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data, trigger]);

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

  //
  const handlevendorDelete = async ({ id }: any) => {
    try {
      await deletevendor({ id }).unwrap();
      toast.success("Vendor Deleted Successfully!");
      refetch();
    } catch (error) {
      toast.error("Unable to delete the customer!");
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let active = true;
    if (active) {
      setFilter({
        fn: (items) => {
          const filteredItems = items;
          if (searchTerm.length > 0) {
            return filteredItems.filter(
              (item: any) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          return filteredItems;
        },
      });
    }
    return () => {
      active = false;
    };
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
  const handleDetail = ({ id }: any) => {
    router(paths.superadmin.vendors.shops.replace(":id", id));
  };

  const [settingOpen, setSettingOpen] = useState<string | null>(null);
  const handleToggleSetting = async (id: string) => {
    setSettingOpen((prevId) => (prevId === id ? null : id));
  };

  const handleClick = async ({ id }: any, type: any) => {
    setSelectedValues((prevSelectedValues) => {
      const newValue = {
        icon: type.icon,
        name: type.name,
      };
      if (newValue.name === "approved") {
        try {
          const body = {
            approval: newValue.name,
          };
          approveShop({ id, body })
            .unwrap()
            .then((response) => {
              toast.success(response.message);
            });
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
      if (newValue.name === "Canceled") {
        try {
          const body = {
            approval: newValue.name,
          };
          approveShop({ id, body })
            .unwrap()
            .then((response) => {
              toast.error(response.message);
            });
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
      if (newValue.name === "blocked") {
        try {
          const body = {
            approval: newValue.name,
          };
          approveShop({ id, body })
            .unwrap()
            .then((response) => {
              toast.error(response.message);
            });
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
      return {
        ...prevSelectedValues,
        [id]: newValue,
      };
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
            name="vendor"
            placeholder="Search by Vendor Name"
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
                <TableCell>Shop Approval</TableCell>
                <TableCell align="right" width={"10%"}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                SkeletonTable()
              ) : isSuccess && VendorAPI()?.length > 0 ? (
                VendorAPI()?.map((vendor: any, index: any) => {
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
                            {getInitials(vendor?.name)}
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
                                router(
                                  paths.superadmin.vendors.details.replace(
                                    ":id",
                                    vendor._id
                                  )
                                )
                              }
                              variant="subtitle2"
                            >
                              {vendor?.name}
                            </Link>
                            <Typography
                              sx={{
                                ml: 2,
                              }}
                              color="text.secondary"
                              variant="body2"
                            >
                              {vendor?.email}
                            </Typography>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell>{vendor.phoneNumber}</TableCell>
                      <TableCell>{vendor?.role.toUpperCase()}</TableCell>
                      <TableCell width={"12%"}>
                        <Stack
                          alignItems="center"
                          direction="row"
                          flexWrap="wrap"
                          sx={{ p: 1 }}
                        >
                          {vendor?.shops?.length === 0 ? null : (
                            <Box>
                              <ListItemButton
                                disabled={
                                  settingOpen !== null &&
                                  settingOpen !== vendor?.shops[0]
                                }
                                onClick={() =>
                                  handleToggleSetting(vendor?.shops[0])
                                }
                                sx={{
                                  "&: hover": {
                                    backgroundColor: "#f5f5f5",
                                  },
                                  paddingX: "2px",
                                  paddingY: "2px",
                                  paddingLeft: 1,
                                  paddingRight: 1,
                                  borderWidth: 1,
                                  borderColor: "#E5E7EB",
                                  borderStyle: "solid",
                                  borderRadius: 20,
                                }}
                              >
                                <ListItemIcon>
                                  {selectedValues[vendor?.shops[0]]?.icon ||
                                    shop_data[index]?.icon || <Setting />}
                                </ListItemIcon>
                                <ListItemText
                                  disableTypography
                                  primary={
                                    <>
                                      <Typography
                                        variant="body2"
                                        fontWeight={"500"}
                                        marginRight={2}
                                        color={"black"}
                                      >
                                        {(
                                          selectedValues[vendor?.shops[0]]
                                            ?.name ||
                                          shop_data[index]?.approvalStatus ||
                                          "loading"
                                        )
                                          .charAt(0)
                                          .toUpperCase() +
                                          (
                                            selectedValues[vendor?.shops[0]]
                                              ?.name ||
                                            shop_data[index]?.approvalStatus ||
                                            "loading"
                                          ).slice(1)}
                                      </Typography>
                                    </>
                                  }
                                ></ListItemText>
                                {settingOpen === vendor?.shops[0] ? (
                                  <ExpandLess color="action" />
                                ) : (
                                  <ExpandMore color="action" />
                                )}
                              </ListItemButton>
                              <Collapse
                                in={settingOpen === vendor?.shops[0]}
                                timeout={"auto"}
                              >
                                <List
                                  style={{
                                    boxShadow:
                                      "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    borderRadius: 12,
                                    backgroundColor: "#ffffff",
                                    padding: "1px",
                                    zIndex: 1,
                                    width: 150,
                                  }}
                                >
                                  {ApprovalType.map((type, index) => (
                                    <ListItemButton
                                      onClick={async () => {
                                        handleClick(
                                          { id: vendor?.shops[0] },
                                          type
                                        );

                                        setSettingOpen(null);
                                      }}
                                      key={index}
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "#f5f5f5",
                                        },
                                        paddingX: "5px",
                                        paddingY: "5px",
                                        paddingLeft: 1.5,
                                        paddingRight: 1,
                                      }}
                                    >
                                      <ListItemIcon>{type.icon} </ListItemIcon>
                                      <ListItemText
                                        disableTypography
                                        primary={
                                          <Typography
                                            variant="body2"
                                            color="black"
                                          >
                                            {type.name.charAt(0).toUpperCase() +
                                              type.name.slice(1)}{" "}
                                          </Typography>
                                        }
                                      />
                                    </ListItemButton>
                                  ))}
                                </List>
                              </Collapse>
                            </Box>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                        }}
                      >
                        {vendor?.shops?.length === 0 ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              size="small"
                              color="warning"
                              label={"Shop not registered!"}
                              icon={
                                <img
                                  style={{
                                    width: 14,
                                    height: 14,
                                    filter: "brightness(0) invert(1)",
                                  }}
                                  src={
                                    "../../../public/assets/delete-button.png"
                                  }
                                  alt="message"
                                />
                              }
                            />
                            <IconButton
                              onClick={() =>
                                handlevendorDelete({
                                  id: vendor._id,
                                })
                              }
                            >
                              <Tooltip title="Delete Vendor">
                                <SvgIcon>
                                  <DeleteIcon />
                                </SvgIcon>
                              </Tooltip>
                            </IconButton>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {/* <div
                              onClick={() =>
                                handleDetail({
                                  id: vendor.shops[0],
                                })
                              }
                            >
                              <Chip
                                clickable
                                size="small"
                                sx={{
                                  mr: 1,
                                }}
                                label="Shop Details"
                                color="primary"
                              />
                            </div> */}
                            <IconButton
                              onClick={() =>
                                handlevendorDelete({
                                  id: vendor._id,
                                })
                              }
                            >
                              <Tooltip title="Delete Vendor">
                                <SvgIcon>
                                  <DeleteIcon />
                                </SvgIcon>
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleDetail({
                                  id: vendor.shops[0],
                                })
                              }
                            >
                              <Tooltip title="Vendor Detail">
                                <SvgIcon>
                                  <ArrowRightIcon />
                                </SvgIcon>
                              </Tooltip>
                            </IconButton>
                          </Box>
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
                        404 not found, unexpected error!
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
          count={VendorAPI()?.length ? VendorAPI()?.length : 0}
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
