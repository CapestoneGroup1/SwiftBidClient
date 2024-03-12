import { Button, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetUserProducts } from "../../api/products";
import ProductStatus from "../../components/common/ProductStatus";
import EditIcon from '@mui/icons-material/Edit';
import { PRODUCT_STATUS } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";

export default function UserProducts() {
  const { data } = useGetUserProducts();
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    APPROVED: true,
    REJECTED: true,
    PENDING: true,
  });

  const modifyFilters = (status: PRODUCT_STATUS) => {
    setFilters(filter => {
        return {
            ...filter,
            [status]: !filter[status]
        }
    })
  }

  const filteredData = data ? data.filter(product => {
    return filters[product.adminapproval];
  }) : [];

  return (
    <>
      <Grid container direction="column" spacing={2} style={{width: '80%', margin: 'auto'}}>
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Typography variant="h3">My Products</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent='center' spacing={2}>
          <Grid item><Chip label="Approved" color={filters.APPROVED ? 'success' : 'default'} onClick={() => modifyFilters('APPROVED')} /></Grid>
          <Grid item><Chip label="Pending Approval" color={filters.PENDING ? 'success' : 'default'} onClick={() => modifyFilters('PENDING')} /></Grid>
          <Grid item><Chip label="Rejected" color={filters.REJECTED ? 'success' : 'default'} onClick={() => modifyFilters('REJECTED')} /></Grid>
        </Grid>
        {data && data?.length > 0 && (
          <>
            <Grid item xs={12} container spacing={2}>
              {filteredData
                .sort((a, b) => a.adminapproval.localeCompare(b.adminapproval))
                .map((product) => {
                  return (
                    <>
                      <Grid item xs={12} sm={6} md={6} lg={3} key={product._id}>
                        <Paper style={{ padding: 5 }}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                              <ProductStatus status={product.adminapproval} />
                            </Grid>
                            <Grid item>
                              <img
                                style={{
                                  width: "100%",
                                  height: '15rem',
                                  objectFit: 'contain'
                                }}
                                src={product.imageurl}
                                alt={product.name}
                              />
                            </Grid>
                            <Grid item display='flex' justifyContent='center'>
                              <Typography variant="h6">{product.name}</Typography>
                            </Grid>
                            <Grid
                              item
                              container
                              spacing={2}
                              alignItems="center"
                            >
                              <Grid item>
                                <Button size="small" onClick={() => navigate("/productinfo/" + product._id)}>Details</Button>
                              </Grid>
                              {product.adminapproval === "PENDING" && (
                                <Grid item>
                                  <Button size="small" color="error"><EditIcon/>&nbsp;Edit</Button>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}