import type { FC } from "react";
import EyeIcon from "@untitled-ui/icons-react/build/esm/Eye";
import LayoutBottomIcon from "@untitled-ui/icons-react/build/esm/LayoutBottom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";

import { HomeCodeSamples } from "./home-code-samples";

export const HomeHero: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: "120px",
      }}
    >
      <Container maxWidth="lg" style={{ display: "flex" }}>
        <Box maxWidth="sm">
          <Typography variant="h1" sx={{ mb: 2 }}>
            Speeding Health to you with &nbsp;
            <Typography component="span" color="primary.main" variant="inherit">
              MediSwift
            </Typography>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            MediSwift is a comprehensive and efficient medicine delivery
            platform designed to provide prompt and reliable service. The
            project comprises five integral components, each fulfilling a unique
            role within the ecosystem
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          ></Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Button
              component={RouterLink}
              href={paths.superadmin.index}
              startIcon={
                <SvgIcon fontSize="small">
                  <EyeIcon />
                </SvgIcon>
              }
              sx={(theme) =>
                theme.palette.mode === "dark"
                  ? {
                      backgroundColor: "neutral.50",
                      color: "neutral.900",
                      "&:hover": {
                        backgroundColor: "neutral.200",
                      },
                    }
                  : {
                      backgroundColor: "neutral.900",
                      color: "neutral.50",
                      "&:hover": {
                        backgroundColor: "neutral.700",
                      },
                    }
              }
              variant="contained"
            >
              Get Started
            </Button>
          </Stack>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src="/hero3.jpg"
            alt="hero"
            style={{
              borderRadius: "10%", // round the image
              // transform: "rotateY(-30deg) rotateX(30deg) perspective(200px)", // apply 3D transformation
            }}
            width={450}
            height={450}
          />
          <img
            src="/3D_elements.png"
            alt=""
            width={500}
            height={500}
            style={{
              position: "absolute",
              borderRadius: "10%", // round the image
              transform: "rotateY(-30deg) rotateX(30deg) perspective(200px)", // apply 3D transformation
              animation: "moveUpDown 2s ease-in-out infinite alternate", // apply animation
            }}
          />
          <style>{`
            @keyframes moveUpDown {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(-20px);
              }
            }
          `}</style>
        </div>
      </Container>
      <Box
        sx={{
          pt: "120px",
          position: "relative",
        }}
      ></Box>
    </Box>
  );
};
