import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Typography,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  useAddNewCategory,
  useEditCategory,
  useGetCategories,
} from "../../api/products";
import CustomButton from "../../components/common/CustomButton";

export default function CategoriesList() {
  const { data, refetch } = useGetCategories();
  const { postData: addCategory, isLoading: addCatLoading } =
    useAddNewCategory(refetch);
  const { postData: editCategory, isLoading: editCatLoading } =
    useEditCategory(refetch);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const handleAddCategory = () => {
    setCategoryName("");
    setCategoryId("");
    setModalOpen(true);
  };

  const handleEditCategory = (id: string, name: string) => {
    setCategoryName(name);
    setCategoryId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCategoryName("");
    setCategoryId("");
  };

  const handleSaveCategory = () => {
    const existing = data?.find(cat => cat.name?.toLowerCase() === categoryName?.toLowerCase().trim())
    if(existing) {
      setDuplicate(true);
      return;
    }
    setDuplicate(false);
    if (categoryId) {
      editCategory({ id: categoryId, name: categoryName.trim() });
    } else {
      addCategory({ name: categoryName.trim() });
    }
    setModalOpen(false);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">Add / Edit Categories</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleAddCategory}>
            Add New Category
          </Button>
        </Grid>

        <Grid item xs={10}>
          <TableContainer component={Paper} style={{ width: "90vw" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleEditCategory(category._id, category.name)
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        title="Add/Edit Category"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add/Edit Category</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                variant="standard"
                value={categoryName}
                size="medium"
                fullWidth
                error={duplicate}
                helperText={duplicate ? 'Category Already Exists' : ''}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleSaveCategory}
            disabled={!categoryName}
            name="Save"
            loading={editCatLoading || addCatLoading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
