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

const DeadlockReport = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState(null); // Track selected Instance IP

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/DLdata");
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

  // Get unique Instance IPs
  const uniqueIPs = [...new Set(logins.map((login) => login.InstanceIP))];

  // Filter data based on selected IP
  const filteredLogins = selectedIP ? logins.filter((login) => login.InstanceIP === selectedIP) : logins;

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Deadlock Report Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <>
          {/* Unique Instance IP Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 3 }}>
            {uniqueIPs.map((ip, index) => (
              <Button
                key={index}
                variant={selectedIP === ip ? "contained" : "outlined"}
                color="primary"
                onClick={() => setSelectedIP(ip)}
              >
                {ip}
              </Button>
            ))}
            {selectedIP && (
              <Button variant="contained" color="secondary" onClick={() => setSelectedIP(null)}>
                Show All
              </Button>
            )}
          </Box>

          {filteredLogins.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 800,
                margin: "auto",
                borderRadius: "10px",
                boxShadow: 3,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Instance IP</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client Name</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stored Procedure Name</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Line Number</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogins.map((login, index) => (
                    <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                      <TableCell>{login.InstanceIP}</TableCell>
                      <TableCell>{login.ClientName}</TableCell>
                      <TableCell>{login.StoredProcedureName}</TableCell>
                      <TableCell>{login.LineNumber}</TableCell>
                      <TableCell>{login.Count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="textSecondary">
              No records found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default DeadlockReport;
