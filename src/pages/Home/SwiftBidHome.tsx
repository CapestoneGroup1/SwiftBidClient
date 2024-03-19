import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useGetAllProducts, useGetCategories } from "../../api/products";
import ProductThumbnails from "../../components/common/ProductThumbnail";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

export default function SwiftBidHome() {
  const { data: categories } = useGetCategories();
  const { data: products } = useGetAllProducts();

  return (
    <>
      <BackgroundWrapper>
        <Grid container justifyContent="center">
          <Grid item display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h6"
              style={{ color: "white", fontSize: "2.25rem" }}
            >
              Welcome to SwiftBid
            </Typography>
            <Typography variant="caption" style={{ color: "white", fontSize: "0.8rem", width: '70%', textAlign: 'center' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              explicabo soluta iusto enim ut consectetur asperiores voluptas
              veritatis eligendi recusandae qui ab magni sed fugit id, ipsam
              provident? Molestias, tempora.
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item></Grid>
        </Grid>
        <br />
        <Grid container justifyContent="center">
          <Grid item xs={11}>
            <ProductThumbnails products={products} showStatus={false} />
          </Grid>
        </Grid>
      </BackgroundWrapper>
    </>
  );
}
