import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, CircularProgress, MenuItem, Select, FormControl,
  InputLabel, Button, TextField
} from "@mui/material";
import { CheckCircleOutline, CloudDownload } from "@mui/icons-material";
import API_BASE_URL from "./Config";
import { saveAs } from "file-saver";

const IndexSuccess = () => {
  const [logins, setLogins] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState("");
  const [uniqueIPs, setUniqueIPs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [uniqueJobStatuses, setUniqueJobStatuses] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/ISdata`);
        if (response.data.success) {
          let data = response.data.logins;

          // Replace "Unknown" with "Not Scheduled"
          data = data.map(item => ({
            ...item,
            JobStatus: item.JobStatus === "Unknown" ? "Not Scheduled" : item.JobStatus
          }));

          // Sort data by SucceededDate in descending order
          data.sort((a, b) => {
            return new Date(b.SucceededDate || "1970-01-01") - new Date(a.SucceededDate || "1970-01-01");
          });

          setLogins(data);
          setUniqueIPs([...new Set(data.map(item => item.ServerIP))]);
          setUniqueJobStatuses([...new Set(data.map(item => item.JobStatus))]);
        } else {
          setError("❌ Failed to fetch index success data");
        }
      } catch (error) {
        setError("❌ Failed to fetch index success data");
      } finally {
        setLoading(false);
      }
    };
    fetchLogins();
  }, []);


  useEffect(() => {
    let filtered = logins;
    if (selectedIP) filtered = filtered.filter(item => item.ServerIP === selectedIP);
    if (selectedStatus) filtered = filtered.filter(item => item.JobStatus === selectedStatus);
    if (fromDate && toDate) {
      filtered = filtered.filter(item => {
        const succeededDate = item.SucceededDate ? item.SucceededDate.split("T")[0] : "";
        return succeededDate >= fromDate && succeededDate <= toDate;
      });
    }
    setFilteredData(filtered);
  }, [selectedIP, selectedStatus, fromDate, toDate, logins]);

  const downloadCSV = () => {
    if (filteredData.length === 0) {
      alert("No data available to download.");
      return;
    }
    const headers = ["Server IP", "Job Name", "Job Enabled", "Frequency", "Job Status", "Succeeded Date"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(login => [
        login.ServerIP,
        login.JobName,
        login.JobEnabled,
        login.Frequency,
        login.JobStatus,
        login.SucceededDate ? login.SucceededDate.split("T")[0] : "N/A"
      ].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "IndexSuccessData.csv");
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircleOutline sx={{ marginRight: 1 }} /> Index Data
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Box display="flex" justifyContent="center" mb={2} gap={2}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Server IP</InputLabel>
              <Select value={selectedIP} onChange={(e) => setSelectedIP(e.target.value)} label="Select Server IP">
                <MenuItem value=""><em>All IPs</em></MenuItem>
                {uniqueIPs.map((ip, index) => (
                  <MenuItem key={index} value={ip}>{ip}</MenuItem>
                ))}
              </Select>
            </FormControl>



            <Box display="flex" justifyContent="center" gap={1} mb={2}>
              {uniqueJobStatuses.map((status, index) => (
                <Button key={index} variant={selectedStatus === status ? "contained" : "outlined"} onClick={() => setSelectedStatus(status === selectedStatus ? "" : status)}>
                  {status}
                </Button>
              ))}
              <Button variant="contained" sx={{ backgroundColor: "#388e3c", "&:hover": { backgroundColor: "#2e7d32" } }} onClick={downloadCSV} startIcon={<CloudDownload />}>
                Download Report
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ maxWidth: "100%", borderRadius: "10px", boxShadow: 3, margin: "auto", overflowX: "auto" }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Server IP</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Name</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Enabled</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Frequency</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Job Status</TableCell>
                  <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Succeeded Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((login, index) => (
                  <TableRow key={index}>
                    <TableCell>{login.ServerIP}</TableCell>
                    <TableCell>{login.JobName}</TableCell>
                    <TableCell>{login.JobEnabled}</TableCell>
                    <TableCell>{login.Frequency}</TableCell>
                    <TableCell>{login.JobStatus}</TableCell>
                    <TableCell>{login.SucceededDate ? login.SucceededDate.split("T")[0] : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default IndexSuccess;
