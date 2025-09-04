import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";



import JobEnabled from "../components/JobEnabled";

const JEnabled = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <JobEnabled />
        </Box>
      </Box>
    </>
  );
};

export default JEnabled;
