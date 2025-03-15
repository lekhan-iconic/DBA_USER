import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import BackupFailed from "../components/BackupFailed";

const BFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <BackupFailed />
        </Box>
      </Box>
    </>
  );
};

export default BFailed;
