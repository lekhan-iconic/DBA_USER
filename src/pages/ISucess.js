import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import IndexSuccess from "../components/IndexSucess";

const ISucess = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <IndexSuccess />
        </Box>
      </Box>
    </>
  );
};

export default ISucess;
