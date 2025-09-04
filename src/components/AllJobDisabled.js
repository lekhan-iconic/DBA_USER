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
  IconButton,
  Badge,
} from "@mui/material";
import { CancelOutlined, Notifications } from "@mui/icons-material"; // Icons
import API_BASE_URL from "./Config";

const AllJobDisabled = () => {
  const [backupData, setBackupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBackupData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/AJSdata`);
        console.log(response.data)
        if (response.data.success) {
          const filteredData = response.data.logins.filter((job) => job.JobEnabled == 0);
          setBackupData(filteredData);
        } else {
          setError("❌ Failed to fetch disabled jobs data");
        }
      } catch (error) {
        setError("❌ Failed to fetch disabled jobs data");
      } finally {
        setLoading(false);
      }
    };

    fetchBackupData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CancelOutlined sx={{ marginRight: 1 }} />
          Jobs Disabled Data
        </Typography>

        {/* Notification Badge */}
        <IconButton color="inherit">
          <Badge badgeContent={backupData.length} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : backupData.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: "100%", borderRadius: "10px", boxShadow: 3, margin: "auto" }}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#d32f2f" }}>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Server IP</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Name</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Enabled</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Frequency</TableCell>
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {backupData.map((backup, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#ffebee" : "#ffffff", "&:hover": { backgroundColor: "#ffcdd2" } }}>
                  <TableCell>{backup.ServerIP}</TableCell>
                  <TableCell>{backup.JobName}</TableCell>
                  <TableCell>{backup.JobEnabled}</TableCell>
                  <TableCell>{backup.Frequency}</TableCell>
                  <TableCell>{backup.JobStatus}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No disabled jobs found.
        </Typography>
      )}
    </Box>
  );
};

export default AllJobDisabled;
