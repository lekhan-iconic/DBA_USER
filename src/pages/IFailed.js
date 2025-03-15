import React from "react";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Heading from "../components/Heading";
import IndexFailed from "../components/IndexFailed";

const IFailed = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <IndexFailed />
        </Box>
      </Box>
    </>
  );
};

export default IFailed;
