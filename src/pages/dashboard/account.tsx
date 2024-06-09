import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { subDays, subHours, subMinutes, subMonths } from "date-fns";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { TextField } from "@mui/material";
import { useUserInfoQuery, useVerifyTokenQuery } from "src/redux/reducer";

const tabs = [{ label: "General", value: "general" }];

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>("general");

  usePageView();
  const styles = {
    border: {
      borderRadius: 0,
      border: "none",
      borderColor: "#E5E7EB",
      borderBottomWidth: "1px",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderStyle: "solid",
    },
    container: {
      width: "100%",
      height: "400px",
    },
    containerBorder: {
      marginTop: 20,
      paddingBottom: 10,
      borderRadius: 12,
      border: "none",
      borderColor: "#E5E7EB",
      borderBottomWidth: "1px",
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      borderStyle: "solid",
    },
  };

  // const { user } = useAuth();

  const { data } = useVerifyTokenQuery("");
  const { data: userInfo, isLoading } = useUserInfoQuery({
    id: data.decoded.user.id,
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Seo title="Dashboard: Account" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3} sx={{ mb: 3 }}>
            <Typography variant="h4">Account</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          <Stack>
            <Card elevation={0} style={styles.border}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} md={5}>
                    <Typography variant="h6">Basic Details</Typography>
                  </Grid>
                  <Grid flex={1}>
                    <Grid xs={8} md={8}>
                      <Stack spacing={1}>
                        <TextField
                          fullWidth
                          disabled
                          label={userInfo?.user?.name}
                          InputLabelProps={{
                            style: { color: "#000" },
                          }}
                        />
                        <TextField
                          fullWidth
                          disabled
                          label={userInfo?.user?.email}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* <Divider /> */}
            <Divider />
            <Card elevation={0} sx={styles.border}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12} md={5}>
                    <Typography variant="h6">More Information</Typography>
                  </Grid>
                  <Grid flex={1}>
                    <Grid xs={8} md={8}>
                      <Stack spacing={1}>
                        <TextField
                          fullWidth
                          disabled
                          label={userInfo?.user?._id}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                        />
                        <TextField
                          fullWidth
                          disabled
                          label={userInfo?.user?.phoneNumber}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                        />
                        <TextField
                          fullWidth
                          disabled
                          label={userInfo?.user?.role?.toUpperCase()}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
