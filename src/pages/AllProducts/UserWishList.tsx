import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "../../components/common/ProductStatus";
import { useNavigate } from "react-router-dom";
import { useGetUserWishList } from "../../api/profile";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import ProductThumbnails from "../../components/common/ProductThumbnail";

export default function UserWishList() {
  const { data } = useGetUserWishList();
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      <Grid container alignItems="center">
        <Grid item container justifyContent="center">
          <Grid item display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h6"
              style={{ color: "white", fontSize: "2.25rem" }}
            >
              My Bids
            </Typography>
            <Typography
              variant="caption"
              style={{
                color: "white",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              Track all your Biddings on various Products
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <br />
          <ProductThumbnails products={data} showStatus isWhishList />
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
}
