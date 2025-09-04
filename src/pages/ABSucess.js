import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import AllBackupSucess from "../components/AllBackupSucess";

const ABSucess = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllBackupSucess />
        </Box>
      </Box>
    </>
  );
};

export default ABSucess;
