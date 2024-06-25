import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Stack, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import { Seo } from "src/components/seo";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/authSlice";
import { AppDispatch } from "src/redux/store";
import { useLoginMutation } from "src/redux/reducer";
import toast from "react-hot-toast";
import { paths } from "src/paths";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setisSubmit] = useState<any>(null);
  const [loading, setloading] = useState(false);
  const router = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [Login] = useLoginMutation();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    schema
      .validate(values, { abortEarly: false })
      .then(async () => {
        setloading(true);

        const body = {
          email: values.email,
          password: values.password,
        };

        try {
          const response = await Login({ body }).unwrap();
          if (response.user.role === "super-admin") {
            const user: any = {
              role: response.user.role,
              authToken: response.authToken,
            };
            dispatch(setUser(user));
            router(paths.superadmin.index, { replace: true });
            setloading(false);
            toast.success(response.message);
          } else {
            throw new Error(
              "You are not allowed to access the resources, Please enter a valid login, for super-admin"
            );
          }
        } catch (error) {
          toast.error(error.data.message);
          console.clear();
          setloading(false);
        }
      })
      .catch((err) => {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const [errors, setErrors] = useState<any>({});
  const handleChange = (prop: any) => (event: any) => {
    const newErrors = { ...errors };
    delete newErrors[prop];
    setErrors(newErrors);
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card
          elevation={20}
          sx={{
            pl: 2,
            pr: 2,
            justifyContent: "center",
            width: "90%",
            maxWidth: 500,
          }}
        >
          <CardHeader
            subheader={
              <Typography
                sx={{
                  marginTop: 1,
                }}
                color="text.secondary"
                variant="body2"
              >
                Super-Admin
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Login"
          />
          <CardContent>
            <form noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  size="medium"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  size="medium"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  error={errors.password ? true : false}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          marginRight: 0.5,
                        }}
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
              <LoadingButton
                loading={loading}
                fullWidth
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Login
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
