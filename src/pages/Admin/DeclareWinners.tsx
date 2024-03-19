import { Grid, Paper, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import { useDeclareWinners, useGetBidEndProducts } from "../../api/admin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

export default function DeclareWinners() {
  const [bidenddate, setBidEndDate] = useState<Dayjs | null>(dayjs());
  const { trigger, data } = useGetBidEndProducts();
  const { isLoading, trigger: declareWinners } = useDeclareWinners(() =>
    trigger(`${dayjs()?.endOf("day").valueOf()}`)
  );

  useEffect(() => {
    trigger(`${bidenddate?.endOf("day").valueOf()}`);
  }, []);

  return (
    <BackgroundWrapper>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ width: "90vw", margin: "auto" }}
      >
        <Grid item display={"flex"} justifyContent={"center"}>
          <Typography variant="h6" style={{ color: "white" }}>
            Declare Winners
          </Typography>
        </Grid>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <DatePicker
              label="Bid EndDate"
              value={bidenddate}
              onChange={(newValue) => {
                setBidEndDate(newValue);
                trigger(`${newValue?.endOf("day").valueOf()}`);
              }}
              name="bidenddate"
            />
          </Grid>
          <Grid item>
            <CustomButton
              name="Declare Winners"
              loading={isLoading}
              disabled={data?.length === 0}
              onClick={() => {
                declareWinners(`${bidenddate?.endOf("day").valueOf()}`);
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={10} display="flex" justifyContent="center">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Uploaded By</TableCell>
                  <TableCell align="right">Base Price($)</TableCell>
                  <TableCell align="right">Higest Bid($)</TableCell>
                  <TableCell align="right">High Bid User</TableCell>
                  <TableCell align="right">Bid date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((obj) => {
                  const {
                    _id,
                    name,
                    price,
                    userid: { username: uploadedBy },
                  } = obj.product;
                  const { bidprice, userid, date } = obj.bids[0] || {};

                  return (
                    <TableRow key={_id}>
                      <TableCell>{name}</TableCell>
                      <TableCell align="right">{uploadedBy}</TableCell>
                      <TableCell align="right">{price}</TableCell>
                      <TableCell align="right">{bidprice}</TableCell>
                      <TableCell align="right">{userid?.username}</TableCell>
                      <TableCell align="right">
                        {date ? new Date(date).toDateString() : ""}
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
  );
}
