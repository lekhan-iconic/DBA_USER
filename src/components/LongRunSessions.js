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
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import API_BASE_URL from "./Config";

const LongRunSessions = () => {
  const [backupData, setBackupData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState("");
  const [uniqueIPs, setUniqueIPs] = useState([]);
  const [recordCount, setRecordCount] = useState(0); // New: Count of records

  useEffect(() => {
    const fetchBackupData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/LRSdata`);
        console.log(response.data);

        if (response.data.success) {
          let data = response.data.logins;

          // Sort by elapsed_time (Descending)
          data = data.sort((a, b) => parseInt(b.elapsed_time) - parseInt(a.elapsed_time));

          setBackupData(data);

          // Extract unique IPs
          const extractedIPs = [...new Set(data.map((item) => item.ServerIP))];
          setUniqueIPs(extractedIPs);

          if (extractedIPs.length > 0) {
            setSelectedIP(extractedIPs[0]); // Default: First IP
            const filtered = data.filter((item) => item.ServerIP === extractedIPs[0]);
            setFilteredData(filtered);
            setRecordCount(filtered.length); // Set record count
          } else {
            setFilteredData([]);
            setRecordCount(0);
          }
        } else {
          setError("❌ Failed to fetch Long Run Sessions data");
        }
      } catch (error) {
        setError("❌ Failed to fetch Long Run Sessions data");
      } finally {
        setLoading(false);
      }
    };
    fetchBackupData();
  }, []);

  const handleIPChange = (event) => {
    const selected = event.target.value;
    setSelectedIP(selected);
    const filtered = backupData.filter((item) => item.ServerIP === selected);
    setFilteredData(filtered);
    setRecordCount(filtered.length);
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CheckCircleOutline sx={{ marginRight: 1 }} />
        Long Run Sessions Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          {/* IP Dropdown */}
          <Box display="flex" justifyContent="center" mb={2}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Server IP</InputLabel>
              <Select value={selectedIP} onChange={handleIPChange} label="Select Server IP">
                {uniqueIPs.map((ip, index) => (
                  <MenuItem key={index} value={ip}>
                    {ip}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Display record count */}
          <Typography align="center" sx={{ fontWeight: "bold", mb: 2 }}>
            Server IP: {selectedIP} | Total Sessions: {recordCount}
          </Typography>

          {filteredData.length > 0 ? (
            <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold",padding:"10px" }}>Server IP</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Session ID</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Blocked By</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Kill Command</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Wait Time</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Elapsed Time</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Stored Procedure</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Command</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Login</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Host</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Program</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Last Request End Time</TableCell>
                    <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Open Tran Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((backup, index) => (
                    <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", "&:hover": { backgroundColor: "#e3f2fd" } }}>
                      <TableCell>{backup.ServerIP}</TableCell>
                      <TableCell>{backup.session_id}</TableCell>
                      <TableCell>{backup.STATUS}</TableCell>
                      <TableCell>{backup.blocked_by}</TableCell>
                      <TableCell>{backup.kill_command}</TableCell>
                      <TableCell>{backup.wait_time}</TableCell>
                      <TableCell>{backup.elapsed_time}</TableCell>
                      <TableCell>{backup.stored_proc}</TableCell>
                      <TableCell>{backup.command}</TableCell>
                      <TableCell>{backup.login_name}</TableCell>
                      <TableCell>{backup.host_name}</TableCell>
                      <TableCell>{backup.program_name}</TableCell>
                      <TableCell>{backup.last_request_end_time}</TableCell>
                      <TableCell>{backup.open_transaction_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" color="textSecondary">No Long Run Sessions data found.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default LongRunSessions;
