import React, { useEffect, useState } from "react";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import { useUpdateProfile } from "../../api/profile";
import CustomButton from "../../components/common/CustomButton";
import { useAppContext } from "../../components/AppWrapper";
import { ProfileUpdateData, User } from "../../utils/types";
import { profileDispatchAction } from "../../context/ActionCreators";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

type FormState = {
  username: string;
  email: string;
  mobile: string;
  address: string;
  province: string;
  city: string;
  postalcode: string;
  country: string;
};

const UserProfile = () => {
  const { user, dispatch } = useAppContext();
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    username: user.username || "",
    email: user.email || "",
    mobile: user.mobile || "",
    address: user.address || "",
    province: user.province || "",
    city: user.city || "",
    postalcode: user.postalcode || "",
    country: user.country || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        address: user.address || "",
        province: user.province || "",
        city: user.city || "",
        postalcode: user.postalcode || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleClear = () => {
    setErrors({});
    dispatch(
      profileDispatchAction({
        ...user,
        formData,
      } as User)
    );
    setCanEdit(false);
  };

  const { postData: updateProfile, isLoading } = useUpdateProfile(handleClear);

  const handleChange = (e: any) => {
    setCanEdit(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const jsonData: ProfileUpdateData = {
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        province: formData.province,
        city: formData.city,
        postalcode: formData.postalcode,
        country: formData.country || "",
      };
      updateProfile(jsonData);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData: FormState) => {
    const errors: { [key: string]: string } = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Invalid mobile number";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!formData.province) {
      errors.province = "Province is required";
    }

    if (!formData.city) {
      errors.city = "City is required";
    }

    if (!formData.postalcode) {
      errors.postalcode = "Postal code is required";
    } else if (
      !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.postalcode)
    ) {
      errors.postalcode = "Invalid postal code format";
    }

    if (!formData.country) {
      errors.country = "Country is required";
    }

    return errors;
  };

  return (
    <BackgroundWrapper>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" className="text-center">Profile Details</Typography>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="UserName"
                    variant="standard"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="standard"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile"
                    variant="standard"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={Boolean(errors.mobile)}
                    helperText={errors.mobile}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    variant="standard"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="province"
                    variant="standard"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    error={Boolean(errors.province)}
                    helperText={errors.province}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    variant="standard"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Postal Code"
                    variant="standard"
                    name="postalcode"
                    value={formData.postalcode}
                    onChange={handleChange}
                    error={Boolean(errors.postalcode)}
                    helperText={errors.postalcode}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="country"
                    variant="standard"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={Boolean(errors.country)}
                    helperText={errors.country}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomButton
                    type="primary"
                    onClick={handleSubmit}
                    name="Update"
                    loading={isLoading}
                    disabled={!canEdit}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
};

export default UserProfile;
