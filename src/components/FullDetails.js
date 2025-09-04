import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Grid, Button, Badge, Card, CardContent, Typography } from "@mui/material";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import BackupIcon from "@mui/icons-material/Backup";
import WorkIcon from "@mui/icons-material/Work";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListAltIcon from "@mui/icons-material/ListAlt";

const FullDetails = () => {
  const [logShippingFailureCount] = useState(0);
  const [jobDisabledCount] = useState(2); // Just for preview
  const [jobFailedCount] = useState(4); // Just for preview

  const papers = [
    {
      name: "Backup",
      icon: <BackupIcon fontSize="large" />,
      color: "#2196f3",
      paths: ["/AllBackupDetails"],
      buttons: ["Report"],
    },
    {
      name: "Indexing",
      icon: <ListAltIcon fontSize="large" />,
      color: "#f57c00",
      paths: ["/AllIndexDetails"],
      buttons: ["Report"],
    },
    {
      name: "Archival",
      icon: <ArchiveIcon fontSize="large" />,
      color: "#9c27b0",
      paths: ["/AllArchivalDetails"],
      buttons: ["Report"],
    },
    {
      name: "SQL Agent Jobs",
      icon: <WorkIcon fontSize="large" />,
      color: "#4caf50",
      paths: ["/AllSuccessJobsDetails", "/AllFailedJobsDetails", "/AllJobDisabledDetails"],
      buttons: ["Success", "Failed", "Disabled"],
      hasNotification: jobDisabledCount > 0 || jobFailedCount > 0,
      DisableCount: jobDisabledCount,
      failureCount: jobFailedCount,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Heading />
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600 }}>
            Database Administrator Monitoring
          </Typography>

          <Grid container spacing={3}>
            {papers.map((paper) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={paper.name}>
                <Card
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 3,
                    transition: "transform 0.2s ease-in-out",
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      p: 3,
                    }}
                  >
                    <Box sx={{ color: paper.color }}>{paper.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {paper.name}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, justifyContent: "center" }}>
                      {paper.buttons?.map((btn, index) => {
                        const path = paper.paths[index];
                        const showBadge = (btn === "Disabled" && paper.DisableCount > 0) || (btn === "Failed" && paper.failureCount > 0);
                        const badgeCount = btn === "Disabled" ? paper.DisableCount : paper.failureCount;

                        return (
                          <Badge
                            key={btn}
                            badgeContent={showBadge ? badgeCount : 0}
                            color="error"
                            invisible={!showBadge}
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "0.75rem",
                                minWidth: "18px",
                                height: "18px",
                                top: -6,
                                right: -6,
                              },
                            }}
                          >
                            <Button
                              variant="contained"
                              component={Link}
                              to={path}
                              sx={{
                                fontWeight: 600,
                                textTransform: "none",
                                backgroundColor: paper.color,
                                color: "#fff",
                                "&:hover": {
                                  backgroundColor: paper.color,
                                  opacity: 0.9,
                                },
                              }}
                            >
                              {btn}
                            </Button>
                          </Badge>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default FullDetails;
