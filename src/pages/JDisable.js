import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import JobDisabled from "../components/JobDisabled";

const JDisable = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <JobDisabled />
        </Box>
      </Box>
    </>
  );
};

export default JDisable;
