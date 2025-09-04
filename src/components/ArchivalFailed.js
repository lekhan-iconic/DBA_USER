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
import API_BASE_URL from "./Config";

const ArchivalFailed = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/AFdata`);
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

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Archival Failed Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : logins.length > 0 ? (
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
               
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Job Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Frequency
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Job Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Error Message
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Failed Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logins.map((login, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
                >
                  
                  <TableCell>{login.job_name}</TableCell>
                  <TableCell>{login.frequency}</TableCell>
                  <TableCell>{login.job_status}</TableCell>
                  <TableCell>{login.error_message}</TableCell>
                  <TableCell>{login.succeeded_date}</TableCell>
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

export default ArchivalFailed;
