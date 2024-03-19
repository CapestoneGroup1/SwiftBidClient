import React from "react";
import { useGetAllProducts } from "../../api/products";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "../../components/common/ProductStatus";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";

export default function AllProducts() {
  const { data, isLoading } = useGetAllProducts();
  const navigate = useNavigate();

  return (
    <Loading loading={isLoading}>
      <Grid container direction="column" spacing={2}>
        <Grid item display={'flex'} justifyContent='center'>
            <Typography variant="h6">Products for sale</Typography>
        </Grid>
        <Grid item xs={12} container spacing={2} justifyContent='center'>
          {data?.map((product) => {
            return (
              <>
                <Grid item xs={10} sm={6} md={3} lg={2} key={product._id}>
                  <Paper style={{ padding: 5 }} elevation={10}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <ProductStatus status={product.adminapproval} />
                      </Grid>
                      <Grid item>
                        <img
                          style={{
                            width: "100%",
                            height: "5rem",
                            objectFit: "contain",
                          }}
                          src={product.imageurl}
                          alt={product.name}
                        />
                      </Grid>
                      <Grid item display="flex" justifyContent="center">
                        <Typography variant="h6">{product.name}  (${product.price})</Typography>
                      </Grid>
                      <Grid item container spacing={2} alignItems="center" justifyContent='center'>
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() =>
                              navigate("/productinfo/" + product._id)
                            }
                          >
                            Bid
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Loading>
  );
}