import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Paper, Typography, CircularProgress, Grid, FormControl, InputLabel,
  Select, MenuItem, 
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, PieController, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from "chart.js";

import API_BASE_URL from "./Config";

ChartJS.register(BarElement, PieController, Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

const IndexMonitoring = () => {
  const [jobData, setJobData] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [archivalData, setArchivalData] = useState([]);
  const [dbGrowthData, setDbGrowthData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/IMdata`);
        const responseBackup = await axios.get(`${API_BASE_URL}/BMdata`);
        const responseArchival = await axios.get(`${API_BASE_URL}/AMdata`);
        const responseDBGrowth = await axios.get(`${API_BASE_URL}/DBMdata`);

        if (response.data.success) setJobData(response.data.logins);
        if (responseBackup.data.success) setBackupData(responseBackup.data.logins);
        if (responseArchival.data.success) setArchivalData(responseArchival.data.logins);
        if (responseDBGrowth.data.success) setDbGrowthData(responseDBGrowth.data.logins);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  

  // Updated function to replace "Unknown" with "Not Scheduled"
  const generatePieData = (data) => {
    const statusCount = data.reduce((acc, curr) => {
      const status = curr.JobStatus === "Unknown" ? "Not Scheduled" : curr.JobStatus;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCount),
      datasets: [{
        data: Object.values(statusCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      }],
    };
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Analytical Monitoring
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {[{ title: "Index Monitoring", data: jobData },
              { title: "Backup Monitoring", data: backupData },
              { title: "Archival Monitoring", data: archivalData }].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ padding: 3, borderRadius: "10px", boxShadow: 3, textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    {item.title}
                  </Typography>
                  <Box width="100%" height={300}>
                    <Pie data={generatePieData(item.data)} />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4} justifyContent="center" mt={3}>
            <Grid item xs={12} md={10}>
              <Paper sx={{ padding: 3, borderRadius: "10px", boxShadow: 3, textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Database Growth Monitoring
                </Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel>Select Client</InputLabel>
                  <Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} label="Select Client">
                    <MenuItem value=""><em>All Clients</em></MenuItem>
                    {[...new Set(dbGrowthData.map((db) => db.ClientName))].map((client) => (
                      <MenuItem key={client} value={client}>{client}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box width="100%" height={300}>
                  <Bar data={{
                    labels: (selectedClient ? dbGrowthData.filter(db => db.ClientName === selectedClient) : dbGrowthData).map(db => db.dbname),
                    datasets: [{
                      label: "Size Difference (MB)",
                      data: (selectedClient ? dbGrowthData.filter(db => db.ClientName === selectedClient) : dbGrowthData).map(db => parseFloat(db.weekdifferencesize)),
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    }],
                  }} options={{ responsive: true, maintainAspectRatio: false }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>

        
        </>
      )}
    </Box>
  );
};

export default IndexMonitoring;
