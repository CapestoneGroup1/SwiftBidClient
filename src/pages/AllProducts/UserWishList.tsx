import React, { useState } from "react";
import { Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useGetUserWishList } from "../../api/profile";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import ProductThumbnails from "../../components/common/ProductThumbnail";
import PageDescription from "../../components/common/PageDescription";
import { PRODUCT_STATUS } from "../../utils/types";

export default function UserWishList() {
  const { data } = useGetUserWishList();
  const [filters, setFilters] = useState<any>({
    APPROVED: true,
    SOLD: false,
  });

  const modifyFilters = (status: PRODUCT_STATUS) => {
    setFilters((filter: any) => {
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
    <BackgroundWrapper>
      <PageDescription
        title="My Bids"
        caption="Track all your Biddings on various Products"
      />
      <br />
      <Grid container alignItems="center">
        <Grid item xs={12} container justifyContent="center" spacing={2}>
          {[
            { key: "APPROVED", label: "ONGOING BIDDING" },
            { key: "SOLD", label: "SOLD OUT" },
          ].map((obj) => {
            return (
              <Grid item>
                <Chip
                  label={obj.label}
                  style={{
                    backgroundColor: filters[obj.key] ? "green" : "#ede8e1",
                    color: filters[obj.key] ? "white" : "black",
                  }}
                  onClick={() => modifyFilters(obj.key as PRODUCT_STATUS)}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <br />
          <ProductThumbnails products={filteredData || []} showStatus isWhishList />
        </Grid>
      </Grid>
    </BackgroundWrapper>
  );
}
