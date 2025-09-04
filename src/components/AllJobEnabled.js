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
import { CheckCircleOutline } from "@mui/icons-material";
import API_BASE_URL from "./Config";

const AllJobEnabled = () => {
  const [backupData, setBackupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBackupData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/AJSdata`);
        if (response.data.success) {
          const filteredData = response.data.logins.filter((job) => job.JobStatus === "Succeeded");
          setBackupData(filteredData);
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
        <CheckCircleOutline sx={{ marginRight: 1 }} />
        Jobs Success Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : backupData.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: "100%", borderRadius: "10px", boxShadow: 3, margin: "auto", overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Server IP</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Job Name</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Job Enabled</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Frequency</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Job Status</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Succeeded Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backupData.map((backup, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", "&:hover": { backgroundColor: "#e3f2fd" } }}>
                  <TableCell>{backup.ServerIP}</TableCell>
                  <TableCell>{backup.JobName}</TableCell>
                  <TableCell>{backup.JobEnabled}</TableCell>
                  <TableCell>{backup.Frequency}</TableCell>
                  <TableCell>{backup.JobStatus}</TableCell>
                  <TableCell>{backup.SucceededDate ? backup.SucceededDate.split("T")[0] : "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">No succeeded jobs found.</Typography>
      )}
    </Box>
  );
};

export default AllJobEnabled;
