import {
  Paper,
  Typography,
  Button,
  Toolbar,
  AppBar,
  Link,
  IconButton,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../services/databaseService";
import { onAuthStateChanged } from "firebase/auth";
import original from ".//original.png";
import todolist from "./assets/todolist.svg";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { LinkedIn } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        console.log(auth.currentUser.uid);
        navigate("/todolist");
      }
    });
  }, []);

  console.log(currentUser);

  // PÁGINA DO LOGIN
  return (
    <Grid2
      container
      spacing={5}
      textAlign={"center"}
      alignItems={"center"}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid2 item sm={6} xs={12}>
        <img
          src={todolist}
          alt="Imagem Todo"
          style={{ maxWidth: "60%", margin: "100px 0" }}
        />
      </Grid2>

      <Grid2 item sm={6} xs={12}>
        <Typography
          fontSize={60}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"#212870"}
          style={{
            fontFamily: "Fjalla One",
          }}
        >
          Organize suas tarefas e compromissos
        </Typography>

        <Typography
          fontSize={20}
          color={"#9B9F92"}
          textAlign={"center"}
          style={{
            fontFamily: "Fjalla One",
            marginBottom: "45px",
          }}
        >
          Com a To-do List fica fácil e rápido planejar o seu dia a dia por meio
          de listas de afazeres online.
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
          Comece agora
        </Button>
      </Grid2>

      <Grid2 item sm={12} xs={12} sx={{ margin: "auto" }}>
        <Link href="https://github.com/thaisbbreder" onClick={() => {}}>
          <IconButton type="button" aria-label="search">
            <GitHubIcon />
          </IconButton>
        </Link>
        <Link
          href="https://www.linkedin.com/in/thaisbbreder/"
          onClick={() => {}}
        >
          <IconButton type="button" aria-label="search">
            <LinkedIn />
          </IconButton>
        </Link>
      </Grid2>
    </Grid2>
  );
};

export default Home;
