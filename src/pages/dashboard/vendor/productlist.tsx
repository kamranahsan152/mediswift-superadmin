import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { useParams } from "react-router";
import { VendorShopProducts } from "src/sections/dashboard/vendor/vendor-list-product";

const Page = () => {
  const { id } = useParams();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Product List" />
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
                <Typography variant="h4">Products</Typography>
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
                    href={paths.superadmin.vendors.index}
                    variant="subtitle2"
                  >
                    Vendor
                  </Link>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.superadmin.vendors.shops.replace(
                      ":id",
                      id || ""
                    )}
                    variant="subtitle2"
                  >
                    Shop Detail
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    Product List
                  </Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Card>
              <VendorShopProducts shopId={id} />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
