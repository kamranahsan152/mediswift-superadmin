import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const Page: React.FC = () => {
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          width: "100vw",
          backgroundColor: "#0098f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "45%",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
            backgroundColor: "#ffffff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <img
            style={{
              width: 80,
              height: 80,
              marginBottom: 10,
            }}
            src={"../../../public/assets/checkedd.png"}
            alt="message"
          />
          <Typography variant="h3">Payment Successfully!</Typography>
          <Button
            sx={{
              marginTop: 4,
            }}
            variant="contained"
            color="info"
            onClick={() => {
              router("/superadmin");
            }}
          >
            Go back to Dashboard
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: 2,
          }}
        >
          Please wait, until we are verifying your payment...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }
};

export default Page;
