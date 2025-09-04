import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import API_BASE_URL from "./Config";
import img from "../asssets/DBM.jpg"

const DatabaseConnect = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState(""); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const serverIPs = {
    SAAS: "172.16.22.57",
    JAKARTHA: "34.101.158.167",
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    const serverIP = serverIPs[server] || "";

    try {
      const response = await axios.post(`${API_BASE_URL}/connect-db`, {
        user,
        password,
        server: serverIP, 
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setError(false);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(response.data.message);
        setError(true);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      setMessage("Server Error. Try again later.");
      setError(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${img})`, // ✅ Set the image as the background
        backgroundSize: "cover", // ✅ Ensures the image covers the container
        backgroundPosition: "center", // ✅ Centers the image
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // ✅ Slight transparency for readability
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Database Connection
        </Typography>
        <form onSubmit={handleConnect}>
          <TextField
            label="User"
            fullWidth
            margin="normal"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

<FormControl fullWidth margin="normal"  >
  <InputLabel >Select Server</InputLabel>
  <Select
    
    value={server}
    onChange={(e) => setServer(e.target.value)}
    label="Select Server"
    required
    displayEmpty
  >
    <MenuItem value="">
      <em>Select Server</em>
    </MenuItem>
    <MenuItem value="SAAS">SAAS - India</MenuItem>
    <MenuItem value="JAKARTHA">SAAS - Jakarta</MenuItem>
  </Select>
</FormControl>


          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Connect
          </Button>
        </form>
        {message && (
          <Alert severity={error ? "error" : "success"} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default DatabaseConnect;
