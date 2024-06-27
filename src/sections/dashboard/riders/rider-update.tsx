import React, { memo, useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Stack, InputAdornment, Grid } from "@mui/material";
import { paths } from "src/paths";
import { Seo } from "src/components/seo";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useUpdateRiderMutation } from "src/redux/reducer";
import PropTypes from "prop-types";

const schema = Yup.object().shape({
  name: Yup.string().max(255).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits")
    .required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  Cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in format XXXXX-XXXXXXX-X")
    .required("CNIC is required"),
  DrivingLicence: Yup.string().required("Driving License is required"),
});

interface Props {
  riderId: string;
  riderData: any;
  handleRiderClose: () => void;
}

const RiderUpdateForm: React.FC<Props> = (props) => {
  const { riderId, riderData, handleRiderClose } = props;

  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigate();
  const [values, setValues] = useState({
    name: riderData?.name || "",
    email: riderData?.email || "",
    phoneNumber: riderData?.phoneNumber || "",
    address: riderData?.address || "",
    Cnic: riderData?.Cnic || "",
    DrivingLicence: riderData?.DrivingLicence || "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setloading] = useState(false);
  const [updateRider] = useUpdateRiderMutation();

  const handleChange = (prop: any) => (event: any) => {
    const newErrors = { ...errors };
    delete newErrors[prop];
    setErrors(newErrors);
    setValues({ ...values, [prop]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          address: values.address,
          Cnic: values.Cnic,
          DrivingLicence: values.DrivingLicence,
          password: values.password,
        };

        try {
          const response = await updateRider({ body, id: riderId }).unwrap();
          toast.success(response.message);
          setloading(false);
          handleRiderClose();
        } catch (error) {
          toast.error(error);
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
            label="Address"
            value={values.address}
            onChange={handleChange("address")}
            error={errors.address ? true : false}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="CNIC"
            value={values.Cnic}
            onChange={handleChange("Cnic")}
            error={errors.Cnic ? true : false}
            helperText={errors.Cnic}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="DrivingLicence"
            value={values.DrivingLicence}
            onChange={handleChange("DrivingLicence")}
            error={errors.DrivingLicence ? true : false}
            helperText={errors.DrivingLicence}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="medium"
            label="New Password"
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
        <Grid md={2} item>
          <LoadingButton
            loading={loading}
            fullWidth
            size="medium"
            sx={{ mt: 1 }}
            type="submit"
            variant="contained"
          >
            Update Rider
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

RiderUpdateForm.propTypes = {
  riderId: PropTypes.string.isRequired,
  riderData: PropTypes.any.isRequired,
  handleRiderClose: PropTypes.func.isRequired,
};

export default memo(RiderUpdateForm);
