import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import AllIndexSucess from "../components/AllIndexSucess";

const AISucess  = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllIndexSucess />
        </Box>
      </Box>
    </>
  );
};

export default AISucess ;
