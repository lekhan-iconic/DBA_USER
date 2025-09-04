import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";


import LongRunSessions from "../components/LongRunSessions";

const LRSessions = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <LongRunSessions />
        </Box>
      </Box>
    </>
  );
};

export default LRSessions;
