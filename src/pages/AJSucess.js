import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import AllJobEnabled from "../components/AllJobEnabled";

const AJSucess  = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllJobEnabled />
        </Box>
      </Box>
    </>
  );
};

export default AJSucess ;
