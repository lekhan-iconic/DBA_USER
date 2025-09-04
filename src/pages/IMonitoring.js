import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import IndexMonitoring from "../components/IndexMonitoring";

const IMonitoring = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <IndexMonitoring />
        </Box>
      </Box>
    </>
  );
};

export default IMonitoring;
