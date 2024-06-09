import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { PaymentList } from "src/sections/dashboard/payments/payment-list";

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: All Payments" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Payments</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.superadmin.index}
                    variant="subtitle2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.superadmin.payments.list}
                    variant="subtitle2"
                  >
                    Payment
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    List
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <PaymentList />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
