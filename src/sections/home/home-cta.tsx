import type { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: "neutral.800",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top center",
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: "neutral.100",
      py: "120px",
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography align="center" color="inherit" variant="h3">
          You have Access to all Resourses
        </Typography>
        <Typography align="center" color="inherit" variant="subtitle2">
          This platform allows the administration to oversee operations
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component={RouterLink}
          href={paths.superadmin.index}
          variant="contained"
        >
          Get Started
        </Button>
      </Stack>
    </Container>
  </Box>
);
