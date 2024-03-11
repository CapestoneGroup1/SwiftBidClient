import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Paper,
} from "@mui/material";
import { useAddNewProduct, useGetCategories } from "../../api/products";
import CustomButton from "../../components/common/CustomButton";

type FormState = {
  name: string;
  description: string;
  price: number;
  category: string;
  file: File | null;
};

const AddProduct = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    description: "",
    price: 0,
    category: "",
    file: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: categories } = useGetCategories();

  const handleClear = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      file: null,
    });
    setErrors({});
  };

  const { postData: addProduct, isLoading } = useAddNewProduct(handleClear);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
      setErrors({ ...errors, file: "" });
    }
  };

  const handleSubmit = () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", `${formData.price}`);
      if (formData.file !== null) {
        data.append("file", formData.file);
      }
      addProduct(data);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (formData: FormState) => {
    const errors: { [key: string]: string } = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.price) {
      errors.price = "Price is required";
    }
    if (!formData.category) {
      errors.category = "Category is required";
    }
    if (!formData.file) {
      errors.file = "File is required";
    }
    // Additional file validation can be added here
    return errors;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <h2>Add Product To Sell</h2>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="standard"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="standard"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  variant="standard"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  error={Boolean(errors.price)}
                  helperText={errors.price}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="standard"
                  required
                  fullWidth
                  error={Boolean(errors.category)}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    name="category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories?.map((obj) => {
                      return (
                        <MenuItem key={obj._id} value={obj._id}>
                          {obj.name.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{errors.category}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
                {!!errors.file && (
                  <FormHelperText error>{errors.file}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={3}>
                <CustomButton
                  type="primary"
                  onClick={handleSubmit}
                  name="Add Product"
                  loading={isLoading}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClear}
                  fullWidth
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
