import {
  Paper,
  Typography,
  Button,
  TextField,
  Avatar,
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../services/databaseService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import Button from "./Button";
import "./App.css";

return (
  <div>
    <div className="heading-container">
      <h3>Form</h3>
    </div>

    <Grid2
      container
      spacing={4}
      style={{
        display: "grid-inline",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(136deg, #f3f5f7 0%, #cdcdcd 100%)",
      }}
    >
      <Paper
        elevation={3}
        style={{
          margin: "80px 50px 0 80px",
          maxWidth: "40%",
          height: "70%",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <Grid2 xs={12}>
          <Typography
            fontSize={70}
            fontWeight={"bold"}
            color={"#0093E9"}
            style={{ fontFamily: "Fjalla One", textAlign: "center" }}
          >
            To-do list
          </Typography>
        </Grid2>

        <Grid2 xs={12}>
          <Avatar sx={{ width: 80, height: 80, textAlign: "center" }}>
            <AccountCircleIcon sx={{ fontSize: 100 }} />
          </Avatar>

          <Box
            component="form"
            fullWidth
            //sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Enter the Email"
              variant="outlined"
              style={{ margin: "10px 0 10px 0" }}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Enter the Password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Grid2 item sm={7}>
            <Button variant="contained" fullWidth onClick={handleAction}>
              Login
            </Button>

            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
              style={{ marginTop: "5px" }}
              onClick={() =>
                signInWithPopup(auth, provider).then((result) => {
                  console.log(result);
                })
              }
            >
              Login with google
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
      <img
        src={Todo1}
        alt="Imagem Todo"
        style={{ margin: "auto", maxWidth: "40%" }}
      />
    </Grid2>
  </div>
);

export default Form({ title, setPassword, setEmail, handleAction });
