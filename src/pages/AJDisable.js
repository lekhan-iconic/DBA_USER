import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import JobDisabled from "../components/JobDisabled";
import AllJobDisabled from "../components/AllJobDisabled";

const AJDisable = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <AllJobDisabled />
        </Box>
      </Box>
    </>
  );
};

export default AJDisable;
