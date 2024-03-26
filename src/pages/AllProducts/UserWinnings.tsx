import React from "react";
import { useGetUserWinnings } from "../../api/profile";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "../../components/common/ProductStatus";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import ProductThumbnails from "../../components/common/ProductThumbnail";
import PageDescription from "../../components/common/PageDescription";

export default function UserWinnings() {
  const { data } = useGetUserWinnings();
  const navigate = useNavigate();

  return (
    <BackgroundWrapper>
      <PageDescription title="Winnings" caption="Track all your Winnings" />
      <Grid container alignItems="center">
        <Grid container item xs={10} justifyContent="center" spacing={2}>
          {data?.map((obj) => {
            const { productid: product, paymentcompleted, transactionId } = obj;
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
                          Product Details
                        </Button>
                      </Grid>
                      {paymentcompleted && (
                        <>
                          <Grid item>
                            <Typography color='green'>
                              TransactionID: {transactionId}
                            </Typography>
                          </Grid>
                        </>
                      )}
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
