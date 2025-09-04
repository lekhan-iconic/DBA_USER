import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, CircularProgress, IconButton, Badge, Dialog,
  DialogTitle, DialogContent
} from "@mui/material";
import { CancelOutlined, Notifications } from "@mui/icons-material";
import API_BASE_URL from "./Config";

const AllJobFailed = () => {
  const [backupData, setBackupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedError, setSelectedError] = useState([]);

  // Ask for browser notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Fetch job data every 30 seconds
  useEffect(() => {
    // Poll every 30 minutes (1800000 milliseconds)
    const intervalId = setInterval(fetchBackupData, 1800000);
    fetchBackupData(); // initial fetch

    return () => clearInterval(intervalId);
  }, []);

  const fetchBackupData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/AJFdata`);
      if (response.status === 200 && response.data.success) {
        const failedJobs = response.data.logins.filter(job => job.JobStatus === "Failed");
        setBackupData(failedJobs);
        setNotificationCount(failedJobs.length);

        failedJobs.forEach(job => {
          // Toast for when user is actively on the page
          toast.error(
            `🔴 Job Failed!\nServer IP: ${job.ServerIP}\nJob Name: ${job.JobName}\nStatus: ${job.JobStatus}`,
            {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );

          // Push Notification when app is in background
          if (document.visibilityState === "hidden" && Notification.permission === "granted") {
            new Notification("🔴 Job Failed!", {
              body: `Server IP: ${job.ServerIP}\nJob: ${job.JobName}`,
              icon: "/icon.png" // optional icon
            });
          }
        });
      } else {
        setError("❌ Invalid response from server");
      }
    } catch (err) {
      console.error("Error fetching failed jobs:", err);
      setError("❌ Failed to fetch failed jobs data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (errorMessage) => {
    setSelectedError(errorMessage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedError("");
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <ToastContainer />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CancelOutlined sx={{ marginRight: 1 }} />
          Jobs Failed Data
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={notificationCount} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#d32f2f" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
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
                <TableCell sx={{ color: "#ffffff", fontWeight: "bold" }}>Error Message</TableCell>
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
                  <TableCell>
                    <Typography
                      sx={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                      onClick={() => handleOpen(backup.ErrorMessage || "No error message")}
                    >
                      {backup.ErrorMessage && backup.ErrorMessage.length > 30
                        ? `${backup.ErrorMessage.substring(0, 30)}...`
                        : backup.ErrorMessage || "No error message"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No failed jobs found.
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error Message</DialogTitle>
        <DialogContent>
          <Typography>{selectedError}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AllJobFailed;
