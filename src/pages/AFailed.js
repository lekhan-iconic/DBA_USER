import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import ArchivalFailed from "../components/ArchivalFailed";

const AFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <ArchivalFailed />
        </Box>
      </Box>
    </>
  );
};

export default AFailed;
