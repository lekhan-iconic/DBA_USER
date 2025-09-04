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
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import API_BASE_URL from "./Config";

const LogshippingSuccess = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/LSSdata`);
        console.log(response.data)
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

  const uniqueIPs = [...new Set(logins.map((login) => login.InstanceIP))];
  const uniqueStatuses = [...new Set(logins.map((login) => login.LogStatus))];

  const filteredLogins = logins.filter(
    (login) =>
      (selectedIP ? login.InstanceIP === selectedIP : true) &&
      (selectedStatus ? login.LogStatus === selectedStatus : true)
  );

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircleOutline sx={{ marginRight: 1 }} />
        Log Shipping Data
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <Select value={selectedIP} onChange={(e) => setSelectedIP(e.target.value)} displayEmpty variant="outlined">
                <MenuItem value="">All Servers</MenuItem>
                {uniqueIPs.map((ip, index) => (
                  <MenuItem key={index} value={ip}>{ip}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 1 }}>
              {uniqueStatuses.map((status, index) => (
                <Button 
                  key={index} 
                  variant={selectedStatus === status ? "contained" : "outlined"} 
                  color={status === "Good" ? "success" : "error"}
                  onClick={() => setSelectedStatus(selectedStatus === status ? "" : status)}
                >
                  {status}
                </Button>
              ))}
            </Box>
          </Box>

          {filteredLogins.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxWidth: "100%", borderRadius: "10px", boxShadow: 3, margin: "auto", overflowX: "auto" }}>
              <Table sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Instance IP</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Database Name</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Log Status</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold", padding: "12px" }}>Success Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogins.map((login, index) => (
                    <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", "&:hover": { backgroundColor: "#e3f2fd" } }}>
                      <TableCell sx={{ padding: "10px" }}>{login.InstanceIP}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.DatabaseName}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.LogStatus}</TableCell>
                      <TableCell sx={{ padding: "10px" }}>{login.AlertDate}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="textSecondary">No log shipping success data found.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default LogshippingSuccess;
