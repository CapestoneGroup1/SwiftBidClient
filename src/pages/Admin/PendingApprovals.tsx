import React from "react";
import {
  Product,
  useApproveProduct,
  usePendingApprovals,
  useRejectProduct,
} from "../../api/admin";
import { Grid, TextField, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomButton from "../../components/common/CustomButton";

function ProductDetails(props: { product: Product, onAction: (productId: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");

  const { postData: Approve, isLoading: approveLoading } = useApproveProduct(props.onAction);
  const { postData: Reject, isLoading: rejectLoading } = useRejectProduct(props.onAction);

  const approveProduct = () => {
    Approve({
      id: props.product._id,
    });
  };

  const rejectProduct = () => {
    Reject({
      id: props.product._id,
      rejectReason: reason,
    });
  };

  const {
    name,
    category,
    userid: user,
    price,
    description,
    imageurl,
  } = props.product;

  const userDetails = [
    { label: "Name", value: user.username },
    { label: "Email", value: user.email },
    { label: "Address", value: user.address },
    { label: "Province", value: user.province },
    { label: "City", value: user.city },
    { label: "Postalcode", value: user.postalcode },
  ];

  const productDetails = [
    { label: "Name", value: name },
    { label: "Category", value: category.name },
    { label: "Price", value: price },
    { label: "Description", value: description },
    { label: "Image", value: imageurl },
  ];

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{category.name}</TableCell>
        <TableCell align="right">{price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <br />
            <Grid container direction="column" spacing={2}>
              <Grid item container alignItems="center" spacing={2}>
                <Grid item>
                  <CustomButton name="Approve" onClick={approveProduct} loading={approveLoading}/>
                </Grid>
                <Grid item>
                  <TextField
                    label="Reason for Rejection"
                    size="small"
                    value={reason}
                    onChange={(e) => setReason(e.target.value?.trim())}
                  />
                </Grid>
                <Grid item>
                  <CustomButton
                    type="error"
                    name="Reject"
                    onClick={rejectProduct}
                    disabled={!reason}
                    loading={rejectLoading}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography>User Details</Typography>
                  <table className="table table-bordered">
                    <tbody>
                      {userDetails.map((item, index) => (
                        <tr>
                          <td>{item.label}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Product Details</Typography>
                  <table className="table table-bordered">
                    <tbody>
                      {productDetails.map((item, index) => (
                        <tr>
                          <td>{item.label}</td>
                          {item.label === "Image" ? (
                            <td>
                              <a
                                href={item.value}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.value}
                              </a>
                            </td>
                          ) : (
                            <td>{item.value}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </Grid>
            <br />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function PendingApprovals() {
  const { data, refetch } = usePendingApprovals();

  return (
    <>
      <Grid container direction="column" style={{width: '90vw', margin: 'auto'}}>
        <Grid item>
          <Typography variant="h6" textAlign='center'>Pending Approval</Typography>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Base Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((data) => (
                  <ProductDetails key={data._id} product={data} onAction={refetch}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
