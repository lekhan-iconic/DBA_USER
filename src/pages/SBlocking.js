import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import SessionBlocking from "../components/SessionBlocking";

const SBlocking = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <SessionBlocking />
        </Box>
      </Box>
    </>
  );
};

export default SBlocking;
