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
import { ReportProblem, CloudDownload } from "@mui/icons-material"; // Icons
import API_BASE_URL from "./Config";

const DeadlockReport = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState(null); // Track selected Instance IP

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/DLdata`);
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

  // Function to download CSV
  const downloadCSV = () => {
    if (filteredLogins.length === 0) return;

    const headers = ["Instance IP", "Stored Procedure Name", "Line Number", "Count"];
    const csvRows = [headers.join(",")];

    filteredLogins.forEach((login) => {
      csvRows.push(
        [login.InstanceIP, login.StoredProcedureName, login.LineNumber, login.KillCount].join(",")
      );
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Deadlock_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <ReportProblem sx={{ marginRight: 1, color: "#d32f2f" }} />
        Deadlock Report Data
      </Typography>

      {/* Loading & Error Messages */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <>
          {/* Download Button */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#388e3c", "&:hover": { backgroundColor: "#2e7d32" } }}
              onClick={downloadCSV}
              startIcon={<CloudDownload />}
            >
              Download Report
            </Button>
          </Box>

          {/* Unique Instance IP Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 3 }}>
            {uniqueIPs.map((ip, index) => (
              <Button
                key={index}
                variant={selectedIP === ip ? "contained" : "outlined"}
                sx={{
                  backgroundColor: selectedIP === ip ? "#1976d2" : "transparent",
                  color: selectedIP === ip ? "white" : "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0", color: "white" },
                }}
                onClick={() => setSelectedIP(ip)}
              >
                {ip}
              </Button>
            ))}
            {selectedIP && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d32f2f", // Red color for reset
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
                onClick={() => setSelectedIP(null)}
              >
                Show All
              </Button>
            )}
          </Box>

          {/* Data Table */}
          {filteredLogins.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: "100%",
                margin: "auto",
                borderRadius: "10px",
                boxShadow: 3,
                overflowX: "auto",
              }}
            >
              <Table>
                {/* Table Header */}
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                      Instance IP
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                      Stored Procedure Name
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                      Line Number
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                      Count
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body with Alternating Colors */}
                <TableBody>
                  {filteredLogins.map((login, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <TableCell sx={{ padding: "10px" }}>{login.InstanceIP}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.StoredProcedureName}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.LineNumber}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.KillCount}</TableCell>
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
