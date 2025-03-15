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
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material"; // Success Icon

const BackupSuccess = () => {
  const [backupData, setBackupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBackupData = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/BSdata");
        if (response.data.success) {
          setBackupData(response.data.logins);
        } else {
          setError("❌ Failed to fetch backup success data");
        }
      } catch (error) {
        setError("❌ Failed to fetch backup success data");
      } finally {
        setLoading(false);
      }
    };

    fetchBackupData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      {/* Header Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "#1E3A8A", // Royal Blue
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircleOutline sx={{ marginRight: 1, color: "#1E3A8A" }} /> {/* Gold Icon */}
        Backup Success Data
      </Typography>

      {/* Loading and Error Messages */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1E3A8A" }} /> {/* Royal Blue Loader */}
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : backupData.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            borderRadius: "12px",
            boxShadow: 4,
            margin: "auto",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 900 }}>
            {/* Table Head - Gold Background */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1E3A8A" }}> {/* Gold Header */}
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Job Name</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Frequency</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Job Status</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Succeeded Date</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body with Alternating Colors */}
            <TableBody>
              {backupData.map((backup, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#E3F2FD" : "#F5F5F5", // Light Blue & Soft White
                    "&:hover": { backgroundColor: "#BBDEFB" }, // Sky Blue Hover
                  }}
                >
                  <TableCell sx={{ padding: "8px", color: "#1E3A8A", fontWeight: "bold" }}>
                    {backup.job_name}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#1E3A8A", fontWeight: "bold" }}>
                    {backup.frequency}
                  </TableCell>
                  <TableCell sx={{ padding: "8px", color: "#1E3A8A", fontWeight: "bold" }}>
                    {backup.job_status}
                  </TableCell>
                  <TableCell sx={{ padding: "px", color: "#1E3A8A", fontWeight: "bold" }}>
                    {backup.succeeded_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No backup success data found.
        </Typography>
      )}
    </Box>
  );
};

export default BackupSuccess;
