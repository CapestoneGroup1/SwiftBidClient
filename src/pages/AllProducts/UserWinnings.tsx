import { useGetUserWinnings } from "../../api/profile";
import { Grid, Paper, Typography } from "@mui/material";
import ProductStatus from "../../components/common/ProductStatus";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import PageDescription from "../../components/common/PageDescription";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorIcon from "@mui/icons-material/Error";
import APIService from "../../services/Api";

export default function UserWinnings() {
  const { data } = useGetUserWinnings();

  const downloadInvoice = async (transactionId: string) => {
    try {
      const response = await APIService.getInstance().get(
        `/user/invoice/${transactionId}`,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <BackgroundWrapper>
      <PageDescription title="Winnings" caption="Track all your Winnings" />
      <br />
      <Grid container alignItems="center" justifyContent="center">
        <Grid container item xs={10} justifyContent="center" spacing={2}>
          {data?.map((obj) => {
            const { productid: product, paymentcompleted, transactionId } = obj;
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={3}
                key={product._id}
                style={{ width: "80%" }}
              >
                <Paper style={{ padding: 5 }}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <ProductStatus status={product.adminapproval} />
                    </Grid>
                    <Grid item>
                      <img
                         style={{
                          height: "5rem",
                          width: "auto", 
                          maxHeight: "5rem", 
                          display: "block",
                          margin: "0 auto",
                          objectFit: "contain",
                        }}
                        src={product.imageurl}
                        alt={product.name}
                      />
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                      <Typography style={{ fontSize: "1.2rem" }}>
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid item container spacing={2} alignItems="center">
                      {paymentcompleted && (
                        <>
                          <Grid
                            item
                            container
                            alignItems="center"
                            spacing={1}
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <CheckCircleIcon style={{ color: "green" }} />{" "}
                              <span style={{ color: "green" }}>
                                PaymentSuccess
                              </span>
                            </Grid>
                            <Grid
                              item
                              onClick={() => downloadInvoice(transactionId)}
                            >
                              <DownloadIcon style={{ cursor: "pointer" }} />{" "}
                              Invoice
                            </Grid>
                          </Grid>
                        </>
                      )}
                      {!paymentcompleted && (
                        <Grid item>
                          <ErrorIcon style={{ color: "red" }} /> Payment Pending
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
