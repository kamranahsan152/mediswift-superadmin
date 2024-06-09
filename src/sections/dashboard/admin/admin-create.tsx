import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { InputAdornment, Grid } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { paths } from "src/paths";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useCreateAdminMutation } from "src/redux/reducer";

const schema = Yup.object().shape({
  name: Yup.string().max(255).required("Name is required"),
  phoneNumber: Yup.string()
    .max(255)
    .matches(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits")
    .required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/g, "Password must contain an upper case letter")
    .matches(/[a-z]/g, "Password must contain an lower case letter")
    .matches(/[0-9]/g, "Password must contain a number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .matches(/[A-Z]/g, "Password must contain an upper case letter")
    .matches(/[a-z]/g, "Password must contain an lower case letter")
    .matches(/[0-9]/g, "Password must contain a number")
    .required("Confirm Password is required"),
});

export const AdminCreateForm = () => {
  const authToken = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setloading] = useState(false);

  const [createAdmin] = useCreateAdminMutation();

  const handleChange = (prop: any) => (event: any) => {
    const newErrors = { ...errors };
    delete newErrors[prop];
    setErrors(newErrors);
    setValues({ ...values, [prop]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    schema
      .validate(values, { abortEarly: false })
      .then(async () => {
        setloading(true);

        const body = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: values.role,
        };

        try {
          await createAdmin({ body }).unwrap();
          setloading(true);
          toast.success("Admin Registered Successfully!");
          router(paths.superadmin.admins.list);
        } catch (error) {
          setloading(false);
          toast.error("Error while adding admin!");
        }

        // const response = await fetch("http://localhost:4000/api/v1/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     authorization: `${authToken}`,
        //   },
        //   body: JSON.stringify({
        //     name: values.name,
        //     email: values.email,
        //     phoneNumber: values.phoneNumber,
        //     password: values.password,
        //     confirmPassword: values.confirmPassword,
        //     role: values.role,
        //   }),
        // });
        // if (response.ok) {
        //   setloading(false);
        //   toast.success("Admin Registered Successfully!");
        //   router(paths.superadmin.admins.list);
        // } else {
        //   response.json().then((data) => {
        //     toast.error(data.message);
        //     setloading(false);
        //   });
        // }
      })
      .catch((err) => {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid
        sx={{
          padding: 2,
        }}
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="Full Name"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name ? true : false}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="Phone Number"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "15px", color: "black" }}>+92</span>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="Email Address"
            value={values.email}
            onChange={handleChange("email")}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
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
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{
                    marginRight: 0.5,
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid md={6} item xs={12}></Grid>
        <Grid md={2} item>
          <LoadingButton
            loading={loading}
            fullWidth
            size="medium"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
          >
            Register Admin
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};
