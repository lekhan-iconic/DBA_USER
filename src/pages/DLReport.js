import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import DeadlockReport from "../components/DeadlockReport";

const DLReport = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <DeadlockReport />
        </Box>
      </Box>
    </>
  );
};

export default DLReport;
