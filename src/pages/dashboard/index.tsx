import { addDays, subDays, subHours, subMinutes } from "date-fns";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { useSettings } from "src/hooks/use-settings";
import { useGetCountsQuery, useGetStatsQuery } from "src/redux/reducer";
import { Card, CardActions, CircularProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { OverViewChartPage } from "src/sections/dashboard/overview/overview-chart";
import { OverviewPage } from "src/sections/dashboard/overview/overview-page";

const now = new Date();

// eslint-disable-next-line react-hooks/rules-of-hooks

const Page = () => {
  const settings = useSettings();

  const { isLoading, data: counts } = useGetCountsQuery("");
  console.log(counts);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  usePageView();

  const Loading = ({ title, svgName }: any) => {
    return (
      <>
        <Card>
          <Stack
            alignItems="center"
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            sx={{
              px: 4,
              py: 3,
            }}
          >
            <div>
              <img src={`/assets/iconly/${svgName}.svg`} width={48} />
            </div>
            <Box sx={{ flexGrow: 1 }}>
              <Typography color="text.secondary" variant="body2">
                Total {title}
              </Typography>
              <Typography color="text.primary" variant="h4">
                <CircularProgress size={28} color="secondary" />
              </Typography>
            </Box>
          </Stack>
          <Divider />
        </Card>
      </>
    );
  };

  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
              </Stack>
            </Grid>
            {/* <Grid xs={12} md={3}>
              {isLoading || loading ? (
                <Loading title="admins" />
              ) : (
                counts && (
                  <OverviewPage title="admins" count={counts?.adminCount} />
                )
              )}
            </Grid> */}
            <Grid xs={12} md={3}>
              {isLoading || loading ? (
                <Loading title="vendors" svgName="profile" />
              ) : (
                counts && (
                  <OverviewPage
                    title="vendors"
                    count={counts?.vendorCount}
                    svgName="profile"
                  />
                )
              )}
            </Grid>
            <Grid xs={12} md={3}>
              {isLoading || loading ? (
                <Loading title="customers" svgName="profile" />
              ) : (
                counts && (
                  <OverviewPage
                    title="customers"
                    count={counts?.customerCount}
                    svgName="profile"
                  />
                )
              )}
            </Grid>
            <Grid xs={12} md={3}>
              {isLoading || loading ? (
                <Loading title="riders" svgName="profile" />
              ) : (
                counts && (
                  <OverviewPage
                    title="riders"
                    count={counts?.riderCount}
                    svgName="profile"
                  />
                )
              )}
            </Grid>
            <Grid xs={12} md={3}>
              {isLoading || loading ? (
                <Loading title="products" svgName="product" />
              ) : (
                counts && (
                  <OverviewPage
                    title="products"
                    count={counts?.productCount}
                    svgName="product"
                  />
                )
              )}
            </Grid>
            <Grid xs={12} md={12}>
              <OverViewChartPage startDate="2024-06-01" endDate="2024-06-28" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
