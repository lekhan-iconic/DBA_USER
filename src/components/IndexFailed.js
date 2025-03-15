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
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const IndexFailed = () => {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failureCount, setFailureCount] = useState(0);

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        const response = await axios.get("http://192.168.1.81:5000/IFdata");
        if (response.data.success) {
          setLogins(response.data.logins);

          // Count failed jobs (if task_name exists, filter by "Indexing")
          const failedJobs = response.data.logins.filter(
            (job) => job.job_status === "Failed" && (!job.task_name || job.task_name === "Indexing")
          );
          setFailureCount(failedJobs.length);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Index Failed Data</Typography>
        <IconButton color="inherit">
          <Badge badgeContent={failureCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : logins.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", borderRadius: "10px", boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#d32f2f" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Job Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Error Message</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Failed Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logins.map((login, index) => (
                <TableRow key={index}>
                  <TableCell>{truncateText(login.job_name, 50)}</TableCell>
                  <TableCell sx={{ color: "red" }}>{login.job_status}</TableCell>
                  <TableCell>
                    <Tooltip title={login.error_message} arrow>
                      {truncateText(login.error_message, 50)}
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={login.failed_date} arrow>
                      {truncateText(login.failed_date, 50)}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No records found.</Typography>
      )}
    </Box>
  );
};

export default IndexFailed;
