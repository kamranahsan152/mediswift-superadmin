/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FormEvent, lazy } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Logo2 } from "src/components/logo2";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUserInfoQuery, useVerifyTokenQuery } from "src/redux/reducer";
import { useUserData } from "src/types/global";

const Error401Page = lazy(() => import("src/pages/401"));

const stripePromise = loadStripe(
  "pk_test_51PGnioRqcwiTK3aHFsVV9NAE5wfXd991qUXlU6uHGLUYBIhNLTxSPwnSB4L6XZBgDkVuBsDelZwIAX5cm3nGrlTc00ZCUGtNL0"
);

const Page: React.FC = () => {
  const location = useLocation();
  const state = location.state;
  // const vendorId = state?.vendorId;
  const sessionId = state?.sessionId;

  // fetchSession();

  return state ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm sessionId={sessionId} />
    </Elements>
  ) : (
    <Error401Page />
  );
};

const formatedBalance = (balance: any) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  return formatted;
};

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ sessionId }: any) => {
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const state = location.state;
  const { items, totalPrice } = state;
  const router = useNavigate();
  const adminfree = 0.05;

  const stripe = useStripe();
  const elements = useElements();

  console.log(items);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: (event.target as any).name.value,
        email: (event.target as any).email.value,
        address: {
          country: "PK",
        },
      },
    });

    if (error) {
      console.error(error);
      setloading(false);
    } else if (sessionId) {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(sessionId, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setloading(false);
        console.error(confirmError);
      } else {
        setloading(false);
        router("/success");
        // console.log("Payment successful!");
      }
    }
  };

  const admin_charges = totalPrice * adminfree;

  const user = useUserData();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
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
          Please wait, until page is loading....
        </Typography>
        <CircularProgress />
      </Box>
    );
  }
  if (!user) {
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
          404 not found!, unexpected error
        </Typography>
        {/* <CircularProgress /> */}
      </Box>
    );
  }

  return (
    <Container
      sx={{
        margin: "auto",
        borderRadius: 5,
        boxShadow: 20,
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          style={{ marginRight: 8 }}
        >
          Payment Gateway by
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo2 />
          <Typography sx={{ ml: 1 }} variant="h5" gutterBottom>
            MediSwift
          </Typography>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 2,
          mt: 6,
          ml: 2,
          justifyContent: "space-between",
        }}
      >
        <div>
          <Box>
            <Typography variant="h4">
              Rs {formatedBalance(totalPrice - admin_charges)}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                width: 350,
                mb: 2,
              }}
            >
              {items.map((item: any, index: any) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    mt: 0.5,
                    mb: 0.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Chip
                    sx={{ mt: 1 }}
                    color="success"
                    size="small"
                    label={item._id}
                  />
                  <Typography sx={{ mt: 1 }} variant="subtitle1">
                    Rs {formatedBalance(item?.price)} x {item?.quantity}
                  </Typography>
                </Box>
              ))}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ mt: 1 }}>
                  SubTotal
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Rs {formatedBalance(totalPrice)}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Admin Charges
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Rs {formatedBalance(admin_charges)}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
            <Box
              sx={{
                backgroundColor: "white",
                p: 4,
                borderRadius: 2,
                boxShadow: 20,
              }}
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                value={user?.email}
                type="email"
                fullWidth
                margin="normal"
              />
              <Box mb={2}>
                <InputLabel htmlFor="card-element">Card details</InputLabel>
                <Box
                  sx={{ border: "1px solid #ced4da", borderRadius: 1, p: 2 }}
                >
                  <CardElement id="card-element" />
                </Box>
              </Box>
              <TextField
                id="name"
                name="name"
                label="Cardholder name"
                value={user?.name}
                type="text"
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="country-label">Country or region</InputLabel>
                <Select
                  id="country"
                  name="country"
                  labelId="country-label"
                  label="Country or region"
                  defaultValue="Pakistan"
                  required
                >
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                </Select>
              </FormControl>
              <LoadingButton
                loading={loading}
                fullWidth
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={!stripe}
              >
                Pay Now
              </LoadingButton>
            </Box>
          </form>
        </div>
      </Box>
    </Container>
  );
};

export default Page;
