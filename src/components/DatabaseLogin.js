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
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import API_BASE_URL from "./Config";

const DatabaseLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const serverIPs = {
    SAAS: "172.16.22.57",
    JAKARTHA: "20.0.0.2",
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    const serverIP = serverIPs[server] || "";

    try {
      const response = await axios.post(`${API_BASE_URL}/connect-db`, { server: serverIP });
      if (response.data.success) {
        setMessage("Database connected successfully!");
        setError(false);
        setIsConnected(true);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      console.log(response.data)
      if (response.data.success) {
        localStorage.setItem("auth", "true");
        setMessage("Login successful!");
        setError(false);
        setTimeout(() => navigate("/Dashboard"), 1000);
      } else {
        setMessage(response.data.message);
        setError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Server Error. Try again later.");
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column",
    }}>

      
      <Paper elevation={10} sx={{
        padding: "40px",
        width: "100%",
        textAlign: "center",
        background: "#2c4fa1",
        borderRadius: "20px",
        boxShadow: "10px 10px 30px rgba(0,0,0,0.3), -10px -10px 30px rgba(255,255,255,0.1)",
      }}>
        <div style={{
        width: "100px",
        height: "100px",
        backgroundColor: "#4f74e1",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"-100px",
        boxShadow: "5px 5px 15px #162d66, -5px -5px 15px #2956c1"
      }}>
        <AccountCircle style={{ fontSize: "60px", color: "white" }} />
      </div>
        <Typography variant="h4" gutterBottom color="white">
          {isConnected ? "Login" : "Database Connection"}
        </Typography>

        <form onSubmit={isConnected ? handleLogin : handleConnect}>
          <TextField
            label={isConnected ? "Username" : "User"}
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "#fff" }} />
                </InputAdornment>
              ),
              style: { backgroundColor: "#4f74e1", color: "white" }
            }}
            sx={{
              background: "#4f74e1",
              borderRadius: "10px",
              boxShadow: "inset 5px 5px 10px #2c4fa1, inset -5px -5px 10px #5e8bf0",
              color: "white"
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: "#fff" }} />
                </InputAdornment>
              ),
              style: { backgroundColor: "#4f74e1", color: "white" }
            }}
            sx={{
              background: "#4f74e1",
              borderRadius: "10px",
              boxShadow: "inset 5px 5px 10px #2c4fa1, inset -5px -5px 10px #5e8bf0",
              color: "white"
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          {!isConnected && (
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: "white" }}>Select Server</InputLabel>
              <Select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                required
                sx={{
                  background: "#4f74e1",
                  borderRadius: "10px",
                  color: "white"
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { backgroundColor: "#4f74e1", color: "white" }
                  }
                }}
                
              >
                <MenuItem value="SAAS">SAAS - India</MenuItem>
                <MenuItem value="JAKARTHA">SAAS - Jakarta</MenuItem>
              </Select>
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, padding: "12px", background: "#1f3b83", borderRadius: "10px", color: "white" }}
          >
            {isConnected ? "Login" : "Connect"}
          </Button>
        </form>

        {message && <Alert severity={error ? "error" : "success"} sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>
    </Container>
  );
};

export default DatabaseLogin;