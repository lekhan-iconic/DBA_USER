import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import LogshippingSucess from "../components/LogshippingSucess";

const LSSucess = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <LogshippingSucess />
        </Box>
      </Box>
    </>
  );
};

export default LSSucess;
