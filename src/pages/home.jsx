import { Paper, Typography, Button, Toolbar, AppBar } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../services/databaseService";
import { onAuthStateChanged } from "firebase/auth";
import original from ".//original.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

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
      textAlign={"center"}
      alignItems={"center"}
      style={{
        display: "grid-inline",
        height: "100vh",
        //width: "100vw",
        background: "#EAF3DB",
      }}
    >
      <Grid2 item sm={12}>
        <Box>
          <AppBar style={{ backgroundColor: "#AFD83D" }}>
            <Typography
              fontSize={40}
              fontWeight={"bold"}
              color={"black"}
              style={{
                fontFamily: "Fjalla One",
                padding: "2px",
              }}
            >
              • To-do list •
            </Typography>
          </AppBar>
        </Box>
      </Grid2>

      <Grid2 item sm={6}>
        <img src={original} alt="Imagem Todo" style={{ maxWidth: "100%" }} />
      </Grid2>

      <Grid2 item sm={5}>
        <Typography
          fontSize={50}
          fontWeight={"bold"}
          color={"#AFD83D"}
          style={{
            fontFamily: "Fjalla One",
          }}
        >
          Organize suas tarefas e compromissos
        </Typography>

        <Typography
          fontSize={20}
          color={"#9B9F92"}
          style={{
            fontFamily: "Fjalla One",
            marginBottom: "5%",
          }}
        >
          Com a To-do List fica fácil planejar o seu dia a dia por meio de
          listas de afazeres online.
        </Typography>

        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
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
  );
};

export default Home;
