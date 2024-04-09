import React from "react";
import { useGetQueries } from "../../api/admin";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import PageDescription from "../../components/common/PageDescription";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Paper } from "@mui/material";

export default function Queries() {
  const { data } = useGetQueries();

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "message", headerName: "Message", flex: 1},
  ];

  return (
    <>
      <BackgroundWrapper>
        <PageDescription title="User Queries" />
        <br />
        <Grid container justifyContent="center" width={"90vw"} margin="auto">
          <Grid item xs={10} sm={10}>
            <Paper>
              <DataGrid
                style={{ width: "100%" }}
                getRowId={(obj) => obj._id!}
                rows={data || []}
                columns={columns}
                pagination
                sortingOrder={["asc", "desc"]}
              />
            </Paper>
          </Grid>
        </Grid>
      </BackgroundWrapper>
    </>
  );
}
