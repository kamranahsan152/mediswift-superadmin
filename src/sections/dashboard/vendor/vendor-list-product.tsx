/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent, FC, FormEvent, MouseEvent } from "react";
import { Fragment, useCallback, useEffect, useState } from "react";
import numeral from "numeral";
import PropTypes, { number } from "prop-types";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { Alert, Card, CardMedia, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { Scrollbar } from "src/components/scrollbar";
import type { Medicine } from "src/types/product";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";

import Chip from "@mui/material/Chip";

import Checkbox from "@mui/material/Checkbox";
import { usePopover } from "src/hooks/use-popover";
import NoDataIcon from "@mui/icons-material/Error";
import {
  useDeleteMedicinesMutation,
  useGetAllVendorsProductsQuery,
} from "src/redux/reducer";
interface Option {
  label: string;
  value: number;
}

const stockOptions: Option[] = [
  {
    label: "Available",
    value: 1,
  },
  {
    label: "Out of Stock",
    value: 0,
  },
];
export const VendorShopProducts = ({ shopId }: any) => {
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetAllVendorsProductsQuery({ id: shopId });
  const [deletemedicine] = useDeleteMedicinesMutation();

  const handleProductToggle = useCallback((productId: string): void => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null;
      }

      return productId;
    });
  }, []);

  const handleProductClose = useCallback((): void => {
    setCurrentProduct(null);
  }, []);

  const [reload, setreload] = useState(false);

  //handleDelete
  const handleDelete = async (id: any) => {
    try {
      const response = await deletemedicine({ id }).unwrap();
      toast.success("Medicine Deleted Successfully!", response);
      setCurrentProduct(null);
      refetch();
      setreload(true);
      setTimeout(() => {
        setreload(false);
      }, 1000);
    } catch (error) {
      toast.error("Unable to delete this medicine!");
    }
  };

  const CategoryType = [
    {
      name: "Personal Care",
    },
    {
      name: "Baby Care",
    },
    {
      name: "LifeStyle & Fitness",
    },
    {
      name: "Organic",
    },
    {
      name: "Healthcare Devices",
    },
  ];

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  //filteringdata
  const [filter, setFilter] = useState<{
    fn: (items: Medicine[]) => Medicine[];
  }>({
    fn: (items) => items,
  });

  const handleSearch = (e: any) => {
    const target = e.target.value.toLowerCase();
    setFilter({
      fn(items) {
        if (target === "") return items;
        else
          return items.filter((item) =>
            item.Medicinename.toLowerCase().includes(target)
          );
      },
    });
  };

  //stock category
  const [selectedFilter, setSelectedFilter] = useState<number[]>([]);
  const handleStockChange = (e: any, value: number) => {
    if (selectedFilter.includes(value)) {
      setSelectedFilter(selectedFilter.filter((f) => f !== value));
    } else {
      setSelectedFilter([...selectedFilter, value]);
    }
  };

  //selectedCategory
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleCategoryChange = (e: any, category: string) => {
    const isChecked = e.target.checked;
    setSelectedCategories((prevSelected: string[]) => {
      if (isChecked) {
        return [...prevSelected, category];
      } else {
        return prevSelected.filter((item) => item !== category);
      }
    });
  };

  useEffect(() => {
    let active = true;

    if (active) {
      setFilter({
        fn: (items) => {
          let filteredItems = items;

          if (selectedFilter.length > 0) {
            filteredItems = filteredItems.filter((product) => {
              return selectedFilter.includes(product.stock > 0 ? 1 : 0);
            });
          }

          if (selectedCategories.length > 0) {
            filteredItems = filteredItems.filter((product) =>
              selectedCategories.some((category) =>
                product.category.includes(category)
              )
            );
          }

          return filteredItems;
        },
      });
    }

    return () => {
      active = false;
    };
  }, [selectedFilter, selectedCategories]);

  //mainData for maping
  const productPagination = () => {
    return (
      filter
        .fn(isSuccess && data.result)
        // .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

  //totalCount when user filter data
  const totalCount =
    filter.fn == ((items: any) => items)
      ? isSuccess && data.result.length
      : filter.fn(isSuccess && data.result).length;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const popover = usePopover<HTMLButtonElement>();

  //stock popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Stack
        alignItems="center"
        component="form"
        direction="row"
        spacing={2}
        sx={{ p: 2 }}
      >
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
        <Input
          onChange={(e: any) => handleSearch(e)}
          disableUnderline
          fullWidth
          placeholder="Search by product name"
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        {/* Category Section */}
        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ChevronDownIcon />
            </SvgIcon>
          }
          onClick={handleOpen}
        >
          {"Category"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          PaperProps={{ style: { width: 250 } }}
        >
          {CategoryType.map((option, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(option.name)}
                    onChange={(e: any) => handleCategoryChange(e, option.name)}
                    value={option}
                  />
                }
                label={option.name}
                sx={{
                  flexGrow: 1,
                  mr: 0,
                }}
              />
            </MenuItem>
          ))}
        </Menu>

        {/* Stock category */}

        <Button
          color="inherit"
          endIcon={
            <SvgIcon>
              <ChevronDownIcon />
            </SvgIcon>
          }
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          {"Stock"}
        </Button>
        <Menu
          anchorEl={popover.anchorRef.current}
          onClose={popover.handleClose}
          open={popover.open}
          PaperProps={{ style: { width: 250 } }}
        >
          {stockOptions.map((option, index) => (
            <MenuItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilter.includes(option.value)}
                    onChange={(e: any) => handleStockChange(e, option.value)}
                    value={option.value}
                  />
                }
                label={option.label}
                sx={{
                  flexGrow: 1,
                  mr: 0,
                }}
              />
            </MenuItem>
          ))}
        </Menu>
        {/* Table Section */}
      </Stack>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="35%">Name</TableCell>
              <TableCell width="25%">Stock</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton height={20} variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={20} variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={20} variant="text" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={20} variant="text" animation="wave" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              isSuccess && (
                <>
                  {reload ? (
                    <>
                      {[...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton
                              height={20}
                              variant="text"
                              animation="wave"
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              height={20}
                              variant="text"
                              animation="wave"
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              height={20}
                              variant="text"
                              animation="wave"
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              height={20}
                              variant="text"
                              animation="wave"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : productPagination().length > 0 ? (
                    productPagination().map((product: any) => {
                      const isCurrent = product._id === currentProduct;
                      const price = numeral(product.price).format(
                        `${product.price}0,0.00`
                      );
                      const quantityColor =
                        product.stock >= 10 ? "success" : "error";
                      const hasManyVariants = 1;
                      const url = `http://localhost:4000/uploads/Medicines/${product.Images}`;
                      return (
                        <Fragment key={product._id}>
                          <TableRow hover key={product._id}>
                            <TableCell
                              padding="checkbox"
                              sx={{
                                ...(isCurrent && {
                                  position: "relative",
                                  "&:after": {
                                    position: "absolute",
                                    content: '" "',
                                    top: 0,
                                    left: 0,
                                    backgroundColor: "primary.main",
                                    width: 3,
                                    height: "calc(100% + 1px)",
                                  },
                                }),
                              }}
                              width="25%"
                            >
                              <IconButton
                                onClick={() => handleProductToggle(product._id)}
                              >
                                <SvgIcon>
                                  {isCurrent ? (
                                    <ChevronDownIcon />
                                  ) : (
                                    <ChevronRightIcon />
                                  )}
                                </SvgIcon>
                              </IconButton>
                            </TableCell>
                            <TableCell width="25%">
                              <Box
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    backgroundColor: "neutral.50",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    borderRadius: 1,
                                    display: "flex",
                                    height: 80,
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    width: 80,
                                  }}
                                >
                                  <img
                                    height={100}
                                    width={100}
                                    src={url}
                                    alt={product.Images.contentType}
                                  />
                                </Box>

                                <Box
                                  sx={{
                                    cursor: "pointer",
                                    ml: 2,
                                  }}
                                >
                                  <Typography variant="subtitle2">
                                    {product.Medicinename}
                                  </Typography>
                                  <Typography
                                    color="text.secondary"
                                    variant="body2"
                                  >
                                    in {product.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell width="25%">
                              {product.stock > 0 ? (
                                <>
                                  <LinearProgress
                                    value={product.stock}
                                    variant="determinate"
                                    color={quantityColor}
                                    sx={{
                                      height: 8,
                                      width: 36,
                                    }}
                                  />
                                  <Typography
                                    color="text.secondary"
                                    variant="body2"
                                  >
                                    {product.stock} in stock
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Chip
                                    label="Out of Stock"
                                    color={"error"}
                                    size="small"
                                  />
                                </>
                              )}
                            </TableCell>
                            <TableCell>{price}</TableCell>
                          </TableRow>
                          {isCurrent && (
                            <TableRow>
                              <TableCell
                                colSpan={7}
                                sx={{
                                  p: 0,
                                  position: "relative",
                                  "&:after": {
                                    position: "absolute",
                                    content: '" "',
                                    top: 0,
                                    left: 0,
                                    backgroundColor: "primary.main",
                                    width: 3,
                                    height: "calc(100% + 1px)",
                                  },
                                }}
                              >
                                {/* Update portion */}
                                <CardContent>
                                  <Typography variant="h6">
                                    <Alert variant="standard" color="info">
                                      You can delete the medicine
                                    </Alert>
                                  </Typography>
                                </CardContent>
                                <Divider />
                                <Stack
                                  alignItems="center"
                                  direction="row"
                                  justifyContent="space-between"
                                  sx={{ p: 2 }}
                                >
                                  <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                  >
                                    <Button
                                      color="inherit"
                                      onClick={handleProductClose}
                                    >
                                      Cancel
                                    </Button>
                                  </Stack>
                                  <div>
                                    <Button
                                      onClick={() => handleDelete(product._id)}
                                      color="error"
                                    >
                                      Delete product
                                    </Button>
                                  </div>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )}
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
                </>
              )
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
                      404 not found, network issue or got error
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
        count={totalCount ? totalCount : 0}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
