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

const LogshippingSuccess = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/LSSdata");
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
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#1B5E20", fontWeight: "bold" }}
      >
        ✅ Log Shipping Success Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : logins.length > 0 ? (
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
            {/* Table Head - Green Theme */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2E7D32" }}> {/* Success Green */}
                <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                  Database Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                  Instance IP
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                  Log Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                  Success Date
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body with Alternating Green Colors */}
            <TableBody>
              {logins.map((login, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#E8F5E9" : "#C8E6C9", // Light Green Alternating
                    "&:hover": { backgroundColor: "#A5D6A7" }, // Hover Green
                  }}
                >
                  <TableCell sx={{ padding: "12px" }}>{login.DatabaseName}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{login.InstanceIP}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{login.LogStatus}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{login.AlertDate}</TableCell>
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
    </Box>
  );
};

export default LogshippingSuccess;
