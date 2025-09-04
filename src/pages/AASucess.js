import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import AllArchivalSucess from "../components/AllArchivalSucess";

const AASucess = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllArchivalSucess />
        </Box>
      </Box>
    </>
  );
};

export default AASucess;
