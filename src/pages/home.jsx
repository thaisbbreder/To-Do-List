import { Paper, Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../services/databaseService";
import { onAuthStateChanged } from "firebase/auth";
import Todo1 from ".//todo1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Estados: usados para alterar as variáveis. Retorna um valor e uma função para alterar esse valor
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        navigate("/todolist");
      }
    });
  }, []);

  console.log(currentUser);

  // PÁGINA DO LOGIN
  return (
    <Grid2
      container
      spacing={4}
      style={{
        display: "grid-inline",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(136deg, #B8CAD4 10%, #cdcdcd 80%)",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={3}
        style={{
          margin: "auto",
          maxWidth: "60%",
          height: "40%",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <Grid2 xs={12}>
          <Typography
            fontSize={70}
            fontWeight={"bold"}
            color={"#0093E9"}
            style={{
              fontFamily: "Fjalla One",
              textAlign: "center",
              margin: "10px",
            }}
          >
            To-do list
          </Typography>
        </Grid2>

        <Grid2 xs={12}>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            fullWidth
            style={{ marginTop: "15px" }}
            onClick={() =>
              signInWithPopup(auth, provider).then((result) => {
                console.log(result);
              })
            }
          >
            Login with google
          </Button>          
        </Grid2>
      </Paper>
      <img
        src={Todo1}
        alt="Imagem Todo"
        style={{ margin: "auto", width: "50%" }}
      />
    </Grid2>
  );
};

export default Home;
