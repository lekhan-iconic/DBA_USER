import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import LogshippingFailed from "../components/LogshippingFailed";

const LSFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <LogshippingFailed />
        </Box>
      </Box>
    </>
  );
};

export default LSFailed;
