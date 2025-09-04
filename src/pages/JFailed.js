import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";




import JobFailed from "../components/JobFailed";

const JFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <JobFailed />
        </Box>
      </Box>
    </>
  );
};

export default JFailed;
