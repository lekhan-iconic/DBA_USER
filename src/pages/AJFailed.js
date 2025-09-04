import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import AllJobFailed from "../components/AllJobFailed";

const AJFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllJobFailed />
        </Box>
      </Box>
    </>
  );
};

export default AJFailed;
