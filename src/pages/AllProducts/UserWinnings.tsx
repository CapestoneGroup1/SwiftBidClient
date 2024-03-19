import React from "react";
import { useGetUserWinnings } from "../../api/profile";
import { Button, Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "../../components/common/ProductStatus";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import ProductThumbnails from "../../components/common/ProductThumbnail";

export default function UserWinnings() {
  const { data } = useGetUserWinnings();
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
              Winnings
            </Typography>
            <Typography
              variant="caption"
              style={{
                color: "white",
                fontSize: "0.8rem",
                textAlign: "center",
              }}
            >
              Track all your Winnings
            </Typography>
            <br/>
          </Grid>
        </Grid>
        <Grid container item xs={10} justifyContent='center'>
          {data?.map((obj) => {
            const { productid: product, paymentcompleted } = obj;
            return (
              <Grid item xs={12} sm={4} md={4} lg={3} key={product._id}>
                <Paper style={{ padding: 5 }}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <ProductStatus status={product.adminapproval} />
                    </Grid>
                    <Grid item>
                      <img
                        style={{
                          height: "10rem",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={product.imageurl}
                        alt={product.name}
                      />
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                      <Typography variant="h6">{product.name}</Typography>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center">
                      <Grid item>
                        <Button
                          size="small"
                          onClick={() =>
                            navigate("/productinfo/" + product._id)
                          }
                        >
                          Details
                        </Button>
                      </Grid>
                      {!paymentcompleted && (
                        <Grid item>
                          <CustomButton
                            name="Complete Payment"
                            type="error"
                            onClick={() => {}}
                          />
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
    </BackgroundWrapper>
  );
}
