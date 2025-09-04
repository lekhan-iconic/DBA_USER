import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Box, Paper, Grid, Button, Badge } from "@mui/material";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import BackupIcon from "@mui/icons-material/Backup";
import StorageIcon from "@mui/icons-material/Storage";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BlockIcon from "@mui/icons-material/Block";
import WorkIcon from "@mui/icons-material/Work";
import TimerIcon from "@mui/icons-material/Timer";
import axios from "axios";
import API_BASE_URL from "../components/Config";
import { toast } from "react-toastify";

const DBTasks = () => {
  useEffect(() => {
    // Request notification permission if not already granted
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  
    const fetchBackupFailedJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/BSdata`);
        if (response.status === 200 && response.data.success) {
          const failedJobs = response.data.data.filter(job => job.JobStatus === "Failed");
          failedJobs.forEach(job => {
            // Show toast notification
            toast.error(
              `🔴 Backup Job Failed!\nServer IP: ${job.ServerIP}\nJob Name: ${job.JobName}\nStatus: ${job.JobStatus}`,
              { position: "top-right", autoClose: 5000 }
            );
  
            // Show browser notification if the tab is not active
            if (document.visibilityState === "hidden" && Notification.permission === "granted") {
              new Notification("🔴 Backup Job Failed!", {
                body: `Server IP: ${job.ServerIP}\nJob: ${job.JobName}`,
                icon: "/icon.png", // Optional icon
              });
            }
          });
        } else {
          console.error("Failed to fetch job data:", response);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
  
    // Poll every 30 minutes (1800000 milliseconds)
    const intervalId = setInterval(fetchBackupFailedJobs, 1800000);
  
    // Initial data fetch
    fetchBackupFailedJobs();
  
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  const [jobFailedCount, setJobFailedCount] = useState(0);
  // Fetch job data on an interval
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const fetchFailedJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/JFdata`); // Fetch job data
        if (response.status === 200 && response.data.success) {
          const failedJobs = response.data.logins.filter(job => job.JobStatus === "Failed");
          failedJobs.forEach(job => {
            // Show toast if active on the page
            toast.error(
              `🔴 Job Failed!\nServer IP: ${job.ServerIP}\nJob Name: ${job.JobName}\nStatus: ${job.JobStatus}`,
              { position: "top-right", autoClose: 5000 }
            );

            // Push notification when app is in background
            if (document.visibilityState === "hidden" && Notification.permission === "granted") {
              new Notification("🔴 Job Failed!", {
                body: `Server IP: ${job.ServerIP}\nJob: ${job.JobName}`,
                icon: "/icon.png", // Optional icon
              });
            }
          });
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    // Poll every 30 minutes (1800000 milliseconds)
    const intervalId = setInterval(fetchFailedJobs, 180000);

    // Initial data fetch
    fetchFailedJobs();

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  

  useEffect(() => {
    const fetchFailures = async () => {
      try {
        

        const response = await axios.get(`${API_BASE_URL}/JFdata`);
        if (response.status === 200 && response.data.success) {
          const failedJobs = response.data.logins.filter(
            (job) => job.JobStatus === "Failed"
          );
          setJobFailedCount(failedJobs.length);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchFailures();
  }, []);

  const papers = [
    {
      name: "Backup",
      icon: <BackupIcon />,
      color: "#4CAF50",
      paths: ["/backup/success"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "Log Shipping",
      icon: <StorageIcon />,
      color: "#2196F3",
      paths: ["/logshipping/success"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "Indexing",
      icon: <ListAltIcon />,
      color: "#FF9800",
      paths: ["/index/success"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "Archival",
      icon: <ArchiveIcon />,
      color: "#9C27B0",
      paths: ["/archival/success"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "Deadlock",
      icon: <ReportProblemIcon />,
      color: "#f44336",
      paths: ["/deadlock"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "DB Growth",
      icon: <TrendingUpIcon />,
      color: "#673AB7",
      paths: ["/dbgrowth"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "SQL Agent Jobs",
      icon: <WorkIcon />,
      color: "#795548",
      paths: ["/JobsEnabled", "/JobsFailed", "/JobsDisabled"],
      buttons: ["Success", "Failed", "Disabled"],
      count: 0,
      jobFailed: jobFailedCount,
    
    },
    {
      name: "Session Blocking",
      icon: <BlockIcon />,
      color: "#E91E63",
      paths: ["/SessionBlockings"],
      buttons: ["Report"],
      count: 0,
    },
    {
      name: "Long Run Sessions",
      icon: <TimerIcon />,
      color: "#696969",
      paths: ["/LongRunSessions"],
      buttons: ["Report"],
      count: 0,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Heading />

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <h3>Database Administrator Monitoring</h3>
        </Box>

        <Grid container spacing={2}>
          {papers.map((paper) => (
            <Grid item xs={12} sm={4} key={paper.name}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: paper.color,
                  color: "#fff",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box sx={{ fontSize: 30 }}>{paper.icon}</Box>
                <Box sx={{ fontWeight: "bold", fontSize: 16 }}>{paper.name}</Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    mt: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {paper.buttons &&
                    paper.buttons.map((btn, idx) => {
                      let showBadge = false;
                      let badgeCount = 0;

                      if (paper.name === "SQL Agent Jobs") {
                        if (btn === "Failed" && paper.jobFailed > 0) {
                          showBadge = true;
                          badgeCount = paper.jobFailed;
                        }
                        if (btn === "Disabled" && paper.jobDisabled > 0) {
                          showBadge = true;
                          badgeCount = paper.jobDisabled;
                        }
                      } else if (btn === "Report" && paper.count > 0) {
                        showBadge = true;
                        badgeCount = paper.count;
                      }

                      const button = (
                        <Button
                          key={idx}
                          component={Link}
                          to={paper.paths[idx]}
                          sx={{
                            bgcolor: "#fff",
                            color: paper.color,
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              bgcolor: "#f0f0f0",
                            },
                          }}
                          variant="contained"
                        >
                          {btn}
                        </Button>
                      );

                      return showBadge ? (
                        <Badge
                          key={idx}
                          badgeContent={badgeCount}
                          color="error"
                          sx={{ "& .MuiBadge-badge": { top: 0, right: 4 } }}
                        >
                          {button}
                        </Badge>
                      ) : (
                        button
                      );
                    })}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DBTasks;
