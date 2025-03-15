import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout"; // MUI Logout Icon

export default function Heading() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00008B", // Deep Blue color
          borderRadius: "10px", // Rounded corners
          padding: "2px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Dashboard Title */}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            DBA Dashboard
          </Typography>

          {/* Logout Button */}
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "white",
              color: "#00008B",
              borderRadius: "8px", // Rounded button
              "&:hover": { backgroundColor: "#e0e0e0" }, // Light hover effect
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
