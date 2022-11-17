import {
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  AppBar,
  Container,
  Box,
  Toolbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import GoogleIcon from "@mui/icons-material/Google";
import EditIcon from "@mui/icons-material/Edit";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../services/databaseService";
import Todo1 from ".//todo1.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Home = () => {
  // Estados: usados para alterar as variáveis. Retorna um valor e uma função para alterar esse valor
  const [tarefas, setTarefas] = useState([]); //referente a lista
  const [textoTarefa, setTextoTarefa] = useState(""); // referente ao valor inserido no Nova Tarefa
  const [textoDescricao, setTextoDescricao] = useState(""); //referente ao valor inserido no Descrição
  const [editTarefa, setEditTarefa] = useState(0);
  const [urgencia, setUrgencia] = useState(1); // referente ao campo Urgencia

  const cores = {
    1: "#F3E6BC",
    2: "#F1C972",
    3: "#F5886B",
    4: "#72AE95",
    5: "#71CBC4",
  };

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false, //false: não feito  true: feito
      urgencia: urgencia,
      edita: false,
    };

    //validação para nao adicionar tarefa em branco
    if (!textoTarefa) {
      //se não tiver valor
      return alert("Não é possível adicionar tarefas em branco");
    }

    novoArray.push(novaTarefa);
    // TODO: Estudar função de sorting!!!
    novoArray.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novoArray);
  };

  const deletaTarefa = (id) => {
    const novaLista = tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    });
    setTarefas(novaLista);
  };

  const mudaEstado = (id) => {
    setTarefas((estadoAtual) => {
      const novoEstado = [...estadoAtual];
      novoEstado.filter((tarefa) => {
        if (tarefa.id === id) {
          tarefa.feito = !tarefa.feito;
        } else {
          return tarefa;
        }
      });
      return novoEstado;
    });
  };

  const mudaUrgencia = (id, urgencia) => {
    const novaUrgencia = [...tarefas];
    novaUrgencia.filter((tarefa) => {
      if (tarefa.id === id) {
        tarefa.urgencia = urgencia;
        return tarefa;
      } else {
        return tarefa;
      }
    });
    novaUrgencia.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novaUrgencia);
  };

  // clicar no Edit > identificar o id da tarefa > enviar o nome/descrição para o form
  //criar um novo estado para receber o valor da tarefa que está sendo alterada no form
  //find: retorna o valor do 1º elemento que passar pelo teste. Parece o filter mas retorna apenas o primeiro elemento que passa pelo teste e não o array inteiro
  const mudaTarefa = (id) => {
    const editaTarefa = tarefas.find((tarefa) => tarefa.id === id);
    setTextoTarefa(editaTarefa.textoTarefa);
    setTextoDescricao(editaTarefa.textoDescricao);
    setEditTarefa(id);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      console.log("Não está logado");
    } else {
      console.log("Está logado");
    }
  }, []);

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
          maxWidth: "50%",
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
  

  /* return (
    <Grid2
      container
      spacing={4}
      style={{
        display: "grid",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(136deg, #B8CAD4 10%, #cdcdcd 80%)",
      }}
    >
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "primary.dark" }}>
          <Toolbar>
            /*<Avatar
              src={auth.currentUser.photoURL}
              referrerPolicy="no-referrer"
              style={{ margin: "25px 10px 5px 0" }}
            /> 
            <Typography
              sx={{ flexGrow: 1 }}
              fontWeight={"bold"}
              style={{ margin: "20px 0 5px 0" }}
            > 
            Seja bem vindo!
             // {"Seja bem vindo, " + auth.currentUser.displayName + "!"} 
            </Typography>
            <Button
              variant="contained"
              size="small"
              style={{ margin: "20px 10px 5px 0" }}
              onClick={() =>
                signInWithPopup(auth, provider).then((result) => {
                  console.log(result);
                })
              }
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ margin: "20px 10px 5px 0" }}
              onClick={() =>
                signOut(auth).then(() => {
                  console.log("deslogado");
                })
              }
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {auth.currentUser && (
        <Paper
          style={{
            margin: "auto",
            width: "40%",
            maxHeight: "80%",
            padding: "30px",
            overflow: "auto",
          }}
        >
          <Grid2 xs={12}>
            <Typography
              fontSize={50}
              fontWeight={"bold"}
              color={"#0093E9"}
              textAlign={"center"}
              style={{ fontFamily: "Fjalla One" }}
            > To-do List
            //{"To-do list de " + auth.currentUser.displayName}
            </Typography>
          </Grid2>

          <Grid2 xs={12} textAlign="center">
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Nova tarefa"
                variant="outlined"
                size="small"
                fullWidth
                value={textoTarefa}
                onChange={(e) => setTextoTarefa(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                size="small"
                fullWidth
                style={{ margin: "10px 0 10px 0" }}
                value={textoDescricao}
                onChange={(e) => setTextoDescricao(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Urgência</InputLabel>
              <Select
                id="demo-simple-select"
                label="Urgência"
                size="small"
                value={urgencia}
                onChange={(e) => setUrgencia(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <MenuItem key={"urgencia-" + item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              //color="secondary"
              style={{ margin: "10px 0 0 0" }}
              onClick={() => addTarefa()}
            >
              Adicionar
            </Button>
          </Grid2>

          {tarefas.map((tarefa) => {
            return (
              <Grid2
                container
                key={tarefa.id}
                alignItems="center"
                style={{
                  backgroundColor: cores[tarefa.urgencia],
                  textDecoration: tarefa.feito === false ? "" : "line-through",
                  maxHeight: "100px",
                  padding: "0 10px",
                  margin: "10px 10px 0 0",
                }}
                spacing={0}
                borderRadius="5px"
              >
                <Grid2 item sm={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tarefa.feito}
                        onChange={() => mudaEstado(tarefa.id)}
                      ></Checkbox>
                    }
                  ></FormControlLabel>
                </Grid2>

                <Grid2 item sm={6}>
                  <Typography p={"10px 0 2px"} fontWeight={"bold"}>
                    {tarefa.nome}
                  </Typography>
                  <Typography p={"2px 0 10px"}>{tarefa.descricao}</Typography>
                </Grid2>

                <Grid2 item sm={5} textAlign={"right"}>
                  <FormControl>
                    <Select
                      style={{ borderRadius: "100px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      value={tarefa.urgencia}
                      onChange={(e) => mudaUrgencia(tarefa.id, e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <IconButton
                    aria-label="edit"
                    onClick={() => mudaTarefa(tarefa.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    onClick={() => deletaTarefa(tarefa.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid2>
                <Divider />
              </Grid2>
            );
          })}
        </Paper>
      )}
    </Grid2> */
  );
};

export default Home;
