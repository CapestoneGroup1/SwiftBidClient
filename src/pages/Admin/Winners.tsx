import React from "react";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import { useGetAllWinners } from "../../api/admin";
import PageDescription from "../../components/common/PageDescription";
import { Grid, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export default function Winners() {
  const { data } = useGetAllWinners();

  return (
    <>
      <BackgroundWrapper>
        <PageDescription title="Winners" />
        <br />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Base Price($)</TableCell>
                    <TableCell align="right">Winning Bid($)</TableCell>
                    <TableCell align="right">High Bid User</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((obj) => {
                    const {
                      bidprice,
                      date,
                      paymentcompleted,
                      transactionId,
                      userid: { username },
                    } = obj;
                    const {
                      _id,
                      name,
                      price,
                      userid: { username: uploadedBy },
                    } = obj.productid;
                    return (
                      <TableRow key={_id}>
                        <TableCell>{name}</TableCell>
                        <TableCell align="right">{price}</TableCell>
                        <TableCell align="right">{bidprice}</TableCell>
                        <TableCell align="right">{username}</TableCell>
                        <TableCell align="right">
                          {new Date(date).toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {paymentcompleted ? (
                            <>
                              <CheckCircleIcon
                                style={{ color: "green" }}
                                fontSize="small"
                              />
                              <div>RefId: {transactionId}</div>
                            </>
                          ) : (
                            <ErrorIcon style={{ color: "red" }} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </BackgroundWrapper>
    </>
  );
}
