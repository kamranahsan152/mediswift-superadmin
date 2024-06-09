/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { OrderListTable } from "src/sections/dashboard/order/order-pending-table";

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Order List" />
      <Divider />
      <Box sx={{ width: "100%" }}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={4}
          padding={4}
        >
          <>
            <Typography variant="h4">Pending Orders</Typography>
          </>
        </Stack>
        <Divider />
        <OrderListTable />
      </Box>
    </>
  );
};

export default Page;
