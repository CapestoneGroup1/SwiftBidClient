import React from "react";
import { ProductDetails } from "../../utils/types";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "./ProductStatus";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";
import { useAppContext } from "../AppWrapper";

export default function ProductThumbnails(props: {
  products: ProductDetails[] | null;
  showStatus: boolean;
  showEdit?: boolean;
  isWhishList?: boolean
}) {
  const { products } = props;
  const navigate = useNavigate();
  const { user } = useAppContext();

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            {products?.map((product) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper
                    elevation={10}
                    style={{
                      padding: 10,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container direction="column" spacing={2}>
                      {props.showStatus && (
                        <Grid item xs={12}>
                          <ProductStatus status={product.adminapproval} />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <img
                          src={product.imageurl}
                          alt={product.name}
                          style={{
                            height: "10rem",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Grid>
                      <Grid item display="flex" flexDirection="column">
                        <Typography
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          style={{
                            color: "green",
                            fontWeight: "bold",
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Divider />
                      </Grid>
                      <Grid
                        item
                        container
                        spacing={2}
                        style={{
                          paddingTop: 0,
                        }}
                      >
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              navigate("/productinfo/" + product._id)
                            }
                          >
                            {props.isWhishList ? 'Continue Bidding' : 'Bid'}
                          </Button>
                        </Grid>
                        {props.showEdit &&
                          user.id === product.userid &&
                          product.adminapproval === "PENDING" && (
                            <Grid item>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {}}
                              >
                                Edit
                              </Button>
                            </Grid>
                          )}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
