import React, { useEffect, useState } from "react";
import {
  useGetProductBids,
  useGetUserProductDetailsById,
  usePlaceNewBidForProduct,
} from "../../api/products";
import { useParams } from "react-router-dom";
import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppContext } from "../../components/AppWrapper";
import ProductStatus from "../../components/common/ProductStatus";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deepOrange } from "@mui/material/colors";
import CustomButton from "../../components/common/CustomButton";
import { ProductBids } from "../../utils/types";

export default function ProductCompleteInformation() {
  const { user } = useAppContext();
  const { productid } = useParams();
  const { fetchData, data } = useGetUserProductDetailsById(productid || "");
  const [allBids, setAllBids] = useState<ProductBids[]>([]);

  const {
    fetchData: fetchBids,
    isLoading: bidsLoading,
    data: bids,
  } = useGetProductBids(productid || "");

  const [newBidPrice, setNewBidPrice] = useState("");

  useEffect(() => {
    if (productid) {
      Promise.all([fetchData(), fetchBids()]);
    }
  }, [productid]);

  useEffect(() => {
    if (!bidsLoading && bids) {
      setAllBids(bids);
    }
  }, [bids]);

  const refreshDetails = () => {
    setNewBidPrice("");
    fetchBids();
  };

  const { isLoading, postData: placeBid } = usePlaceNewBidForProduct(
    refreshDetails,
    refreshDetails
  );

  const onClick = () => {
    if (newBidPrice && productid) {
      placeBid({
        productid,
        bidprice: +newBidPrice,
      });
    }
  };

  if (!data || !user) return <></>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h6">{data.name} - Bid History</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Paper style={{ padding: 5 }} elevation={5}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <ProductStatus status={data.adminapproval} />
              </Grid>
              <Grid item>
                <img
                  style={{
                    width: "100%",
                    height: "15rem",
                    objectFit: "contain",
                  }}
                  src={data.imageurl}
                  alt={data.name}
                />
              </Grid>
              <Grid item display="flex" justifyContent="center">
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item display="flex" direction="column">
                <Typography variant="h6">Description</Typography>
                <Typography>{data.description}</Typography>
              </Grid>
              <Grid item display="flex" direction="column">
                <Typography variant="h6">Base Price</Typography>
                <Typography color="green" variant="h6">
                  ${data.price}
                </Typography>
              </Grid>
              <Grid item display="flex" direction="column">
                <Typography variant="h6">Higest Bid</Typography>
                <Typography color="green" variant="h6">
                  ${allBids[0]?.bidprice || data.price}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="Bids history of product"
              id="bidHistory"
            >
              <Typography variant="h6">Bids</Typography>
              {bidsLoading && (
                <>
                  <CircularProgress />
                </>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Grid container direction="column" spacing={2}>
                  {allBids?.map((bid, index) => {
                    return (
                      <Grid item key={bid._id}>
                        <Paper
                          elevation={10}
                          style={{
                            padding: 10,
                            borderRadius: 20,
                            maxWidth: 300,
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                                {bid.userid?.username?.charAt(0)}
                              </Avatar>
                            </Grid>
                            <Grid item display="flex" flexDirection="column">
                              <Typography color="orangered">
                                {bid.userid.username}
                              </Typography>
                              <Typography>${bid.bidprice}</Typography>
                              <Typography>{new Date(bid.date).toDateString()}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    );
                  })}
                  <br />
                </Grid>
              </div>
              <Grid container display="flex" alignItems="center">
                <TextField
                  variant="standard"
                  value={newBidPrice}
                  type="number"
                  onChange={(e) => setNewBidPrice(e.target.value)}
                  placeholder="New Bid price"
                ></TextField>
                &nbsp;
                <CustomButton
                  name="Place Bid"
                  onClick={onClick}
                  loading={isLoading}
                  disabled={!/^\d+$/.test(newBidPrice)}
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
}
