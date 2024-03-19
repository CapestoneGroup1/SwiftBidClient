import { Chip, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetUserProducts } from "../../api/products";
import { PRODUCT_STATUS } from "../../utils/types";
import ProductThumbnails from "../../components/common/ProductThumbnail";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

export default function UserProducts() {
  const { data } = useGetUserProducts();
  const [filters, setFilters] = useState({
    APPROVED: true,
    REJECTED: true,
    PENDING: true,
    SOLD: true,
    EXPIRED: true,
  });

  const modifyFilters = (status: PRODUCT_STATUS) => {
    setFilters((filter) => {
      return {
        ...filter,
        [status]: !filter[status],
      };
    });
  };

  const filteredData = data
    ? data.filter((product) => {
        return filters[product.adminapproval];
      })
    : [];

  return (
    <BackgroundWrapper top={5}>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ width: "90%", margin: "auto" }}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            variant="h6"
            style={{ fontSize: "2.2rem", color: "white" }}
          >
            My Products
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={10}></Paper>
        </Grid>
        <Grid item xs={12} container justifyContent="center" spacing={2}>
          {["APPROVED", "PENDING", "REJECTED", "SOLD", "EXPIRED"].map((obj) => {
            return (
              <Grid item>
                <Chip
                  label={obj}
                  style={{
                    backgroundColor: filters[obj as PRODUCT_STATUS]
                      ? "green"
                      : "#ede8e1",
                    color: filters[obj as PRODUCT_STATUS] ? "white" : "black",
                  }}
                  onClick={() => modifyFilters(obj as PRODUCT_STATUS)}
                />
              </Grid>
            );
          })}
        </Grid>
        <br />
        <Grid item xs={12}>
          <ProductThumbnails
            showStatus
            showEdit
            products={filteredData?.sort((a, b) =>
              a.adminapproval.localeCompare(b.adminapproval)
            )}
          />
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
}
