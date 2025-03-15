import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import DBGrowthReport from "../components/DBGrowthReport";

const DBGReport = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <DBGrowthReport />
        </Box>
      </Box>
    </>
  );
};

export default DBGReport;
