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
import BlockIcon from "@mui/icons-material/Block";
import API_BASE_URL from "./Config";

const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

const SessionBlocking = () => {
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [blockingCount, setBlockingCount] = useState(0);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/SBData`);
        if (response.data.success) {
          setSessionData(response.data.logins);

          // Count blocking sessions
          const blockedSessions = response.data.logins.filter(
            (session) => session.status === "Blocked"
          );
          setBlockingCount(blockedSessions.length);
        } else {
          setError("❌ Failed to fetch session blocking data");
        }
      } catch (error) {
        setError("❌ Failed to fetch session blocking data");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <BlockIcon sx={{ marginRight: 1 }} />
          Session Blocking Data
        </Typography>

        {/* Notification Badge */}
        <IconButton color="inherit">
          <Badge badgeContent={blockingCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Loading and Error Messages */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress sx={{ color: "#1976d2" }} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : sessionData.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 900, // Reduced width
            borderRadius: "10px",
            boxShadow: 3,
            margin: "auto",
            overflowX: "auto",
            maxHeight: "400px", // Scrollable table
          }}
        >
          <Table stickyHeader>
            {/* Table Head */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "#d32f2f" }}> {/* Deep Red Header */}
                {[
                  "Session ID",
                  "Status",
                  "Blocked By",
                  "Kill Command",
                  "Wait Time",
                  "SP",
                  "Login Name",
                  "Host Name",
                  "Program Name",
                  "DB Name",
                  "Alert Date",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      padding: "12px",
                      backgroundColor: "#d32f2f", // Fix header color
                      position: "sticky",
                      top: 0,
                      zIndex: 1000,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body with Hover Effects */}
            <TableBody>
              {sessionData.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", // Alternating row colors
                    "&:hover": { backgroundColor: "#ffebee" }, // Light red hover
                  }}
                >
                  <TableCell sx={{ padding: "10px" }}>{data.session_id}</TableCell>
                  <TableCell sx={{ padding: "10px", color: data.status === "Blocked" ? "red" : "green" }}>
                    {data.status}
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.blocked_by}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>
                    <Tooltip title={data.kill_command} arrow>
                      {truncateText(data.kill_command, 30)}
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.wait_time}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.stored_proc}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.login_name}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.host_name}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.program_name}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.Database_name}</TableCell>
                  <TableCell sx={{ padding: "10px" }}>{data.AlertDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" color="textSecondary">
          No Session Blocking data found.
        </Typography>
      )}
    </Box>
  );
};

export default SessionBlocking;
