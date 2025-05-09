import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";

import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";

const Page = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  usePageView();

  return (
    <>
      <Seo title="Error: Authorization Required" />
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          py: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              alt="Not authorized"
              component="img"
              src="/assets/errors/error-401.png"
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 350,
              }}
            />
          </Box>
          <Typography align="center" variant={mdUp ? "h1" : "h4"}>
            401: Authorization required
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button component={RouterLink} href={paths.auth.login}>
              Login to get Authorized
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
