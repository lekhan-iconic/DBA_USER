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

const DBGrowthReport = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedServerIP, setSelectedServerIP] = useState(null);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/DBGdata");
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
      <Typography variant="h4" align="center" gutterBottom>
        Database Growth Data
      </Typography>

      {/* Server IP Buttons */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={3}>
        {uniqueServerIPs.map((ip) => (
          <Button
            key={ip}
            variant={selectedServerIP === ip ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSelectedServerIP(ip)}
          >
            {ip}
          </Button>
        ))}
        {/* Show All Button */}
        {uniqueServerIPs.length > 1 && (
          <Button
            variant={selectedServerIP === null ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setSelectedServerIP(null)}
          >
            Show All
          </Button>
        )}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
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
            }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Client Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Server IP
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Database Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Previous DB Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Current DB Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Difference In Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Projected Growth For 3 M
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogins.map((login, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
                  >
                    <TableCell>{login.ClientName}</TableCell>
                    <TableCell>{login.server_ip}</TableCell>
                    <TableCell>{login.dbname}</TableCell>
                    <TableCell>{login.previous_dbsize}</TableCell>
                    <TableCell>{login.current_dbsize}</TableCell>
                    <TableCell>{login.difference_in_size}</TableCell>
                    <TableCell>{login.ProjectedGrowthfor3months}</TableCell>
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
