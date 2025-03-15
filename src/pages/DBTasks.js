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
import axios from "axios";

const DBTasks = () => {
  const [indexFailureCount, setIndexFailureCount] = useState(0);
  const [logShippingFailureCount, setLogShippingFailureCount] = useState(0);

  useEffect(() => {
    const fetchFailures = async () => {
      try {
        // Fetch Indexing Failures
        const indexResponse = await axios.get("http://192.168.1.81:5000/IFdata");
        if (indexResponse.data.success) {
          const failedIndexJobs = indexResponse.data.logins.filter(
            (job) => job.job_status === "Failed" && (!job.task_name || job.task_name === "Indexing")
          );
          setIndexFailureCount(failedIndexJobs.length);
        }

        // Fetch Log Shipping Failures
        const logShippingResponse = await axios.get("http://192.168.1.81:5000/LSFdata");
        if (logShippingResponse.data.success) {
          const failedLogShippingJobs = logShippingResponse.data.logins.filter(
            (job) => job.LogStatus === "Failed"
          );
          setLogShippingFailureCount(failedLogShippingJobs.length);
        }
      } catch (error) {
        console.error("Error fetching failed jobs:", error);
      }
    };

    fetchFailures();
  }, []);

  const papers = [
    { name: "Backup", icon: <BackupIcon />, color: "#4CAF50", paths: ["/backup/success", "/backup/failed"] },

    { 
      name: "Log Shipping", 
      icon: <StorageIcon />, 
      color: "#2196F3", 
      paths: ["/logshipping/success", "/logshipping/failed"], 
      hasNotification: logShippingFailureCount > 0,
      failureCount: logShippingFailureCount 
    },

    { 
      name: "Indexing", 
      icon: <ListAltIcon />, 
      color: "#FF9800", 
      paths: ["/index/success", "/index/failed"], 
      hasNotification: indexFailureCount > 0,
      failureCount: indexFailureCount 
    },

    { name: "Archival", icon: <ArchiveIcon />, color: "#9C27B0", paths: ["/archival/success", "/archival/failed"] },
    { name: "SQL Agent Jobs", icon: <WorkIcon />, color: "#795548", paths: ["/archival/history", "/archival/retention", "/archival/disabled"] },

    { 
      name: "Deadlock", 
      icon: <ReportProblemIcon />, 
      color: "#f44336",
      paths: ["/deadlock"], 
      buttons: ["Report"]
    },

    { name: "DB Growth", icon: <TrendingUpIcon />, color: "#673AB7", paths: ["/dbgrowth"], buttons: ["Report"] },
    { name: "Session Blocking", icon: <BlockIcon />, color: "#E91E63", noButtons: true },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", mt: 2 }}>
            <h1>Database Administrator Monitoring</h1>
          </Box>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            {papers.map((paper) => (
              <Grid item xs={12} sm={4} key={paper.name}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "8px",
                    borderRadius: "6px",
                    backgroundColor: paper.color,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    minHeight: "80px",
                  }}
                >
                  {paper.icon} {paper.name}
                  {!paper.noButtons && (
                    <Box sx={{ display: "flex", gap: "6px", mt: 1 }}>
                      {paper.paths.map((path, index) => (
                        <Button
                          key={index}
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={path}
                          sx={{ bgcolor: "#ffffff", color: paper.color, fontWeight: "bold", position: "relative" }}
                        >
                          {paper.hasNotification && index === 1 ? (
                            <Badge
                              badgeContent={paper.failureCount}
                              color="error"
                              sx={{ "& .MuiBadge-badge": { height:15, right: -10, top: -5 } }}
                            >
                              Failed
                            </Badge>
                          ) : index === 0 ? (
                            "Success"
                          ) : (
                            "Failed"
                          )}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default DBTasks;
