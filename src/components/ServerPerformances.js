import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, CircularProgress,  Select, MenuItem
} from "@mui/material";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import API_BASE_URL from "./Config";

ChartJS.register(ArcElement, Tooltip, Legend);

const ServerPerformances = () => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIP, setSelectedIP] = useState("");
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/SPdata`); 
        console.log(response.data)
        if (response.data && Array.isArray(response.data.logins)) {
          setServerData(response.data.logins);
          if (response.data.logins.length > 0) {
            setSelectedIP(response.data.logins[0].InstanceIP);
            setSelectedServer(response.data.logins[0]);
          }
        } else {
          setServerData([]);
          setError("No data available.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIPChange = (event) => {
    const ip = event.target.value;
    setSelectedIP(ip);
    const server = serverData.find(s => s.InstanceIP === ip);
    setSelectedServer(server);
  };

  const uniqueIPs = [...new Set(serverData.map(server => server.InstanceIP))];

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        Server Performance Monitoring
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Select value={selectedIP} onChange={handleIPChange}>
              {uniqueIPs.map(ip => (
                <MenuItem key={ip} value={ip}>{ip}</MenuItem>
              ))}
            </Select>
          </Box>

        

          {selectedServer && (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
    <Pie 
      data={{
        labels: ["CPU Usage", "Memory Usage", "Disk Usage","Sessions"],
        datasets: [{
          data: [
            selectedServer.CPUUsagePercent,
            selectedServer.MemoryUsagePercent,
            selectedServer.DiskUsageGB,
            selectedServer.ActiveSessions
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56","blue"]
        }]
      }}
      options={{
        maintainAspectRatio: false
      }}
      width={300} // Reduce width
      height={300} // Reduce height
    />
  </Box>
)}

        </>
      )}
    </Box>
  );
};

export default ServerPerformances;