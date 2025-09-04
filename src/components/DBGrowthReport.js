import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { Storage } from "@mui/icons-material"; // Database Icon
import API_BASE_URL from "./Config";

const DBGrowthReport = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedServerIP, setSelectedServerIP] = useState(null);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/DBGdata`);
        if (response.data.success) {
          setLogins(response.data.logins);
        } else {
          setError("❌ Failed to fetch logins");
        }
      } catch (error) {
        setError("❌ Failed to fetch logins");
      } finally {
        setLoading(false);
      }
    };

    fetchLogins();
  }, []);

  // Get unique server IPs
  const uniqueServerIPs = [...new Set(logins.map((login) => login.server_ip))];

  // Filtered data based on selected server IP
  const filteredLogins = selectedServerIP
    ? logins.filter((login) => login.server_ip === selectedServerIP)
    : logins;

  return (
    <Box sx={{ padding: "30px" }}>
      {/* Header with Icon */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Storage sx={{ marginRight: 1, color: "#1976d2" }} />
        Database Growth Data
      </Typography>

      {/* Server IP Buttons */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={3}>
        {uniqueServerIPs.map((ip) => (
          <Button
            key={ip}
            variant={selectedServerIP === ip ? "contained" : "outlined"}
            sx={{
              backgroundColor: selectedServerIP === ip ? "#1976d2" : "transparent",
              color: selectedServerIP === ip ? "white" : "#1976d2",
              borderColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0", color: "white" },
            }}
            onClick={() => setSelectedServerIP(ip)}
          >
            {ip}
          </Button>
        ))}
        {uniqueServerIPs.length > 1 && (
          <Button
            variant={selectedServerIP === null ? "contained" : "outlined"}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#fffff" },
            }}
            onClick={() => setSelectedServerIP(null)}
          >
            Show All
          </Button>
        )}
      </Box>

      {/* Loading & Error Messages */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : filteredLogins.length > 0 ? (
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow: 3,
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 900 }}>
              {/* Table Header */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Client Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Server IP
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Database Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Previous DB Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Current DB Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Difference In Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    Projected Growth For 3 M
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {filteredLogins.map((login, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                      "&:hover": { backgroundColor: "#e3f2fd" },
                    }}
                  >
                    <TableCell sx={{ padding: "10px" }}>{login.ClientName}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.server_ip}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.dbname}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.previous_dbsize}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.current_dbsize}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.difference_in_size}</TableCell>
                    <TableCell sx={{ padding: "10px" }}>{login.ProjectedGrowthfor3months}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography align="center" color="textSecondary">
          No records found.
        </Typography>
      )}
    </Box>
  );
};

export default DBGrowthReport;
