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

const BackupFailed = () => {
  const [failedData, setFailedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFailedData = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/BFdata");
        if (response.data.success) {
          setFailedData(response.data.logins);
        } else {
          setError("❌ Failed to fetch backup failed data");
        }
      } catch (error) {
        setError("❌ Failed to fetch backup failed data");
      } finally {
        setLoading(false);
      }
    };

    fetchFailedData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#B71C1C" }}>
        Backup Failed Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress color="error" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : failedData.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            borderRadius: "10px",
            boxShadow: 3,
            margin: "auto",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 900 }}>
            {/* Table Head - Danger Color */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#D32F2F" }}> {/* Dark Red */}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Frequency</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Failed Date</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body with Alternating Colors */}
            <TableBody>
              {failedData.map((failed, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#FFEBEE" : "#FFCDD2", // Alternating Light Red
                    "&:hover": { backgroundColor: "#FF8A80" }, // Hover - Slightly darker Red
                  }}
                >
                  <TableCell>{failed.job_name}</TableCell>
                  <TableCell>{failed.frequency}</TableCell>
                  <TableCell>{failed.job_status}</TableCell>
                  <TableCell>{failed.failed_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No Failed Data.
        </Typography>
      )}
    </Box>
  );
};

export default BackupFailed;
