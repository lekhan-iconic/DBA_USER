import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import ArchivalSuccess from "../components/ArchivalSucess";

const ASucess = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <ArchivalSuccess />
        </Box>
      </Box>
    </>
  );
};

export default ASucess;
