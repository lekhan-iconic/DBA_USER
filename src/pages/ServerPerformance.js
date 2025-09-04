import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";

import ServerPerformances from "../components/ServerPerformances";

const ServerPerformance = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <ServerPerformances />
        </Box>
      </Box>
    </>
  );
};

export default ServerPerformance;
