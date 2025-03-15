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

const ArchivalSuccess = () => {
  const [archivalData, setArchivalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArchivalData = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/ASdata");
        if (response.data.success) {
          setArchivalData(response.data.logins);
        } else {
          setError("❌ Failed to fetch archival success data");
        }
      } catch (error) {
        setError("❌ Failed to fetch archival success data");
      } finally {
        setLoading(false);
      }
    };

    fetchArchivalData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1B5E20" }}>
        Archival Succeed Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : archivalData.length > 0 ? (
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
            {/* Table Head - Success Theme */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2E7D32" }}> {/* Dark Green */}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Frequency</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Succeeded Date</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body with Alternating Colors */}
            <TableBody>
              {archivalData.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#E8F5E9" : "#C8E6C9", // Alternating Green
                    "&:hover": { backgroundColor: "#A5D6A7" }, // Hover - Slightly Darker Green
                  }}
                >
                  <TableCell>{data.job_name}</TableCell>
                  <TableCell>{data.frequency}</TableCell>
                  <TableCell>{data.job_status}</TableCell>
                  <TableCell>{data.succeeded_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No archival success data found.
        </Typography>
      )}
    </Box>
  );
};

export default ArchivalSuccess;
